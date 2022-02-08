Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'home#index'
  
  namespace :api do
    namespace :v1 do
      # user
      post '/user/login', to: 'auth#login'
      post '/user/register', to: 'auth#register'
    end
  end

  get '*path', to: 'home#index'
end
