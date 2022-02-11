class Project < ApplicationRecord
	belongs_to :user, dependent: :delete

	validates :title, presence: true, length: { maximum: 40 }, format: { without: /\A[\s]/ }
	validates :description, format: { without: /\A[\s]/ }

end
