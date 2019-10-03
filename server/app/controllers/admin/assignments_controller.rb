class Admin::AssignmentsController < Admin::BaseController
  def update
    review_session = ReviewSession.find(params[:review_session_id])

    if review_session.outdated?
      raise Errors::UnprocessableEntityError, "Review Session #{review_session.id} is outdated"
    end

    review = review_session.reviews.find_or_initialize_by(
      reviewee_id: params[:reviewee_id]
    )

    review.update!(reviewer_id: params[:reviewer_id], content: nil)
    render json: review.as_json(root: true)
  end
end
