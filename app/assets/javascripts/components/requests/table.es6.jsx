class RequestTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { requests: this.props.requests || [] } // to be able to test it
    this.refreshList = this.refreshList.bind(this);
  }

  componentDidMount() {
    this.refreshList();
  }

  componentWillMount(){
    window.globalState.pushRequest = (request) => {
      var requests = this.state.requests;
      requests.push(request);
      this.setState({requests: requests});
    };
  }

  refreshList () {
    var that = this;
    $(this.spinSpan).addClass('glyphicon-spin');
    $(this.refreshedSpan).removeClass('hide');
    $.get(window.paths.requests, (requests) => {
      that.setState({requests: requests});
      $(this.spinSpan).removeClass('glyphicon-spin');
      window.setTimeout(() => { $(this.refreshedSpan).addClass('hide'); }, 500);
    });
  }

  render () {
    let requestRows = this.state.requests.map((request) =>
      <RequestTableRow request={request} key={request.id} />
    );

    let createButton = null;
    if(window.enableNewRequest){
      createButton = <CreateButton title="New request" />
    }

    let exportLink = null;
    if(window.enableRequestReport){
      exportLink = <a href="/admin/requests/report">Report last month</a>
    }


    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Requests list{' '}
          {createButton}
          {exportLink}
          <a
            id="refresh1"
            className="pull-right"
            href="#"
            onClick={this.refreshList}
          >
            <span
              className="glyphicon glyphicon-refresh"
              ref={(span) => { this.spinSpan = span; }}
            ></span>
          </a>
          <span
            className="hide pull-right"
            ref={(span) => {this.refreshedSpan = span}}
          >refreshed...{' '}</span>
        </div>
        <div className="panel-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>State</th>
                <th>Updated at</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requestRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
RequestTable.propTypes = {
  requests: React.PropTypes.arrayOf(React.PropTypes.object)
};