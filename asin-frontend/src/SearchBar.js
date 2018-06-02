import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {

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
      <form className="SearchBar"  onSubmit={this.handleSubmit}>
        <input className="SearchBar-Input" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter a product URL and get information on the product!"/>
        <input className="SearchBar-Submit" type="submit" value="Submit" />
      </form>
    );
  }

}

export default SearchBar;

