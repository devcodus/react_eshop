import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Modal from '../components/Modal';
import Post from '../components/Post';


export default function SinglePost({ user }) {
    const { postId } = useParams();
    const [post, setPost] = useState({});



    const getPostInfo = async () => {
        const url = `http://localhost:5000/api/posts/${postId}`

        const res = await fetch(url);
        const data = await res.json();
        
        if (data.status==='ok'){
            setPost(data.post)
        }
    };


    useEffect(()=>{
        getPostInfo()
    }, [])

    const deletPost = async () => {
        const url = `http://localhost:5000/api/posts/${postId}/delete`;
        const options = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${user.apitoken}`
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
            Single Post Page
            { postId }
            <Post postInfo = {post}/>

            {
            user.username===post.author
            ?
            <>
            <Link to={`/posts/update/${postId}`} className='btn btn-primary'>Update</Link>

            <Modal
                triggerButtonText='delete'
                modalTitle='This action cannot be undone' 
                modalBody='blah blah blah'
                color = 'danger'
                action = {deletPost}
                actionText = 'delete forever'
            />
            
            
            </>
            :
            <></>}

        </div>
    )
};