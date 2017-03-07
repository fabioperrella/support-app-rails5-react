## 1. Instructions to install and configure prerequisites or dependencies

### With docker!

If using docker, it is possible to build and start all the dependencies running the command below:

```
$ docker-compose up
```

### Without docker

If not using docker, it is necessary to install mysql-server and configure the user/pass in `config/database.yml`

### Installing dependencies

To install the dependencies and create the database:
```
$ bin/setup
```

This command will also create 3 users:
- admin@example.com (password: initial1234)
- user1@example.com (password: initial1234)
- user2@example.com (password: initial1234)

The user admin@example.com has the role `admin` which allows him to log into `/admin` path.

## 3. Assumptions I have made

There are 2 interfaces, one for users and other for admins (support agents). In the user interface, users can create **Requests**, than in the admin interface, the admins can reply (or comment) the Requests.

I used the gem `react-rails` to help setup the app with React faster than if I used NPM and something like webpack. Because of this is not easy to use React plugins like `react-router` or `jest` to test.

## 4. Requirements that I have not covered

- This app is almost a single page application. Only the devise views (for sign , sign up, logout, etc..) and the reports view are not part of the SPA.
- I didn't create an admin role above the support agents role. There is only an `admin` role, which is the same role as the support agetns.
- I didn't implement a search in admin interface. The time was over and I couldn't do it.

## 5. Instructions to configure and prepare the source code to build and run properly

### To run tests
Rspec:
```
$ bundle exec rspec
```

Jasmine:
```
$ bundle exec rails s
go to http://localhost:3000/specs
```

Or run in commandline:
```
$ bundle exec rake spec:javascript
```

### To start the server
```
bundle exec rails s
```

### Interfaces

#### Admin

URL: [http://localhost:3000/admin](http://localhost:3000/admin)

Only users with the role **admin** can log in in this route.

The requests are displayed in a order to show first the requests which are waiting more time for a reply.

The resolved requests are not displayed in this view.

#### User

URL: [http://localhost:3000](http://localhost:3000)

The logged user can only see and comment his/her requests.

The user can create a new request.

## 6. Issues you have faced while completing the assignment

### Frontend framework

It was my first time using React and I spent a time learning it. I've already used Backbone and Angular-v1 in other projects, but I chose to try a better  one. I like React a lot, now I have to study more about it. I'm looking forward for rails 5.1 wich will help to use webpack and React from npm!

It was my first time using JSX and ES6. I was used to use pure javascript. So in some JS files, I mixed ES5 with ES6.

### Testing JS

It was difficult to test the JS code because I'm using the gem `react-rails`. But I found a way to do it eventually. I will blog about it, because I didn't find anything showing how to test with `jasmine` and `react-rails` the way I did.

### Rails5

It was my first time using rails5. In my work, I use rails 3 and 4 and there are some things different, for example, controller specs doesn't exist anymore (or maybe should not exist anymore).

### UX

I'm not a UX specialist, so I lost some time trying to found a way to implement the views.

