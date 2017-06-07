require 'factory_girl_rails'


User.delete_all


for i in 1..20
  FactoryGirl.create :user
end

User.create!(email: 'admin@match.com', password: '123qwf', admin: true)
User.create!(email: 'student@match.com', password: '123qwf')

cluster = Cluster.create!(day: '2017-06-07', assigned: true)

Pair.create!(cluster: cluster, users: [User.find(1), User.find(2)])
Pair.create!(cluster: cluster, users: [User.find(3), User.find(4)])
