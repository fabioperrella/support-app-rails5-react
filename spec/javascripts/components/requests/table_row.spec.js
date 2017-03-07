describe('RequestTableRow', function() {
  it("renders correctly", function() {
    //setup
    var dom = $("<tbody></tbody>");
    var request = { id: '1', title: 'aa', state: 'opened', updated_at: '12-06'}

    //exercise
    ReactDOM.render(
      React.createElement(RequestTableRow, {request: request}),
      dom[0]
    )

    //verify
    expect(dom.find('tr').hasClass('warning')).toBe(true);

    expect(dom.find('tr td:nth-child(1)').text()).toBe(request.id);
    expect(dom.find('tr td:nth-child(2)').text()).toBe(request.title);
    expect(dom.find('tr td:nth-child(3)').text()).toBe(request.state);
    expect(dom.find('tr td:nth-child(4)').text()).toBe(request.updated_at);
  });
});