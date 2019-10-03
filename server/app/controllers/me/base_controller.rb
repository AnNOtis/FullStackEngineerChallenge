class Me::BaseController < ApplicationController
  before_action :ensure_logged_in

  private

  def ensure_logged_in
    if !current_user
      raise Errors::UnauthorizedError, "haven't logged in"
    end
  end
end
