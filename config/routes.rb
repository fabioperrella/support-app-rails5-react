Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)
  devise_for :users

  resources :requests, only: [:index, :create, :show] do
    resources :comments, only: [:create, :show, :index]

    member do
      put :resolve
    end
  end

  namespace :admin do
    resources :requests, only: [:index] do
      member do
        put :resolve
      end

      collection do
        get :report
      end
    end

    root to: "home#show", via: :get
  end

  root to: "home#show", via: :get
end
