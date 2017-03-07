module Admin
  class RequestsController < BaseController
    respond_to :json

    def index
      requests =
        Request.all
               .includes(:user)
               .where.not(state: 'resolved')
               .order(:updated_at)

      render json: requests.to_json(include: :user)
    end

    def resolve
      request = Request.find(params[:id])
      request.resolve!

      render json: request.to_json(include: :user)
    end

    def report
      @date = I18n.l(DateTime.now - 1.month, format: :report_file_name)
      @initial_date = DateTime.now.beginning_of_month - 1.month
      @final_date = DateTime.now.beginning_of_month
      @closed_requests = Request.resolved.where(
        updated_at: @initial_date..@final_date
      )
      respond_to do |format|
        format.pdf { render pdf: "close_requests_#{@date}", layout: 'pdf.html' }
        format.html { render }
      end
    end
  end
end
