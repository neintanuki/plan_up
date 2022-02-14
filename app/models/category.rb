class Category < ApplicationRecord
  belongs_to :project
  has_many :tasks, dependent: :destroy

  validates :title, presence: true, length: { maximum: 40 }, format: { without: /\A[\s]/ }
end
