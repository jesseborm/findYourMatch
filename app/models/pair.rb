class Pair < ApplicationRecord
  belongs_to :cluster
  has_and_belongs_to_many :users

  def date
    cluster.day
  end

  def self.set_date(pairs)
    date = pairs.first.cluster.day
    pairs.each do |pair|
      pair.update(day: date)
    end
  end

  # def date_on_day(day, day_end)
  #   self.cluster.each |cluster| do
  #     cluster.where(day: day)
  #   end
  # end
end
