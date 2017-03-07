class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flash_message: null,
      flash_class: null
    };
  }

  componentWillMount(){
    window.globalState.setFlashMessage = (message, className) => {
      this.setState({flash_message: message, flash_class: className});
    };
  }

  render () {
    if(this.state.flash_message == null){
      return null;
    }
    setTimeout(() => this.setState({flash_message: null}), 3000);

    return(
      <div className={"alert alert-" + this.state.flash_class} role="alert">
        {this.state.flash_message}
      </div>
    );
  }
}
