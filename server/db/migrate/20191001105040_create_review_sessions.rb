class CreateReviewSessions < ActiveRecord::Migration[6.0]
  def change
    create_table :review_sessions do |t|
      t.string :title
      t.datetime :start_at
      t.datetime :end_at

      t.timestamps
    end
  end
end
