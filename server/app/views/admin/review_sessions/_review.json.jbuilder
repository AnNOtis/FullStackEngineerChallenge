json.extract! review, :id, :review_session_id, :is_submitted
json.reviewee do
  if !review.reviewee
    json.null!
  else
    json.partial! "user", user: review.reviewee
  end
end
json.reviewer do
  if !review.reviewer
    json.null!
  else
    json.partial! "user", user: review.reviewer
  end
end
