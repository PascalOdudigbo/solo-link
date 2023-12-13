Rails.application.routes.draw do
  resources :project_videos
  resources :projects
  resources :artists_socials
  resources :artists_profiles
  resources :artists
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get "/artists_logged_in", to: "artists#check_artist_logged_in"
  post "/artists_login", to: "artists#artist_login"
  delete "/artists_logout", to: "artists#artist_logout"
  post "/artists_recover_account", to: "artists#recover_account"
  # Defines the root path route ("/")
  # root "articles#index"
end
