describe('RequestTable', function() {
  it("renders correctly", function() {
    //setup
    window.globalState = {};
    window.paths = { requests: '/requests' };
    var dom = $("<div></div>");
    var request1 = { id: '1', title: 'aa', state: 'opened', updated_at: '12-06'}
    var request2 = { id: '2', title: 'bb', state: 'opened', updated_at: '13-06'}
    var requests = [request1, request2];

    //exercise
    ReactDOM.render(
      React.createElement(RequestTable, { requests: requests }),
      dom[0]
    )

    //verify
    expect(dom.find('tbody tr').length).toBe(2);

    expect(
      dom.find('tbody tr td:nth-child(1)')
         .map(function() {
           return $(this).text()
         })
         .get()
    ).toEqual([request1.id, request2.id])
  });
});