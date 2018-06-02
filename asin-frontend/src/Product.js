import React, {Component} from 'react';
import './Product.css';

class Product extends Component {

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
    alert(this.state.value);
    event.preventDefault();
  }

  displayCategory(categoryString) {
    let categoryArray = categoryString.split(',');
    return categoryArray.join(` > `);
  }

  displayImage(url) {
    let m = url.match("/([a-zA-Z0-9]{10})(?:[/?]|$)");
    if (m) { 
      return `http://images.amazon.com/images/P/${m[1]}.jpg`;
    }
  }

  displayRanking(rank) {
    let rankArray = rank.split("|||");
    return rankArray.reduce((accumulator, currentValue) => {
      return accumulator += `${currentValue} &`;
    }, '')
  }

  // {this.props.url}
  render() {
    let rankings = [];
    this.props.product_details.rank.split("|||").forEach((value) => {
      rankings.push(<div className="ProductBody-Rank">{value}</div>);
    })


    if(this.props.product_details.name && this.props.product_details.searching === 'false') {
      return (
        <div className="ProductBody">
          <div className="ProductBody-Name">{this.props.product_details.name}</div>
          <div className="ProductBody-Category">{this.displayCategory(this.props.product_details.category)}</div>
          <div className="ProductBody-Dimensions">{this.props.product_details.dimensions}</div>
          <img className="ProductBody-Image" src={this.displayImage(this.props.url)} alt="Couldn't find your image, sorry!"/>
          {rankings}
          <div className="ProductBody-UrlBox">
            <a className="ProductBody-Url" href={this.props.url} >{this.props.url}</a>
          </div>
          <div></div>
        </div>
      );  
    } else if (this.props.product_details.searching === 'true') {
      return (
        <div className="ProductBody-Intro">
          Scraping the Amazon Jungle...
        </div>
      );
    } else if (this.props.product_details.searching === 'error') {
      return (
        <div className="ProductBody-Intro">
          Something went wrong and we cannot find your product :(
        </div>
      );
    } else {
      return (
        <div className="ProductBody-Intro">
          Amazon Product Research Made Easy.
          Jungle Scout is the industry-leading Amazon product research tool, that has helped tens of thousands of people find profitable products to sell on Amazon. 

          Based on millions of data points collected every month, Jungle Scout has the most accurate sales estimates for Amazon sales around, so you know exactly which products will make you money. Come up with product ideas, validate demand, and find the exact products that fit your criteria. Get started now at www.junglescout.com
        </div>
      );
    }

    
  }

}

export default Product;

