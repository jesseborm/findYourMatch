class AddDefaultToCluster < ActiveRecord::Migration[5.1]
  def change
    change_column :clusters, :assigned, :boolean, null: false, default: false
  end
end
