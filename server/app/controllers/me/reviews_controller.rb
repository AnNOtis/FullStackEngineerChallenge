class Me::ReviewsController < Me::BaseController
  def index
    render json: { reviews: current_user.reviews }
  end

  def update
    review = Review.find(params[:id])
    content = params[:content]
    review.update!(content: content, is_submitted: true)

    render json: review.as_json(root: true)
  end
end
