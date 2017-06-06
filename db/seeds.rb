require 'factory_girl_rails'


User.delete_all


for i in 1..20
  FactoryGirl.create :user
end

User.create!(email: 'admin@match.com', password: '123qwf', admin: true)
User.create!(email: 'student@match.com', password: '123qwf')
