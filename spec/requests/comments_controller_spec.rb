RSpec.describe "Comments" do
  describe 'POST create' do
    it 'creates a comment for a request' do
      #setup
      user = create :user
      admin = create :user
      sign_in(admin)

      req = create :request, user: user
      comment_body = 'lala'
      params = {
        comment: {
          body: comment_body
        }
      }
      headers = {
        "ACCEPT" => "application/json"
      }

      #exercise
      post request_comments_path(req), params: params, headers: headers

      #verify
      expect(response.status).to eq(201)

      req.reload
      expect(response.body).to include(admin.name)
      expect(response.body).to include(req.state)
      expect(response.body).to include(req.user.name)

      created_comment = req.comments.first
      expect(created_comment.body).to eq comment_body
      expect(created_comment.user).to eq admin
      expect(created_comment.request).to eq req
    end
  end

  describe 'GET index' do
    it 'returns the list of request comments' do
      #setup
      user1 = create :user
      user2 = create :user
      admin = create :user

      sign_in(user1)

      req1 = create :request, user: user1
      req2 = create :request, user: user1
      req3 = create :request, user: user2

      req1.comments.create(body: 'lala', user: admin)
      req1.comments.create(body: 'lala', user: user1)

      #exercise
      get request_comments_path(req1)

      #verify
      response_hash = JSON.parse(response.body)

      expect(response_hash.count).to eq(2)

      expect(response_hash.map{ |c| c['user']['name'] }).to(
        match_array([user1.name, admin.name])
      )
    end
  end
end