class CommentList extends React.Component {
  render() {
    let commentsList = this.props.comments.map((comment) =>
      <CommentListItem comment={comment} key={comment.id} />
    );

    if(commentsList.length == 0){
      return null;
    }

    return(
      <div>
        <h3>Comments</h3>
        {commentsList}
      </div>
    );
  }
}

CommentList.propTypes = {
  comments: React.PropTypes.arrayOf(React.PropTypes.object)
};