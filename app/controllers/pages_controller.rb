class PagesController < ApplicationController
  def home
    @cluster = Cluster.find_by(day: Date.today)

    unless Cluster.find_by_assigned(false)
      Cluster.generate(User.all_students)
    end
    @cluster_assign = Cluster.find_by_assigned(false)
    @pair = current_user.pairs.find_by_day(Date.today)
  end
end
