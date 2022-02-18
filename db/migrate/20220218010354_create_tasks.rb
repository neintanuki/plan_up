class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks, id: :uuid do |t|
      t.string :name
      t.string :body
      t.boolean :is_completed
      t.datetime :due_date
      t.uuid :category_id

      t.timestamps
    end
  end
end
