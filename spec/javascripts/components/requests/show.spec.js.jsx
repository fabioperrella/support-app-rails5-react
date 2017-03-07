var TestUtils = React.addons.TestUtils;

describe('RequestShow', function() {
  it("renders correctly", function(done) {
    jasmine.Ajax.install();

    //setup
    window.globalState = {};
    window.paths = { requests: '/requests' };
    var dom = $("<div>");
    var request = {
      id: '1',
      title: 'aa',
      state: 'waiting_user_reply',
      updated_at: '12-06',
      description: 'kldks fosd8g fkjsdh fs',
      user: {
        name: 'joao'
      }
    }

    //exercise
    var component = TestUtils.renderIntoDocument(
      <RequestShow request={request} />
    );
    var dom = ReactDOM.findDOMNode(component);
    dom = $(dom);

    //verify
    expect(dom.find('dl dl').length).toBe(4);

    //verify request details
    expect(
      dom.find('dl dl:nth-child(1) dd').text()
    ).toEqual(request.user.name)
    expect(
      dom.find('dl dl:nth-child(2) dd').text()
    ).toEqual(request.title)
    expect(
      dom.find('dl dl:nth-child(3) dd').text()
    ).toEqual(request.state)
    expect(
      dom.find('dl dl:nth-child(4) dd').text()
    ).toEqual(request.description)

    //verify comment new
    var new_comment = 'lala popo lala';
    dom.find('#new-comment').val(new_comment);

    var responseJson = {
      "id": 31,
      "body": "dasdas",
      "request_id": 1,
      "user_id": 1,
      "created_at": "17/02/28 23:46",
      "updated_at": "2017-02-28T23:46:40.000Z",
      "user": {
        "id": 1,
        "email": "fabio.perrella@gmail.com",
        "created_at": "2017-02-22T02:52:04.000Z",
        "updated_at": "2017-02-28T23:43:56.000Z",
        "roles": null,
        "name": "fabio"
      },
      "request": {
        "id": 10,
        "title": "cfsdfsd",
        "description": "fsdf",
        "user_id": 1,
        "state": "opened",
        "created_at": "2017-02-24T03:33:01.000Z",
        "updated_at": "2017-02-24T03:33:01.000Z",
        "user": {
          "id": 1,
          "email": "fabio.perrella@gmail.com",
          "created_at": "2017-02-22T02:52:04.000Z",
          "updated_at": "2017-02-28T23:43:56.000Z",
          "roles": null,
          "name": "fabio"
        }
      }
    }
    jasmine.Ajax.stubRequest(/requests\/1\/comment/).andReturn({
      status: 201,
      statusText: 'HTTP/1.1 201 Created',
      contentType: 'application/json; charset=utf-8',
      responseText: JSON.stringify(responseJson)
    });

    TestUtils.Simulate.click(dom.find('#send-comment')[0])

    // check status change after click
    // (sorry, I don't know how to do it without this "sleep")
    window.setTimeout(function(){
      expect(dom.find('dl dl:nth-child(3) dd').text()).toEqual('opened');
      done();
    }, 1000);

    //tear down
    jasmine.Ajax.uninstall();
  });
});