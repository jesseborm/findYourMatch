class ClustersController < ApplicationController
  before_action :set_cluster, only: [:show]

  def index
    @clusters = Cluster.all
  end

  def show; end

  def create
    @cluster = Cluster.factor(number_of_students)
    
  end

  private

    def set_cluster
      @cluster = Cluster.find(params[:id])
    end

    def cluster_params
      params.require(:cluster).permit(:date, :assigned)
    end
end
