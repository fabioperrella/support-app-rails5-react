RSpec.describe Request do
  describe 'as_json' do
    it 'formats updated_at' do
      #setup
      date = '2016-02-25 13:30:20'
      request = described_class.new(updated_at: DateTime.parse(date))

      #exercise
      result = request.as_json

      #verify
      expect(result['updated_at']).to eq "2016/02/25 13:30"
    end
  end
end