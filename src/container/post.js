import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import BlogRepo from '../service/blogRepo';

const repo = new BlogRepo();

export const Post = () => {
    let { id } = useParams();
    const [post, setPost] = useState({});
    
    useEffect(() => {
      repo.getPost(id).then(data => setPost(data ?? {}));
    }, [])


    return (<div>
        <h2>Post: {id}</h2>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
          </div>
    );
    
    }
    
    export default Post;