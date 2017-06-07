class Cluster < ApplicationRecord
  has_many :pairs


  def date_on_day(day)
    Cluster.find_by_day(day)
  end



end
