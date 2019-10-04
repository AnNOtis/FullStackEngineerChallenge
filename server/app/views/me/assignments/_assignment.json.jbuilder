json.extract! assignment, :id, :content, :is_submitted
json.review_session do
  json.partial! "review_session", review_session: assignment.review_session
end
json.reviewee do
  if !assignment.reviewee
    json.null!
  else
    json.partial! "user", user: assignment.reviewee
  end
end
json.reviewer do
  if !assignment.reviewer
    json.null!
  else
    json.partial! "user", user: assignment.reviewer
  end
end
