import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsFillCartFill } from 'react-icons/bs'
import logo from '../static/logo.jpeg';


export default class Nav extends Component {
    
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a href='/shop'><img className='navLogo' src={logo} alt=""/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {/* <Link className="nav-link active" aria-current="page" to="/">Home</Link> */}
                            {/* <Link className="nav-link active" aria-current="page" to="/shop">Shop</Link> */}
                            {/* <Link className="nav-link" to="/cart">Cart</Link> */}

                            {
                            this.props.user.apitoken
                            ?
                            <>
                             <Link className="nav-link alignLeft" to="/login" onClick={this.props.logMeOut}>Log Out</Link>
                             <p className='nav-link alignRight'>Hello, {this.props.user.username}</p>
                             </>
                            :
                            
                            <>

                            
                            <Link className="nav-link alignLeft" to="/signup">Sign Up</Link>
                            <Link className="nav-link alignLeft" to="/login">Log In</Link>
                            
                            </>
                            }
                            <Link className="nav-link alignRight" to="/cart">
                                <BsFillCartFill className='cartNav alignRight' />
                                {this.props.cart.length}|${this.props.cartTotal()}
                                </Link>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
};