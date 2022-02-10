class User < ApplicationRecord
  has_secure_password

  has_many :projects

  validates :username, presence: true, uniqueness: true, length: { maximum: 16 }, format: { without: /\s/ }
  validates :password, presence: true, length: { minimum: 6 }
end
