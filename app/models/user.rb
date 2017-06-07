class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_and_belongs_to_many :pairs


  def all_students
    User.find_by_admin(false)
  end


  def factor(all_students)

    list = all_students
    number_pairs = list.length/2
    set = []

    first, *rest = *list
    rest.each_with_index do |person, index|
      pairs = []
      pairs << [first, person]
      (1..number_pairs-1).each do |offset|
        pairs << [rest[(index-offset)%rest.length], rest[(index+offset)%rest.length]]
      end
      set << pairs
    end
    set
  end


end
