class PairsController < ApplicationController

  def index
    user = current_user
    @pairs = user.pairs.where.not(day: nil).where('day < ?', Date.today).order(day: :desc)
  end

  def show
    user = current_user
    @pair = Pair.user.date_on_day(Date.current)
  end

  def get_by_date
    @pairs = Pair.where(day: params[:day])
    respond_to do |format|
      format.json { render json: @pairs }
    end
  end
end
