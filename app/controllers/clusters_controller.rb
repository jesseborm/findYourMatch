class ClustersController < ApplicationController
  before_action :set_cluster, only: %i[show edit update]

  def index
    @clusters = Cluster.all
  end

  def show
    respond_to do |format|
      format.json { render json: @cluster.pairs.first.users }
    end
  end

  def edit; end

  def update
    if Cluster.find_by_day(cluster_params[:day]).nil?
      @cluster.update(cluster_params.merge(assigned: true))
      Pair.set_date(@cluster.pairs)
    end
    redirect_to :root, notice: 'Pairs created successfully'
  end

  private

  def set_cluster
    @cluster = Cluster.find(params[:id])
  end

  def cluster_params
    params.require(:cluster).permit(:day)
  end
end
