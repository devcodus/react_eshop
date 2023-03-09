import React, { Component, useState, useEffect } from 'react';
import Shop from './views/Shop';
import Nav from './components/Nav';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import SignUpView from './views/SignUpView';
import Login from './views/Login';
import SinglePoster from './views/SinglePoster';
import Cart from './views/Cart'


const REACT_APP_STRIPE_KEY = process.env.REACT_APP_STRIPE_API_KEY


export default function App() {

    const [products, setProducts] = useState([]);

    // const [myList, setMyList] = useState([]);
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);

    const logMeIn = (user) => {
        setUser(user)
    };
    const logMeOut = () => {
        setUser({})
    };

    

    

    const addToCart = (poster) => {
        const copy = [...cart, poster]
        setCart(copy)
    };

    const removeFromCart = (poster) => {
        const copy = [...cart]
        for (let i = cart.length-1; i>=0; i--){
            if (poster.id === cart[i].id){
                copy.splice(i,1)
                break
            
            }
        }
        setCart(copy)
    };

    const emptyCart = () => {
        setCart([])
        
    };
    
    const cartTotal =  () => {
        let total = 0;
        for (let item of cart) {
            total += parseFloat(item.price)
        }
        return total.toFixed(2)
    };

    const getCartAPI = async (user) =>{
        if (user.apitoken){
            const url = 'http://127.0.0.1:5000/api/cart/get';
            const options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.apitoken}`
                }
            }

            const res = await fetch(url, options);
            const data = await res.json();
            if (data.status === 'ok') {
                setCart(data.cart)
            }

        } else {
            setCart([])
        }
    };

    useEffect(()=>{
        getCartAPI(user);
        getProducts();
    }, [user])

    

    const getProducts = async () => {
        const url = 'https://api.stripe.com/v1/products';
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${REACT_APP_STRIPE_KEY}`
            }
        }

        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)
        setProducts(data.data)
    };

    // const showProducts = () =>{
    //     return products.map(p=><div key={p.id}><h1>{p.name}</h1><button>Add to Cart</button></div>)
    // }

    // const addInputTag = () => {
    //     return Object.keys(cart).map(key => key !== 'size'?
    //         <input key={key}  type="" name={cart[key].default_price} defaultValue={cart[key].qty}/>
    //         :
    //         <></>
    //         )
    // }


    return (
        <Router>
            <div>
                <Nav user={user} logMeOut={logMeOut} cart={cart} cartTotal={cartTotal}/>

                <Routes>
                    <Route path='/'  element={<SignUpView />} />
                    <Route path='/shop'  element={<Shop user={user} addToCart={addToCart}/>} />
                    <Route path='/singlePoster' element={<SinglePoster />} />
                    <Route path='/singlePoster/:posterId' element={<SinglePoster addToCart={addToCart} />} />
                    <Route path='/cart' element={<Cart removeFromCart={removeFromCart} emptyCart={emptyCart} user={user} cart={cart} />} />
                    <Route path='/signup' element={<SignUpView />} />
                    <Route path='/login' element={<Login logMeIn={logMeIn}/>} />
                    {/* <Route path='/todo' element={<ToDo myList={myList} handleToDoSubmit={addToDo} deleteToDo={deleteToDo} />} /> */}
                </Routes>
                
            </div>
        </Router>
    )

}