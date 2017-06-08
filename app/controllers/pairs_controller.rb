class PairsController < ApplicationController

  def index
    user = current_user
    @pairs = user.pairs
  end

  def show
    user = current_user
    @pair = Pair.user.date_on_day(Date.current)
  end
end
