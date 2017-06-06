class PairsController < ApplicationController
  def index
    @pairs = Pairs.all
  end

  def show
    user = current_user
    cluster = Cluster.find_by(date: Date.now)
    @pair = cluster.pair.user
  end
end
