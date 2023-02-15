import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// import Modal from '../components/Modal'; // will we use modals?
import Poster from '../components/Poster';


export default function SinglePoster({ }) {
    const { posterId } = useParams();
    const [poster, setPoster] = useState({});



    const getPosterInfo = async () => {
        const url = `http://localhost:5000/api/posters/${posterId}`

        const res = await fetch(url);
        const data = await res.json();
        
        if (data.status==='ok'){
            setPoster(data.poster)
        }
    };


    useEffect(()=>{
        getPosterInfo()
    }, [])

    const deletePoster = async () => {
        const url = `http://localhost:5000/api/posts/${posterId}/delete`;
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                // Authorization : `Bearer ${user.apitoken}`
            }
        }

        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)
        if (data.status === 'ok') {
            // redirect
        }
    }


    return (
        <div>
            Single Poster Page
            { posterId }
            <Poster posterInfo = {poster}/>

            {/* {
            user.username===poster.author
            ?
            <>
            <Link to={`/posters/update/${posterId}`} className='btn btn-primary'>Update</Link>

            <Modal
                triggerButtonText='delete'
                modalTitle='This action cannot be undone' 
                modalBody='blah blah blah'
                color = 'danger'
                action = {deletePoster}
                actionText = 'delete forever'
            />
            
            
            </>
            :
            <></>} */}

        </div>
    )
};