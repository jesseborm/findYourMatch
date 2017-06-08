class AddDateColumnToPair < ActiveRecord::Migration[5.1]
  def change
    add_column :pairs, :day, :date
  end
end
