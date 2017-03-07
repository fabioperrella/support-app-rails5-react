class RequestForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {title: '', description: ''}

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value});
  }

  handleChangeDescription(event) {
    this.setState({description: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    var request = {
      request: {
        title: this.state.title,
        description: this.state.description
      }
    }

    // Submit form via jQuery/AJAX
    $.ajax({
      type: 'POST',
      url: '/requests',
      data: request,
      dataType: 'json'
    })
    .done(function(createdRequest) {
      window.globalState.setRoute('index');
      window.globalState.setFlashMessage('Request added successfully!', 'success');
      //TODO: add the new request to the list
      window.globalState.pushRequest(createdRequest);
    })
    .fail(function(jqXhr) {
      console.log('failed to register');
    });

  }

  handleBack(event) {
    window.globalState.setRoute('index');
  }

  render () {
    let breadcrumb_paths = [
      {onClick: this.handleBack, label: 'Home'},
      {label: 'New request'}
    ];

    return (
      <div>
        <Breadcrumb paths={breadcrumb_paths} />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="input-title">Title</label>
            <input
              type="text"
              className="form-control"
              id="input-title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChangeTitle}
            />
          </div>
          <div className="form-group">
            <label htmlFor="input-description">Description</label>
            <textarea
              id="input-description"
              className="form-control"
              value={this.state.description}
              onChange={this.handleChangeDescription}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          &nbsp;
          <a className="btn btn-default" onClick={this.handleBack}>Back</a>
        </form>
      </div>
    );
  }
}