class Admin::ReviewSessionsController < Admin::BaseController
  def index
    @review_sessions = ReviewSession.all.order(id: :desc)
  end

  def create
    puts updateParams
    @review_session = ReviewSession.create!(updateParams)
  end

  def update
    @review_session = ReviewSession.find(params[:id])
    @review_session.update!(updateParams)
  end

  def show
    @review_session = ReviewSession.includes(:reviews).find(params[:id])
    @reviews = if @review_session.outdated?
      then @review_session.reviews
      else @review_session.all_user_reviews
    end
  end

  private

  def updateParams
    params.require(:review_session).permit(
      :id,
      :title,
      :start_at,
      :end_at
    )
  end
end
