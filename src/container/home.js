import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import BlogRepo from '../service/blogRepo';

const repo = new BlogRepo();

export const Home = () => {
    const [blogs, setBlogs] = useState([]);
    
    useEffect(() => {
        repo.fetchBlogs().then(data => setBlogs(data ?? []));
    }, [])


    return (<div>
        <h2>Blogs</h2>
        {blogs.map((item) => {
            return <h3 key={item.id}><Link to={`/posts/${item.id}`}>{item.name}</Link></h3>
          })}
          </div>
    );
    
    }
    
    export default Home;