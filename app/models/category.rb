class Category < ApplicationRecord
  belongs_to :project

  validates :title, presence: true, length: { maximum: 40 }, format: { without: /\A[\s]/ }
end
