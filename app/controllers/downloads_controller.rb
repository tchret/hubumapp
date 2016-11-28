class DownloadsController < ApplicationController
  before_action :find_os

  def desktop
    send_file ActionController::Base.helpers.asset_path("#{@os.to_s}.zip")
  end

  private

  def find_os
    @os ||= (
       host_os = RbConfig::CONFIG['host_os']
       case host_os
       when /mswin|msys|mingw|cygwin|bccwin|wince|emc/
         :windows
       when /darwin|mac os/
         :macosx
       when /linux/
         :linux
       when /solaris|bsd/
         :unix
       else
         raise Error::WebDriverError, "unknown os: #{host_os.inspect}"
       end
     )
  end
end
