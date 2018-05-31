import React, {Component} from 'react';

class SearchBar extends Component {

  // onUserNameChange = e => {
  //   if (e.key === 'Enter') {
  //     this.props.changeUserName(e.target.value);
  //   }
  // }

  // onMessageEnter = e => {
  //   if (e.key === 'Enter') {
  //     this.props.newMessage(e.target.value);
  //     e.target.value = '';
  //   }
  // }
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
      this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // alert(this.state.value);
    this.props.updateSearchUrl(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <input type="submit" value="Submit" />
      </form>
    );
  }

}

export default SearchBar;

