class ReviewSession < ApplicationRecord
  has_many :reviews

  validates :title, presence: true, uniqueness: true
  validates :start_at, presence: true
  validates :end_at, presence: true
  validate :end_after_start

  def status
    if start_at > Date.today
      "UPCOMING"
    elsif end_at < Date.today
      "EXPIRED"
    else
      "CURRENT"
    end
  end

  def outdated?
    end_at < DateTime.current()
  end

  def all_user_reviews
    existing_reviews = self.reviews
    all_users = User.all

    all_users.map do |user|
      review = existing_reviews.select do |r|
        r.reviewee_id == user.id
      end

      if review.first
        review.first
      else
        Review.new(review_session: self, reviewee: user)
      end
    end
  end

  private

  def end_after_start
    return if end_at.blank? || start_at.blank?

    if end_at < start_at
      errors.add(:end_at, "should be after the start at")
    end
  end
end
