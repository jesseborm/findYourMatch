class ClustersController < ApplicationController
  before_action :set_cluster, only: [:show]

  def index
    @clusters = Cluster.all
  end

  def show; end

  def create
    @cluster = Cluster.update_attributes()
  end

  def update # Assign cluster to specific day
    if @cluster.update(cluster_params)

        redirect_to root, notice: "Pairs successfully added."
    else
      render :edit
    end
  end

  private

    def set_cluster
      @cluster = Cluster.find(params[:id])
    end

    def cluster_params
      params.require(:cluster).permit(:date, :assigned)
    end
end
