# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161127145847) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "tracks", force: :cascade do |t|
    t.string   "title"
    t.string   "artist_name"
    t.string   "genre_names"
    t.string   "country"
    t.string   "style_names"
    t.string   "release_label_names"
    t.string   "label_discogs_id"
    t.string   "discogs_thumb_url"
    t.integer  "duration"
    t.string   "release_title"
    t.integer  "release_discogs_id"
    t.integer  "release_year"
    t.string   "youtube_id"
    t.string   "release_catno"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  create_table "tracks_users", id: false, force: :cascade do |t|
    t.integer "track_id"
    t.integer "user_id"
  end

  add_index "tracks_users", ["track_id", "user_id"], name: "index_tracks_users_on_track_id_and_user_id", using: :btree
  add_index "tracks_users", ["user_id"], name: "index_tracks_users_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "",   null: false
    t.string   "encrypted_password",     default: "",   null: false
    t.string   "username"
    t.string   "facebook_picture_url"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "uid"
    t.string   "provider"
    t.string   "token"
    t.datetime "token_expiry"
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,    null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.boolean  "admin"
    t.boolean  "featured",               default: true, null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
