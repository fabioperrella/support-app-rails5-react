class RequestsController < ApplicationController
  respond_to :json, :html

  def index
    requests = current_user.requests.includes(:user).order(updated_at: :desc)
    render json: requests.to_json(include: :user)
  end

  def create
    request = current_user.requests.build(request_params)
    request.save
    respond_with(request)
  end

  def resolve
    request = current_user.requests.find(params[:id])
    request.resolve!

    render json: request.to_json(include: :user)
  end

  private

  def request_params
    params.require(:request).permit(:title, :description)
  end
end