class Task < ApplicationRecord
  belongs_to :category

  validates :name, presence: true, length: { maximum: 40 }, format: { without: /\A[\s]/ }
  validates :body, format: { without: /\A[\s]/ }
  validates :is_completed, presence: true

end
