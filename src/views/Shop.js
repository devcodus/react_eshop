import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Poster from '../components/Poster';

export default class Shop extends Component {
  constructor() {
    super();
    this.state = {
      posters: []
    }
  };

  

// ########### CONVERT POST TO ITEM'S ###########

  showPosters = () => {
    return this.state.posters.map(p =><Link key={p.id} to={`/singlePoster/${p.id}`} ><Poster posterInfo={p}/></Link>)
  };

  getPosters = async () => {
    const res = await fetch(`http://127.0.0.1:5000/api/posters`);
    const data = await res.json();
    console.log(data)
    if (data.status==='ok'){
      this.setState({posters:data.posters})
    }




  }
  componentDidMount = () => {
    this.getPosters();
  }



  render() {
    return (
      <div className='container row'>
        
        <div className='row'>
          {this.showPosters()}
        </div>

      </div>
    )
  }
}