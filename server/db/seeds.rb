# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_number = 5

admin_user = User.create!(
  name: 'Admin User',
  email: 'admin@example.com',
  password: '123123',
  password_confirmation: '123123',
  is_admin: true,
)

normal_users = User.create!(
  (1..user_number).map do |id|
    {
      name: "User##{id}",
      email: "user#{id}@example.com",
      password: '123123',
      password_confirmation: '123123',
      is_admin: false
    }
  end
)

ReviewSession.create!(
  title: '2019 Q1 Performance Review',
  start_at: Date.new(2019, 1, 1).beginning_of_day,
  end_at: Date.new(2019, 3, 31).end_of_day
)

ReviewSession.create!(
  title: 'Forever Performance Review',
  start_at: Time.now,
  end_at: Date.new(2099, 12, 31).end_of_day
)

reviewers = [*normal_users, admin_user]
reviewers.each_index do |index|
  reviewer = reviewers[index]
  q1 = ReviewSession.first

  Review.create!(
    review_session: q1,
    reviewer: reviewer,
    reviewee: reviewers[(index + 1) % reviewers.length],
    content: 'Foooooooooooobar!'
  )
end
