class Breadcrumb extends React.Component {
  render() {
    let paths = this.props.paths;
    let lastLink = paths.pop();
    let links = paths.map((path, index) =>
      <li key={index}>
        <a href="#" onClick={path.onClick}>{path.label}</a>
      </li>
    )

    return(
      <ol className="breadcrumb">
        {links}
        <li className="active">{lastLink.label}</li>
      </ol>
    )
  }
}

Breadcrumb.propTypes = {
  paths: React.PropTypes.arrayOf(React.PropTypes.object)
};