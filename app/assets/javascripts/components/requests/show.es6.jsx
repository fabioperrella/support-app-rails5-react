class RequestShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {comments: [], request: this.props.request}
    this.goBack = this.goBack.bind(this);
    this.requestUpdater = this.requestUpdater.bind(this);
  }

  componentWillMount(){
    window.globalState.addComment = (comment) => {
      let comments = this.state.comments
      comments.unshift(comment);
      this.setState({comments: comments});
    };

    let comments_path = '/requests/' + this.state.request.id + '/comments'
    $.get(comments_path, (comments) => {
      this.setState({comments: comments});
    });
  }

  goBack() {
    window.globalState.setRoute('index');
  }

  requestUpdater(request) {
    this.setState({request: request});
  }

  render () {
    let breadcrumb_paths = [
      {onClick: this.goBack, label: 'Home'},
      {label: 'Details'}
    ];

    return (
      <div>
        <Breadcrumb paths={breadcrumb_paths} />
        <h2>Details of request #{this.state.request.id}</h2>
        <dl>
          <dl>
            <dt>Created by</dt>
            <dd>{this.state.request.user.name}</dd>
          </dl>
          <dl>
            <dt>Title</dt>
            <dd>{this.state.request.title}</dd>
          </dl>
          <dl>
            <dt>Status</dt>
            <dd>{this.state.request.state}</dd>
          </dl>
          <dl>
            <dt>Description</dt>
            <dd>{this.state.request.description}</dd>
          </dl>
        </dl>
        <hr />
        <CommentNew
          request={this.state.request}
          requestUpdater={this.requestUpdater}
        />
        <CommentList comments={this.state.comments} />
      </div>
    );
  }
}

RequestShow.propTypes = {
  request: React.PropTypes.object
};