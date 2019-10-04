class Admin::ReviewSessionsController < Admin::BaseController
  def index
    @review_sessions = ReviewSession.all.order(end_at: :desc)
  end

  def show
    @review_session = ReviewSession.includes(:reviews).find(params[:id])
    @reviews = if @review_session.outdated?
      then @review_session.reviews
      else @review_session.all_user_reviews
    end
  end
end
