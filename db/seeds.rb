require 'factory_girl_rails'

User.delete_all
Cluster.delete_all
Pair.delete_all

User.create!(email: 'admin@match.com', password: '123qwf', admin: true)

andrei = User.create!(email: 'andrei@match.com', password: '123qwf')
chris = User.create!(email: 'chris@match.com', password: '123qwf')
claudia = User.create!(email: 'claudia@match.com', password: '123qwf')
elizabeth = User.create!(email: 'elizabeth@match.com', password: '123qwf')
kate = User.create!(email: 'kate@match.com', password: '123qwf')
han = User.create!(email: 'han@match.com', password: '123qwf')
jeroen = User.create!(email: 'jeroen@match.com', password: '123qwf')
job = User.create!(email: 'job@match.com', password: '123qwf')
maressa = User.create!(email: 'maressa@match.com', password: '123qwf')
omar = User.create!(email: 'omar@match.com', password: '123qwf')
oliver = User.create!(email: 'oliver@match.com', password: '123qwf')
steve = User.create!(email: 'steve@match.com', password: '123qwf')
bram = User.create!(email: 'bram@match.com', password: '123qwf')
adrianna = User.create!(email: 'adrianna@match.com', password: '123qwf')
ann = User.create!(email: 'ann@match.com', password: '123qwf')
ilsmarie = User.create!(email: 'ilsmarie@match.com', password: '123qwf')
jesse = User.create!(email: 'jesse@match.com', password: '123qwf')
tim = User.create!(email: 'tim@match.com', password: '123qwf')


cluster = Cluster.create!(day: '2017-06-07', assigned: true)

Pair.create!(cluster: cluster, users: [User.find(1), User.find(2)])
Pair.create!(cluster: cluster, users: [User.find(3), User.find(4)])
