import React from 'react'
// import removeFromCart, user from 

export default function Cart({user, cart, removeFromCart, emptyCart}) {

    const getUniqueCart = (cart) => {
        const uniqueCart = [];
        const ids = new Set();

        for (let item of cart){
            if (!ids.has(item.id)) {
                uniqueCart.push(item)
                ids.add(item.id)
            }
        }
        return uniqueCart
    };

    const getQuantity = (searchItem, cart) => {
        let count = 0;
        for (let item of cart){
            if (item.id === searchItem.id){
                count++
            }
        }
        return count
    };

    const removeFromCartAPI = async (item) => {
        const url = 'http://127.0.0.1:5000/api/cart/remove';
        const options = {
            method: 'POST',
            body: JSON.stringify({'posterId': item.id}),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.apitoken}`
            }
            
        };

        const res = await fetch(url, options);
        const data = await res.json();
        if (data.status === 'ok'){
            console.log(data)
        }
    };

    const removeAllFromCartAPI = async (item) => {
        const url = 'http://127.0.0.1:5000/api/cart/removeall';
        const options = {
            method: 'POST',
            body: JSON.stringify({'posterId': item.id}),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.apitoken}`
            }
            
        };

        const res = await fetch(url, options);
        const data = await res.json();
        if (data.status === 'ok'){
            console.log(data)
        }
    };



    const handleClick = (item) => {
        removeFromCart(item);
        if (user.apitoken){
            removeFromCartAPI(item)
        }
    };

    const handleAllClick = (cart) => {
        emptyCart(cart);
        if (user.apitoken){
            removeAllFromCartAPI(cart)
        }
    };




    // return <p>cart</p>
    return cart.length === 0? <h1>Your cart is empty</h1>:
    (
        <>
        <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'></th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Subtotal</th>
                    <th scope='col'>Remove</th>
                </tr>
            </thead>
            <tbody>
                {getUniqueCart(cart).map(item => (
                    <tr key={item.id}>
                        <th>{item.id}</th>
                        <td><img src={item.img_url} style={{width:'50px'}} /></td>
                        <td>{item.title}</td>
                        <td>{getQuantity(item,cart)}</td>
                        <td>${item.price}</td>
                        <td>${(item.price *getQuantity(item,cart)).toFixed(2) }</td>
                        <td><button className='btn btn-danger' onClick={()=>{handleClick(item)}}>Remove</button></td>
                    </tr>
                ))
                }
            </tbody>
        </table>
        <div><button className='btn btn-danger' onClick={()=>{ handleAllClick(cart)}}>Remove All</button></div>
        </>
    )
}