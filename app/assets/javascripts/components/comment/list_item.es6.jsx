class CommentListItem extends React.Component {
  render() {
    return(
      <div>
        <p>[{this.props.comment.created_at}] Author: {this.props.comment.user.name}</p>
        <p>{this.props.comment.body}</p>
        <hr />
      </div>
    );
  }
}

CommentListItem.propTypes = {
  comment: React.PropTypes.object
};