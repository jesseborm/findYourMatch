class PairsController < ApplicationController
  # def index
  #   @pairs = Pair.date_on_day(day)
  # end

  def show
    user = current_user
    @pair = Pair.user.date_on_day(Date.current)
  end

end
