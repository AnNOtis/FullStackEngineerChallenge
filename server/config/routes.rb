Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resource :session, only: [:create, :destroy]
  get "/auth", to: "sessions#auth"

  namespace :admin do
    resources :review_sessions, only: [:index, :show] do
      resource :assignment, only: [:update]
    end
  end

  namespace :me do
    resources :assignments, only: [:index, :show, :update]
  end
end
