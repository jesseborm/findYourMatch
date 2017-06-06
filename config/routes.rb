Rails.application.routes.draw do
  

  get 'pairs/index'

  get 'pairs/show'

  get 'clusters/index'

  get 'clusters/show'

  get 'clusters/create'

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
