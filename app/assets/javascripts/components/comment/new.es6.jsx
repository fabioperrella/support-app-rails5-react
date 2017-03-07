class CommentNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {comment_body: ''}

    this.handleChangeReplyText = this.handleChangeReplyText.bind(this)
    this.handleSend = this.handleSend.bind(this);
    this.handleSendAndClose = this.handleSendAndClose.bind(this);
  }

  handleSendAndClose(event){
    let that = this;

    this.handleSend(event).done(() => {
      $.ajax({
        type: 'PUT',
        url: window.paths.requests + '/' + this.props.request.id + '/resolve',
      })
      .done((request) => {
        that.props.requestUpdater(request);
      })
    })
  }

  handleSend(event) {
    event.preventDefault();

    var data = {
      comment: {
        body: this.state.comment_body,
      }
    }

    var that = this;

    // Submit form via jQuery/AJAX
    return $.ajax({
      type: 'POST',
      url: "/requests/" + this.props.request.id + "/comments",
      data: data,
      dataType: 'json'
    })
    .done(function(createdComment) {
      window.globalState.addComment(createdComment)
      that.setState({comment_body: ''});
      that.props.requestUpdater(createdComment.request);
    })
    .fail(function(jqXhr) {
      console.log('failed to register');
    });
  }

  handleChangeReplyText(event) {
    this.setState({comment_body: event.target.value});
  }

  render() {
    let buttons = null;

    if(this.props.request.state == 'resolved'){
      buttons = (
        <button type="button"
          className="btn btn-primary"
          onClick={this.handleSend}
        >Send and reopen</button>
      )
    }
    else{
      buttons = (
        <div>
          <button type="button"
            id='send-comment'
            className="btn btn-default"
            onClick={this.handleSend}
          >Send</button>
          {' '}
          <button type="button"
            className="btn btn-primary"
            onClick={this.handleSendAndClose}
          >Send and close</button>
        </div>
      )
    }

    return(
      <form>
        <div className="form-group">
          <label htmlFor="input-description">New comment</label>
          <textarea
            className="form-control"
            id="new-comment"
            value={this.state.comment_body}
            onChange={this.handleChangeReplyText}
          />
        </div>
        <div>
          {buttons}
        </div>
      </form>
    );
  }
}

CommentNew.propTypes = {
  request: React.PropTypes.object
};