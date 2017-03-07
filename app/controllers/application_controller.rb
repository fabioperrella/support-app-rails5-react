class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  rescue_from ActiveRecord::RecordNotFound do |exception|
    respond_to do |format|
      format.json do
        render json: 'not found', status: 404
      end
    end
  end

  protected

  def configure_permitted_parameters
   # Permit the `subscribe_newsletter` parameter along with the other
   # sign up parameters.
   devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end
