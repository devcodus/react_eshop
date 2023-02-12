import React, { Component, useState, useEffect } from 'react';
import Shop from './views/Shop';
import Nav from './components/Nav';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import SignUp from './views/SignUp';
import Login from './views/Login';
// import SingleItem from './views/SingleItem';
import Cart from './views/Cart'


export default function App() {
    // const [myList, setMyList] = useState([]);
    const [user, setUser] = useState({});

    const logMeIn = (user) => {
        setUser(user)
    };
    const logMeOut = () => {
        setUser({})
    };


    // const addToDo = (e) => {
    //     e.preventDefault();
    //     const text = e.target.myText.value
    //     setMyList(myList.concat([text]))
    // };
    // const deleteToDo = (indexToDelete) => {
    //     const copy = [...myList]
    //     copy.splice(indexToDelete, 1)
    //     // this.setState({ myList: copy }) // class version
    //     setMyList(copy) // function version
    // };



    return (
        <Router>
            <div>
                <Nav user={user} logMeOut={logMeOut}/>

                <Routes>
                    <Route path='/shop' element={<Shop />} />
                    {/* <Route path='/singleItem' element={<SingleItem />} /> */}
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/login' element={<Login logMeIn={logMeIn}/>} />
                    {/* <Route path='/todo' element={<ToDo myList={myList} handleToDoSubmit={addToDo} deleteToDo={deleteToDo} />} /> */}
                </Routes>

            </div>
        </Router>
    )

}