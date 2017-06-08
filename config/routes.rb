Rails.application.routes.draw do
  root to: 'pages#home'

  get 'pages/home'

  get 'pairs/index'

  get 'pairs/show'

  get 'users/index'

  put 'users/set_role'

  post 'pairs/get_by_date'

  post 'users/get_by_pair'

  resources :clusters, only: %i[index show update edit]

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
