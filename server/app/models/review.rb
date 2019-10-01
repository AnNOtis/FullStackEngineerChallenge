class Review < ApplicationRecord
  belongs_to :reviewee, class_name: "User"
  belongs_to :reviewer, class_name: "User"
  belongs_to :review_session

  validates :reviewee, presence: true, uniqueness: { scope: :review_session }
  validates :reviewer, presence: true
  validates :is_submitted, inclusion: { in: [ true, false ] }
end
