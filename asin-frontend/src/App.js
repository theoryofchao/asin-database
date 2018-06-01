import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar.js';
import Product from './Product.js';

const rp = require('request-promise');

class App extends Component {

  // this.state = {
  //   url: 'https://www.amazon.com/dp/B004TOD9HO'
  // };
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      name: '',
      image: '',
      category: '',
      dimension: ''
    };

    this.updateSearchUrl = this.updateSearchUrl.bind(this);
  }

  updateSearchUrl(value) {
    let options = {
      method: 'POST',
      uri: `http://localhost:3000/api/asin`,
      form: {
        asin_url: value
      }
    }

    this.setState({url: value});

    rp(options)
    .then((parsedBody) => {
      parsedBody = JSON.parse(parsedBody);
      console.log(parsedBody.productTitle);
      this.setState({
        name: parsedBody.productTitle

      });
    })
    .catch((err) => {
      console.log(err);
    });
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
        {this.state.name}
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
