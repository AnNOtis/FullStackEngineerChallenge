class ApplicationController < ActionController::API
  rescue_from Errors::APIError, :with => :render_errors

  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    else
      @current_user = nil
    end
  end

  private

  def render_errors exception
    render json: exception, status: exception.status
  end
end
