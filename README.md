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

2. Install dependencies and seed Datebase

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

You can go to [Login page](http://localhost:8080/login), and choose either **login as user** or **login as admin** as a quick start.

To explore features, just click left top menu button to see a list of it.

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

Server code are under `/server` folder. It's a standard Rails application with API mode.

Here is the database design:

![ERD](https://raw.githubusercontent.com/AnNOtis/FullStackEngineerChallenge/master/_misc/ERD.png)

**ReviewSession**

It's an entity for performance reviews. Record the period and the name of performance reviews.

**Review**

It presents the relationship between reviewer and reviewee. Once an admin user assign a reviewer to a reviewee, a record will be created in this table.

Also, there are two assumptions of my implementation.

1. A reviewee can only be reviewed once in a performance review.
2. A reviewer can have multiple reviewees, but reviewee can only have one reviewer in a performance review.

**User**

It records all the users in the system including normal users and admin users. Two roles in the same table make the system easy to treat an admin user as a normal user.

The above design also benefits user experience, an admin user can write a feedback without switching accounts.


### Client Side

Client codes are under `/client` folder. It's based on top of React.

Here are a few design decisions I made:

**State management**

I chose not to introduce state management framework such as Redux for speeding up development.
Instead, I used React's built-in `context` and `useReducer` hook to manage gloabl states.

React context is suitable for such a small app. However, for practical applications, I usually use Redux for an early bailout to avoid performance problem.

**Styling**

I used [Material UI](https://material-ui.com/) to avoid building common UIs. I chose it because it provides complete and overridable design system and it's well-documented.

I choose [styled-components](https://www.styled-components.com/) to tweak styles because it scopes CSS and can easily integrated with the design system of Material UI. Also, it removes the mapping between components and classes. That makes its syntax neat.

**API calling**

I designed a hook [`useFetcher`](https://github.com/AnNOtis/FullStackEngineerChallenge/blob/master/client/src/hooks/useFetcher.js) to handle the chores of fetching API such as loading, error, cancellation and keeping data in state. By `useFetcher` , I can just use response result to render view and no need to take care of request handling in view layer.

By unifying API calling through `useFetcher`, I'm able to add up API calling features in the future without touching too much code.

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

- Sign Up page
- Add/remove/update/view employees
- List feedbacks given to the current user


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
