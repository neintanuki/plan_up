class CreateCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :categories, id: :uuid do |t|
      t.string :title
      t.uuid :project_id

      t.timestamps
    end
  end
end
