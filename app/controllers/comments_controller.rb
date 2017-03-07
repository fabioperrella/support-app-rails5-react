class CommentsController < ApplicationController
  respond_to :json

  def create
    comment = CommentCreator.new(
      user: current_user,
      request_id: params[:request_id],
      comment_params: comment_params
    ).call

    if comment.valid?
      render(
        json: comment.to_json(
          include: [
            :user,
            request: { include: :user }
          ]
        ),
        status: :created,
        location: @user
      )
    else
      render json: comment.errors, status: :unprocessable_entity
    end
  end

  def index
    request = Request.find(params[:request_id])
    render(
      json: request.comments
                   .includes(:user)
                   .order(created_at: :desc)
                   .to_json(include: :user)
    )
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end