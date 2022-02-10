class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects, id: :uuid do |t|
      t.string :title
      t.string :description
      t.uuid :user_id

      t.timestamps
    end
  end
end
