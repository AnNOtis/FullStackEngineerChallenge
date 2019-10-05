# Full Stack Developer Challenge

An assignment from [here](https://github.com/Pay-Baymax/FullStackEngineerChallenge)

## Prerequisite:

- Ruby v2.5.1
- Bundler
- Node.js >= v10
- yarn

## Setup

1. Clone repository

  ```
  git clone git@github.com:AnNOtis/FullStackEngineerChallenge.git
  cd FullStackEngineerChallenge
  ```

2. Install dependencies and seed datebase

  ```
  ./setup.sh
  ```

3. Run rails server and webpack-dev-server

  ```
  ./start.sh
  ```

4. open http://localhost:8080

## How to browse the website

I've predefined some mock data that can be played around.

You can go to [Login page](http://localhost:8080/login), and choose either **"Login as employee"** or **"Login as admin"** as a quick start.

To explore features, click the left-top menu button to see a list of it.

## Tech stack

**Backend**

- Ruby on Rails
- SQLite

**Frontend**

- React
- React context for shared state
- Material UI + styled-components

## Design choices behind the project

### Server Side

The server code is under the `/server` folder. It's a standard Rails application with API mode.

Here is the database design:

![ERD](https://raw.githubusercontent.com/AnNOtis/FullStackEngineerChallenge/master/_misc/ERD.png)

**ReviewSession**

It's an entity for performance reviews. Record the period and the name of performance reviews.

**Review**

It presents the relationship between a reviewer and a reviewee. Once an admin user assigns a reviewer to a reviewee, a record is created in this table.

Also, there are two assumptions about my implementation.

1. A reviewee can have only one reviewer in a review session.
2. A reviewer can have multiple reviewees per review session.

**User**

It records all the users in the system, including normal users and admin users. Two roles in the same table make the system easy to treat an admin user as a normal user.

The above design also benefits the user experience. An admin user can write feedback as a reviewer without switching accounts.


### Client Side

The client code is under the `/client` folder. It's based on top of React.

Here are a few design decisions I made:

**State management**

For speeding up development, I chose not to introduce any state management framework such as Redux. Instead, I used React's built-in `context` and `useReducer` hook to manage global states.

React context is suitable for such a small app. However, for a practical application, I usually use Redux for an early bailout to avoid performance problems.

**Styling**

I used [Material UI](https://material-ui.com/) to avoid building common UIs. I chose it because it provides a complete and overridable design system, and it's well-documented.

I choose [styled-components](https://www.styled-components.com/) to tweak styles because it scopes CSS and can be easily integrated with the design system of Material UI. Also, it removes the mapping between components and classes. That makes its syntax neat.

**API calling**

I designed a hook [`useFetcher`](https://github.com/AnNOtis/FullStackEngineerChallenge/blob/master/client/src/hooks/useFetcher.js) to handle the chores of fetching API such as loading, error, cancellation and keeping data in a state. By `useFetcher` , I can just use response results to render view and no need to take care of request handling in the view layers.

By unifying API calling through `useFetcher`, I'm able to add up future API features such as caching without touching too much code.

## Possible future improvements

**System**

- Multiple time zones
- User experience:
  - Frontend validation
  - API cache layer
  - Normalize API response for reactive update
  - Code splitting for route-based chunks and dynamic import.
- Security:
  - CSRF token
- Deployment & production setup: (I only set up for development-only)
  - CORS settings
  - Configs can be changed by environment variables

**Features**

- Sign up
- Add/remove/update/view users
- List feedbacks has given to the current user

## Screenshots

<p float="left">
  <img src="https://raw.githubusercontent.com/AnNOtis/FullStackEngineerChallenge/master/_misc/screenshot1.png" width="240" />
  <img src="https://raw.githubusercontent.com/AnNOtis/FullStackEngineerChallenge/master/_misc/screenshot2.png" width="240" />
  <img src="https://raw.githubusercontent.com/AnNOtis/FullStackEngineerChallenge/master/_misc/screenshot3.png" width="240" />
</p>

---

<details><summary>Click to see the original content</summary>
<p>

# Full Stack Developer Challenge
This is an interview challengs. Please feel free to fork. Pull Requests will be ignored.

## Requirements
Design a web application that allows employees to submit feedback toward each other's performance review.

*Partial solutions are acceptable.*  It is not necessary to submit a complete solution that implements every requirement.

### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedback

## Challenge Scope
* High level description of design and technologies used
* Server side API (using a programming language and/or framework of your choice)
  * Implementation of at least 3 API calls
  * Most full stack web developers at PayPay currently use Java, Ruby on Rails, or Node.js on the server(with MySQL for the database), but feel free to use other tech if you prefer
* Web app
  * Implementation of 2-5 web pages using a modern web framework (e.g. React or Angular) that talks to server side
    * This should integrate with your API, but it's fine to use static responses for some of it
* Document all assumptions made
* Complete solutions aren't required, but what you do submit needs to run.

## How to complete this challenge
* Fork this repo in github
* Complete the design and code as defined to the best of your abilities
* Place notes in your code to help with clarity where appropriate. Make it readable enough to present to the PayPay interview team
* Complete your work in your own github repo and send the results to us and/or present them during your interview

## What are we looking for? What does this prove?
* Assumptions you make given limited requirements
* Technology and design choices
* Identify areas of your strengths
* This is not a pass or fail test, this will serve as a common ground that we can deep dive together into specific issues

</p>
</details>
