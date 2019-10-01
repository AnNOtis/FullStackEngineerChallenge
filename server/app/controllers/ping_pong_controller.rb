class PingPongController < ApplicationController
  def index
    render json: { data: 'pong' }
  end
end
