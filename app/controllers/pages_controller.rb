class PagesController < ApplicationController
  def home
    @date = Date.today

    if current_user
      @pair = current_user.pairs.find_by_day(Date.today)
    end
  end
end
