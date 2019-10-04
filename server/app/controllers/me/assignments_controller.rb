class Me::AssignmentsController < Me::BaseController
  def index
    @assignments = current_user.assignments
  end

  def show
    @assignment = Review.find(params[:id])
    if @assignment.reviewee_id != current_user.id && @assignment.reviewer_id != current_user.id
      raise Errors::ForbiddenError
    end
  end

  def update
    review = Review.find(params[:id])
    content = params[:content]
    review.update!(content: content)
    review.update_attribute(:is_submitted, true)

    render json: { assignment: review.as_json }
  end
end
