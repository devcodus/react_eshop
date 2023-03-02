import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Poster from '../components/Poster';

export default function Shop({addToCart, user} ) {
  const [posters, setPosters] = useState([]);

  const showPosters = () => {
    return posters.map((p) => (
      <div key={p.id}>
        <Poster posterInfo={p} addToCart={() => addToCart(p)} user = {user} />
        <Link to={`/singlePoster/${p.id}`} className='btn btn-success' style={{marginBottom: '10px'}}>View details</Link>
      </div>
    ));
  };

  const getPosters = async () => {
    const res = await fetch(`http://127.0.0.1:5000/api/posters`);
    const data = await res.json();
    console.log(data);
    if (data.status === 'ok') {
      setPosters(data.posters);
    }
  };

  useEffect(() => {
    getPosters();
  }, []);

  return (
    <div className="container row">
      <div className="row">{showPosters()}</div>
    </div>
  );
}