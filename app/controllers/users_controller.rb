class UsersController < ApplicationController
  def index
    @users = User.all.order(:id)
  end

  def set_role
    @user = User.find(params[:id])
    if params[:choice] == 'Admin'
      @user.update(admin: true)
    else
      @user.update(admin: false)
    end

    respond_to do |format|
      format.html
      format.json { render json: @user }
    end
  end

  def get_by_pair
    @pair = Pair.find(params[:id])
    @users = @pair.users
    respond_to do |format|
      format.json { render json: @users }
    end
  end
end
