class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_route: { action: 'index', params: {} },
    };
  }

  componentWillMount(){
    window.globalState.setRoute = (action, params={}) => {
      this.setState({
        current_route: {action: action, params: params}
      });
    };
  }

  render () {
    return (
      <div className="row">
        <div className="col-lg-12">
          <FlashMessage />
          <RequestRouter
            current_route={this.state.current_route}
          />
        </div>
      </div>
    );
  }
}