json.review_session do
  json.extract! @review_session, :id, :title, :start_at, :end_at, :status
end
