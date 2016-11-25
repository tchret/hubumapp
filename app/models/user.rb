# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  username               :string
#  facebook_picture_url   :string
#  first_name             :string
#  last_name              :string
#  uid                    :string
#  provider               :string
#  token                  :string
#  token_expiry           :datetime
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, omniauth_providers: [:facebook]

  has_and_belongs_to_many :tracks
  validates :email, presence: true
  validates :username, presence: true, format: { with: /\A[a-zA-Z0-9]+\Z/ }
  validates_uniqueness_of :username, case_sensitive: false
  validates_length_of :username, maximum: 15

  def self.find_for_facebook_oauth(auth)
      user_params = auth.to_h.slice(:provider, :uid)
      user_params[:provider] = auth.provider
      user_params[:uid] = auth.uid
      user_params.merge! auth.info.slice(:email, :first_name, :last_name)
      user_params[:facebook_picture_url] = auth.info.image
      user_params[:token] = auth.credentials.token
      user_params[:token_expiry] = Time.at(auth.credentials.expires_at)

      user = User.where(provider: auth.provider, uid: auth.uid).first
      user ||= User.where(email: auth.info.email).first # User did a regular sign up in the past.
      if user
        user.update(user_params)
      else
        members = GRAPH.get_object('218589108574648/members')
        if members.select{|member| member['id'] == user_params[:uid]}.any? # if user is in the group
          user = User.new(user_params)
          user.password = Devise.friendly_token[0,20]  # Fake password for validation
          user.save
        else
          return false
        end
      end

      return user
    end
end
