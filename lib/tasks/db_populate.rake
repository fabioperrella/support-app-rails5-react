namespace :db_populate do
  desc 'Populate database with dev data'
  task dev_data: :environment do
    default_password = 'initial1234'
    User.create! name: 'admin', roles: 'admin', password: default_password, email: 'admin@example.com'
    user1 = User.create! name: 'user1', password: default_password, email: 'user1@exampĺe.com'
    user2 = User.create! name: 'user2', password: default_password, email: 'user2@exampĺe.com'

    Request.create!(
      user: user1,
      title: 'request 1',
      description: 'lalal popo ufsd',
      updated_at: DateTime.now - 1.month,
      state: 'resolved'
    )

    Request.create! user: user1, title: 'request 2', description: 'lalal popo'

    Request.create!(
      user: user2,
      title: 'request 3',
      description: 'lalal popo ufsd',
      updated_at: DateTime.now - 1.month,
      state: 'resolved'
    )

    Request.create! user: user2, title: 'request 4', description: 'lalal popo'
  end
end