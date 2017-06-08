Rails.application.routes.draw do
  root to: 'pages#home'

  get 'pages/home'

  get 'pairs/index'

  get 'pairs/show'

  get 'users/index'

  put 'users/set_role'

  resources :clusters, only: %i[index show update edit]

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
