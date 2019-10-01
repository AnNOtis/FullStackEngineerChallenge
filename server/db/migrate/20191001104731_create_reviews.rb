class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.references :reviewee
      t.references :reviewer
      t.references :review_session
      t.boolean :is_submitted, null: false, default: false
      t.text :content

      t.timestamps
    end
  end
end
