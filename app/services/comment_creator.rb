class CommentCreator
  def initialize(user:, request_id:, comment_params:)
    @user = user
    @request = Request.find(request_id)
    @comment_params = comment_params
  end

  def call
    ActiveRecord::Base.transaction do
      comment = request.comments.build(comment_params)
      comment.user = user
      comment.save!

      request.update_attributes!(state: new_state_for_comment)

      comment
    end
  end

  private

  attr_accessor :user, :request, :comment_params

  def new_state_for_comment
    user.admin? ? :waiting_user_reply : :opened
  end
end