class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from Errors::APIError, with: :render_errors
  rescue_from ActiveRecord::ActiveRecordError, with: :render_active_record_errors

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

  def render_active_record_errors e
    error = Errors::UnprocessableEntityError.new(e.message)
    render json: error, status: error.status
  end

  def render_errors exception
    render json: exception, status: exception.status
  end
end
