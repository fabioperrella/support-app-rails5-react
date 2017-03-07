const stateToBootstrapClass = {
  'opened' : 'warning',
  'waiting_user_reply' : 'active',
  'resolved' : ''
};

class RequestTableRow extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickShow = this.handleClickShow.bind(this);
  }

  handleClickShow(event) {
    window.globalState.setRoute('show', {request: this.props.request});
  }

  render () {
    return(
      <tr className={stateToBootstrapClass[this.props.request.state]}>
        <td>{this.props.request.id}</td>
        <td>{this.props.request.title}</td>
        <td>{this.props.request.state}</td>
        <td>{this.props.request.updated_at}</td>
        <td>
          <a href="#" onClick={this.handleClickShow}>show</a>
        </td>
      </tr>
    );
  }
}
RequestTableRow.propTypes = {
  request: React.PropTypes.object
};