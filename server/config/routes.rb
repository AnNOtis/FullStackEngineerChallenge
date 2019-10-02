Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "/ping", to: "ping_pong#index"

  resource :session, only: [:create, :destroy]

  namespace :admin do
    resources :review_sessions, only: [:index, :show] do
      resource :assignment, only: [:update]
    end
  end

  get "/me", to: "session#auth"
end
