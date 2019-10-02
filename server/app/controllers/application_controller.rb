class ApplicationController < ActionController::API
  rescue_from Errors::APIError, :with => :render_errors

  def current_user
    user_id = session[:user_id]

    # for development
    user_id ||= params[:xxx]

    if user_id
      @current_user ||= User.find(user_id)
    else
      @current_user = nil
    end
  end

  private

  def render_errors exception
    render json: exception, status: exception.status
  end
end
