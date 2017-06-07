class PagesController < ApplicationController
  def home
    @cluster = Cluster.find_by(day: Date.today)
  end
end
