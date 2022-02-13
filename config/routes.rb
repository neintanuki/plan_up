Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'home#index'
  
  namespace :api do
    namespace :v1 do
      # user
      post '/user/login', to: 'auth#login'
      post '/user/register', to: 'auth#register'

      #project
      get '/projects', to: 'project#new'
      post '/create/project', to: 'project#create'
      patch '/update/project', to: 'project#update'
      delete '/destroy/project', to: 'project#destroy'

      #category
      get '', to: 'category#new'
      post 'create/project', to: 'category#create'
      patch '/update/project', to: 'category#update'
      delete '/destroy/project', to: 'project#destroy'

    end
  end

  get '*path', to: 'home#index'
end
