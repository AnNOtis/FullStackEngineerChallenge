class Admin::BaseController < ApplicationController
  before_action :ensure_admin_user

  private

  def ensure_admin_user
    if !current_user || !current_user.is_admin?
      raise Errors::UnauthorizedError, 'Yout are not an admin user'
    end
  end
end
