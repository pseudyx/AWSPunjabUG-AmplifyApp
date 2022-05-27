import React, { useState, useEffect } from 'react';
import BlogRepo from '../service/blogRepo';

const repo = new BlogRepo();
const initState = { name: ''}

export const Admin = () => {
    const [formState, setFormState] = useState(initState);
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        repo.fetchBlogs().then(data => setBlogs(data ?? []));
    }, [])

    function setInput(key, value){
        setFormState({ ...formState, [key]: value});
    }

    function addBlog(){
        const blog = { ...formState }
        setBlogs([...blogs, blog]);
        setFormState(initState);
        repo.addBlog(blog);
    }

    return (
    <div>
        <h2>Admin</h2>
        <h3>Add Blog</h3>

        <input 
            onChange={event => setInput('name', event.target.value)}
            value={formState.name}
            placeholder="name"
        />
        <button onClick={addBlog}>Create Blog</button>

        <h2>Blogs</h2>
        {blogs.map((item, idx) => {
            return <h3 key={idx}>{item.name}</h3>
          })}
    </div>
    );
    
    }
    
    export default Admin;