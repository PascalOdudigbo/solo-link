Rails.application.routes.draw do
  resources :projects
  resources :artists_socials
  resources :artists_profiles
  resources :artists
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
