import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import BlogRepo from '../service/blogRepo';

const repo = new BlogRepo();

export const Posts = () => {
    let { id } = useParams();
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
      repo.fetchPosts(id).then(data => setPosts(data ?? []));
    }, [])


    return (<div>
        <h2>Blog: {id}</h2>
        {posts.map((item) => {
            return <h3 key={item.id}><Link to={`/post/${item.id}`}>{item.title}</Link></h3>
          })}
          <Link to={`/posts/${id}/new`}>Add Post</Link>
          </div>
    );
    
    }
    
    export default Posts;