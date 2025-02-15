class SessionsController < ApplicationController
  def auth
    if current_user
      render_user current_user
    else
      raise Errors::UnauthorizedError
    end
  end

  def create
    user = User.find_by_email(params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render_user user
    else
      raise Errors::UnauthorizedError, 'email or password is invalid'
    end
  end

  def destroy
    session[:user_id] = nil
    render json: {}, status: :ok
  end

  private

  def render_user user
    render json: user.as_json(root: true, only: [:email, :name, :is_admin], methods: [:avatar_url])
  end
end
