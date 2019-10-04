class User < ApplicationRecord
  has_secure_password
  has_many :reviews, foreign_key: :reviewer_id
  has_many :review_sessions, through: :reviews

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :is_admin, inclusion: { in: [ true, false ] }

  def avatar_url
    "//api.adorable.io/avatars/300/#{email}.png" if email
  end
end
