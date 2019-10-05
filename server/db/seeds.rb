# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'ffaker'

user_number = 5

admin_user = User.create!(
  name: 'Admin User',
  email: 'admin@example.com',
  password: '123123',
  password_confirmation: '123123',
  is_admin: true,
)

names = [
  'Pinkman',
  *((1..user_number).map { FFaker::Name.unique.first_name })
]
normal_users = User.create!(
  names.map do |name|
    {
      name: name,
      email: "#{name.downcase}@example.com",
      password: '123123',
      password_confirmation: '123123',
      is_admin: false
    }
  end
)
demo_normal_user = normal_users.first

expiredSession = ReviewSession.create!(
  title: '2019 Q1 Performance Review',
  start_at: Time.zone.parse("2019-01-01"),
  end_at: Time.zone.parse("2019-03-31")
)

currentSession = ReviewSession.create!(
  title: '2019 Q4 Performance Review',
  start_at: Time.zone.parse("2019-09-30"),
  end_at: Time.zone.parse("2099-12-31")
)

upcomingSession = ReviewSession.create!(
  title: '2020 Performance Review',
  start_at: Time.zone.parse("2020-01-01"),
  end_at: Time.zone.parse("2020-12-31")
)

reviewers = [*normal_users, admin_user]
reviewers.each_index do |index|
  reviewer = reviewers[index]

  Review.create!(
    review_session: expiredSession,
    reviewer: reviewer,
    reviewee: reviewers[(index + 1) % reviewers.length],
    is_submitted: true,
    content: FFaker::Music.unique.album
  )
end

[currentSession, upcomingSession].each do |session|
  Review.create!(
    review_session: session,
    reviewer: demo_normal_user,
    reviewee: normal_users[1],
  )
  Review.create!(
    review_session: session,
    reviewer: demo_normal_user,
    reviewee: normal_users[2],
  )
  Review.create!(
    review_session: session,
    reviewer: admin_user,
    reviewee: normal_users[3],
  )
  Review.create!(
    review_session: session,
    reviewer: admin_user,
    reviewee: normal_users[4],
  )
end
