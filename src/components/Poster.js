import React, { Component } from 'react'

export default class Poster extends Component {
    render() {
        return (
            <div className="card" style={{width: "18rem"}}>
                <img src={this.props.posterInfo.img_url} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{ this.props.posterInfo.title } - { this.props.posterInfo.author }</h5>
                    <p className="card-text">{this.props.posterInfo.caption}</p>
                    <p className="card-text">${this.props.posterInfo.price}</p>
                    <button type="submit">Add to Cart</button>
                </div>
            </div>
        )
    }
}