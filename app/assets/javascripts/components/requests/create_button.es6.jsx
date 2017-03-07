class CreateButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  handleCreateClick() {
    window.globalState.setRoute('create');
  }

  render () {
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.handleCreateClick}
      >{this.props.title}</button>
      )
  }
}