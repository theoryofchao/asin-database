import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar.js';
import Product from './Product.js';

const rp = require('request-promise');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      rank: '',
      image: '',
      dimensions: '',
      url: ''
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
        name: parsedBody.productTitle,
        image: parsedBody.productImage,
        rank: parsedBody.salesRank,
        category: parsedBody.productCategory,
        dimensions: parsedBody.productDimensions
      });
    })
    .catch((err) => {
      console.log(err);
    });
   }

   // {this.state.name}
   //      {this.state.image}!!
   //      {this.state.rank}!!
   //      {this.state.category}!!
   //      {this.state.dimensions}!!

  render() {
    let productDetails = {
      name: this.state.name,
      category: this.state.category,
      rank: this.state.rank,
      image: this.state.image,
      dimensions: this.state.dimensions,
      url: this.state.dimensions
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Jungle Scout's ASIN Crawler</h1>
        </header>
        <SearchBar updateSearchUrl={this.updateSearchUrl}/>
        <Product product_details={productDetails} url={this.state.url}/>
        <div className="App-footer">Made with love by TheoryOfChao &lt;3</div>
      </div>

    );
  }
}

export default App;
