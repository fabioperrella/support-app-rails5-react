class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.text :body, null: false
      t.belongs_to(:request, foreign_key: true)
      t.belongs_to(:user, foreign_key: true)

      t.timestamps null: true
    end
  end
end
