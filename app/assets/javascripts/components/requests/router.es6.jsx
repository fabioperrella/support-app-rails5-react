class RequestRouter extends React.Component {
  routerToComponents (action) {
    var routes = {
      'index' : <RequestTable />,
      'create' : <RequestForm />,
      'show' : <RequestShow request={this.props.current_route.params.request} />
    }
    return routes[action];
  }

  render () {
    return (
      <div>
        {this.routerToComponents(this.props.current_route.action)}
      </div>
    );
  }
}

RequestRouter.propTypes = {
  current_route: React.PropTypes.object
};
