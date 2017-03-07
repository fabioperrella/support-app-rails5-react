RSpec.describe Admin::RequestsController do
  describe 'PUT resolve' do
    it 'changes req status to resolved' do
      #setup
      user1 = create :user
      admin = create :user, :admin

      sign_in(admin)

      req1 = create :request, user: user1

      headers = {
        "ACCEPT" => "application/json"
      }

      #exercise
      put(
        resolve_admin_request_path(req1),
        params: { id: req1.id },
        headers: headers
      )

      #verify
      expect(response.status).to eq 200

      req1.reload
      expect(req1.state).to eq('resolved')
      expect(JSON.parse(response.body)['id']).to eq(req1.id)
    end
  end

  describe 'GET report' do
    it 'renders report with closed requests of last month' do

      #setup
      admin = create :user, :admin

      sign_in(admin)

      Timecop.freeze(DateTime.parse('2017-02-10 13:00:00')) do
        @req1 = create :request, state: :resolved
        @req2 = create :request, state: :resolved
      end

      Timecop.freeze(DateTime.parse('2017-03-01 13:00:00')) do
        @req3 = create :request, state: :resolved
        @req4 = create :request

        #exercise
        get report_admin_requests_path
      end

      #verify
      expect(response.status).to eq 200

      expect(response.body).to include(@req1.title)
      expect(response.body).to include(@req2.title)
      expect(response.body).to_not include(@req3.title)
      expect(response.body).to_not include(@req4.title)
    end
  end
end