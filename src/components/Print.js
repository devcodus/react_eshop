import React, { Component } from 'react'

export default class Print extends Component {
    render() {
        return (
            <div className="card" style={{width: "18rem"}}>
                <img src={this.props.printInfo.img_url} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{ this.props.printInfo.title } - { this.props.printInfo.author }</h5>
                    <p className="card-text">{this.props.printInfo.caption}</p>
                    
                </div>
            </div>
        )
    }
}