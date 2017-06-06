class CreateClusters < ActiveRecord::Migration[5.1]
  def change
    create_table :clusters do |t|
      t.date :day
      t.boolean :assigned

      t.timestamps
    end
  end
end
