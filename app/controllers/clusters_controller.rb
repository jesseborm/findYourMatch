class ClustersController < ApplicationController
  before_action :set_cluster, only: %i[show update]

  def index
    @clusters = Cluster.all
  end

  def show; end

  def update
    @cluster.update(cluster_params.merge(assigned: true))
    Pair.set_date(@cluster.pairs)
    redirect_to :root
  end

  private

  def set_cluster
    @cluster = Cluster.find(params[:id])
  end

  def cluster_params
    params.require(:cluster).permit(:day)
  end
end
