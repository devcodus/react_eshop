import React from 'react'

// export default class Poster extends Component {
//     render() {
//         return (
//             <div className="card" style={{width: "18rem"}}>
//                 <img src={this.props.posterInfo.img_url} className="card-img-top" alt="..." />
//                 <div className="card-body">
//                     <h5 className="card-title">{ this.props.posterInfo.title } - { this.props.posterInfo.author }</h5>
//                     <p className="card-text">{this.props.posterInfo.caption}</p>
//                     <p className="card-text">${this.props.posterInfo.price}</p>
//                     <button type="submit">Add to Cart</button>
//                 </div>
//             </div>
//         )
//     }
// }

// import React from 'react'
// , user, setMessages
    //     if (user.apitoken)    // Authorization: `Bearer ${user.apitoken{

    

// CHANGED FROM CLASS TO FUNCTION
export default function Poster({posterInfo, addToCart, user}) {
    const addToCartAPI = async () => {
        if (user.apitoken){


            const url = `http://127.0.0.1:5000/api/cart/add`
            const options = {
                method: 'POST',
                body: JSON.stringify({'posterId': posterInfo.id}),
                headers:{
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${user.apitoken}`
                    }
                }
            

            const res = await fetch(url, options);
            const data = await res.json();
            if (data.status === 'ok'){
                            console.log(data)
                        }
    }
}
    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={posterInfo.img_url} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{posterInfo.title}</h5>
                <p className="card-text">${posterInfo.price}</p>
                <button className='btn btn-primary' onClick={()=>{addToCart(posterInfo); addToCartAPI()} }>Add To Cart</button>
            </div>
              
        </div>
    )
}