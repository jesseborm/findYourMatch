require 'factory_girl_rails'


User.delete_all


for i in 1..20
  FactoryGirl.create :user
end
