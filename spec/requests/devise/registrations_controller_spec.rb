RSpec.describe "Devise Registration" do
  describe 'POST signup' do
    it 'accepts user name as key' do
      #setup
      name = 'joao'
      params = {
        user: {
          name: name,
          email: 'lala@lala.com',
          password: 'inicial1234',
          password_confirmation: 'inicial1234'
        }
      }

      #exercise
      post user_registration_path, params: params

      #verify
      expect(response.status).to eq(302)

      expect(User.last.name).to eq(name)
    end
  end
end