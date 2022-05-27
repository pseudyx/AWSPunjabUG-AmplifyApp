import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import BlogRepo from '../service/blogRepo';

const repo = new BlogRepo();
const initState = { title: '', content: ''}

export const AddPost = () => {
    let { id } = useParams();
    const [formState, setFormState] = useState(initState);
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        repo.fetchPosts(id).then(data => setPosts(data ?? []));
    }, [])

    function setInput(key, value){
        setFormState({ ...formState, [key]: value});
    }

    function addPost(){
        const post = { ...formState, blogPostsId: id }
        setPosts([...posts, post]);
        setFormState(initState);
        repo.addPost(post);
    }

    return (<div>
        <h2>Blog: {id}</h2>
        <h3>Add Post</h3>

        <input 
            onChange={event => setInput('title', event.target.value)}
            value={formState.title}
            placeholder="title"
        />
        <input 
            onChange={event => setInput('content', event.target.value)}
            value={formState.content}
            placeholder="content"
        />
        <button onClick={addPost}>Create Post</button>

        <h2>Posts</h2>
        {posts.map((item, idx) => {
            return <h3 key={idx}>{item.title}</h3>
          })}
          </div>
    );
    
    }
    
    export default AddPost;