class Pair < ApplicationRecord
  belongs_to :cluster
  has_and_belongs_to_many :users

  def date
    self.cluster.day
  end

  # def date_on_day(day, day_end)
  #   self.cluster.each |cluster| do
  #     cluster.where(day: day)
  #   end
  # end

end
