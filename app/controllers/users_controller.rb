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
end
