import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar.js';
import Product from './Product.js';

class App extends Component {

  // this.state = {
  //   url: 'https://www.amazon.com/dp/B004TOD9HO'
  // };
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    };

    this.updateSearchUrl = this.updateSearchUrl.bind(this);
  }

  updateSearchUrl(value) {
    this.setState({url: value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Jungle Scout ASIN Crawler</h1>
        </header>
        <SearchBar updateSearchUrl={this.updateSearchUrl}/>
        <Product url={this.state.url}/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
