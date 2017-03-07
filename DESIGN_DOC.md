# Design doc

## 1. High level requirement analysis

## 2. High level presentation of the data mode

The models are related as follows:

```
      +------+
      |      |1
      | User <--------------+
      |      |              |
      +------+              |
         |1                 |
         |                  |
         |N                 |1
    +----v----+        +---------+
    |         |1      N|         |
    | Request +--------> Comment |
    |         |        |         |
    +---------+        +---------+

```
 
## 3. Architecture diagram

The app is a simple rails app with mysql. The only difference is the usage of React as the frontend framework to implement the single page application.
By doing this, Rails is used only for rest apis (except the [Devise](https://github.com/plataformatec/devise) views and the reports page)

```
                        User
                         +
                         |
                         |
                  +------+---------------+
                  |                      |
                  |                      |
                  |                      |
  +---------------v--+              +----v-------------+
  |                  |  Rest APIs   |                  |
  | Frontend - React +--------------> Backend - Rails  |
  |                  |              |                  |
  +------------------+              +--------+---------+
                                             |
                                             |
                                             |
                                      +------v-----+
                                      |            |
                                      | DB - Mysql |
                                      |            |
                                      +------------+

```

## 4. Explain the breakdown of the system into components

### Frontend

The app uses React as the frontend framework, integrated to Rails with the gem [react-rails](https://github.com/reactjs/react-rails). The components are organized as follows:

```
App
└── FlashMessage
└── RequestRouter
|   └── RequestTable
|   or  └── RequestTableRow
|   └── RequestForm
|   or  └── Breadcrumb
|   └── RequestShow
|       └── Breadcrumb
|       └── CommentNew
|       └── CommentList
|           └── CommentListItem
```

The variable `window.globalState` is used to trigger changes among other components like `setRoute`, `setFlashMessage`.

I used some global variables to set different behavior for the user and admin interfaces. It is not the best way to do it, but it was a simple solution I chose to use.

The variable `window.paths` is used to set different urls for admin and user interfaces. For example, with a admin logged, it is allowed to call `PUT resolve` for any request, but for a user logged it is allowed only for his/her requests.

The variable `window.enableNewRequest` is used to show/hide the button to create new requests (admin should not create them).

The varible `window.enableRequestReport` is used to show/hide the link to the reports page (only for admins)

### Security

All the controller/actions under the `/admin` namespace checks if the user has the role `admin`.

All the actions in requests controller (out of `/admin`) query the database always inside the user context. For example, using `current_user.requests.where` instead of using `Request.where()`.

### Request states

The **Request** state machine work as follows:

```
                            + user create request
                            |
                            |
                        +---v----+
                        |        |
             +----------+ opened <-------------------+
             |          |        |                   |
             |          +---+----+                   | user add
admin add a  |              |                        | a comment
comment and  |              | admin add a comment    |
close the    |              |                        |
request      |    +---------v----------+             |
             |    |                    |             |
             |    | waiting_user_reply +-------------+
             |    |                    |
             |    +---------+----------+
             |              |
             |              | user add a comment and
             |              | close the request
             |         +----v-----+
             |         |          |
             +---------> resolved |
                       |          |
                       +----------+

```

obs: this diagram was made with [asciiflow.com](http://asciiflow.com)

When the request is in the **resolved** state, it does not appear in the **admin** panel.