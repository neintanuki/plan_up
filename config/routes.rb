Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'home#index'
  
  namespace :api do
    namespace :v1 do
      get 'login', to: 'auth#login'
    end
  end
  
  get '*path', to: 'home#index'
end
