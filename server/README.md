# API

## authenticate API

`/session` method: post
`/session` method: delete

## Protected API

**Admin:**

get /admin/review_sessions
get /admin/review_sessions/:id
get /admin/users

post /admin/review_sessions/:id/review
{
  reviewer_id:
  reviewee_id:
}

**Me**

get /me

get /me/reviews

// submit
post /me/review/:id
{
  content: ''
}

