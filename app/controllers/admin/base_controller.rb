module Admin
  class BaseController < ApplicationController
    before_action :verify_admin_role!

    layout 'admin'

    private

    def verify_admin_role!
      unless current_user.admin?
        flash[:error] = t('admin.login_not_authorized')
        sign_out(current_user)
        redirect_to new_user_session_path
      end
    end
  end
end