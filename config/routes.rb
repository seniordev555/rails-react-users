Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'admin#index'

  namespace :api do
    resources :users, only: %i[index show create destroy update]
  end

  get '*path', to: 'admin#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
