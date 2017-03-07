class CreateRequests < ActiveRecord::Migration[5.0]
  def change
    create_table :requests do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.integer :user_id, null: false
      t.string :state, null: false

      t.timestamps null: true
    end
  end
end
