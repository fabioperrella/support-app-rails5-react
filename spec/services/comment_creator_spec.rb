RSpec.describe CommentCreator do
  describe "#call" do
    it 'creates the comment and change the request state to ' \
       'opened if user is not a admin' do
      #setup
      user = create :user
      req = create :request
      body = 'lala popo'
      comment_params = { body: body }

      #exercise
      result = described_class.new(
        user: user, request_id: req.id, comment_params: comment_params
      ).call

      #verify
      expect(result).to be_a(Comment)

      req.reload
      created_comment = req.comments.last
      expect(created_comment.body).to eq(body)

      expect(req.state).to eq('opened')
    end

    it 'creates the comment and change the request state to ' \
       'waiting_user_reply if user is an admin' do
      #setup
      admin = create :user, :admin
      req = create :request
      body = 'lala popo'
      comment_params = { body: body }

      #exercise
      result = described_class.new(
        user: admin, request_id: req.id, comment_params: comment_params
      ).call

      #verify
      expect(result).to be_a(Comment)

      req.reload
      created_comment = req.comments.last
      expect(created_comment.body).to eq(body)

      expect(req.state).to eq('waiting_user_reply')
    end
  end
end