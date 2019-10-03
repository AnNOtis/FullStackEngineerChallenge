class Review < ApplicationRecord
  belongs_to :reviewee, class_name: "User"
  belongs_to :reviewer, class_name: "User"
  belongs_to :review_session

  validates :reviewee, presence: true, uniqueness: { scope: :review_session }
  validates :reviewer, presence: true
  validates :is_submitted, inclusion: { in: [ true, false ] }

  validate :immutable_after_submit, on: [:update, :save]
  validate :forbid_self_review

  after_initialize :default_values

  private

  def default_values
    self.is_submitted = false if self.is_submitted.nil?
  end

  def immutable_after_submit
    errors.add(:base, "can't modify after submit") if self.is_submitted
  end

  def forbid_self_review
    if self.reviewee_id == self.reviewer_id
      return errors.add(:reviewer, 'can not be the same with reviewee')
    end
  end
end
