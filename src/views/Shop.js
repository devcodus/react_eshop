import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Print from '../components/Print';

export default class Shop extends Component {
  constructor() {
    super();
    this.state = {
      prints: []
    }
  };


// ########### CONVERT POST TO ITEM'S ###########

  showPrints = () => {
    return this.state.prints.map(p =><Link key={p.id} to={`/prints/${p.id}`} ><Print printInfo={p}/></Link>)
  };

  getPrints = async () => {
    const res = await fetch(`http://127.0.0.1:5000/api/populate`);
    const data = await res.json();
    console.log(data)
    if (data.status==='ok'){
      this.setState({prints:data.prints})
    }




  }
  componentDidMount = () => {
    this.getPrints();
  }



  render() {
    return (
      <div>
        {this.showPrints()}
      </div>
    )
  }
}