RSpec.describe "Requests" do
  describe 'GET index' do
    it 'returns the list of requests' do
      #setup
      user1 = create :user
      user2 = create :user

      sign_in(user1)

      req1 = create :request, user: user1
      req2 = create :request, user: user1
      req3 = create :request, user: user2

      #exercise
      get requests_path

      #verify
      expect(response.status).to eq(200)

      response_hash = JSON.parse(response.body)
      expect(response_hash.map{|req| req['id']}).to(
        match_array([req1.id, req2.id])
      )
    end
  end

  describe 'PUT resolve' do
    it 'changes req status to resolved' do
      #setup
      user1 = create :user

      sign_in(user1)

      req1 = create :request, user: user1

      #exercise
      put resolve_request_path(req1), params: { id: req1.id }

      #verify
      expect(response.status).to eq 200

      req1.reload
      expect(req1.state).to eq('resolved')
      expect(JSON.parse(response.body)['id']).to eq(req1.id)
    end

    it 'cannot change req status of other user\'s req' do
      #setup
      user1 = create :user
      user2 = create :user

      sign_in(user2)

      req1 = create :request, user: user1

      headers = {
        "ACCEPT" => "application/json"
      }

      #exercise
      put resolve_request_path(req1), params: { id: req1.id }, headers: headers

      #verify
      expect(response.status).to eq 404
    end
  end
end