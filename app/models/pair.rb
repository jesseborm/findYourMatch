class Pair < ApplicationRecord
  belongs_to :cluster
  has_and_belongs_to_many :users
end
