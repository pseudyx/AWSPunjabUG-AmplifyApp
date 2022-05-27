import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import awsExport from './aws-exports';

import { withAuthenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';

import AuthRepo from './service/authRepo';

import Home from './container/home';
import Admin from './container/admin';
import Posts from './container/posts';
import AddPost from './container/addPost';
import Post from './container/post';
import React from 'react';

Amplify.configure(awsExport);
let authRepo = new AuthRepo();

function App({signOut}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authRepo.getUser().then(data => setUser(data));
  }, [])
  

  return (
    <div className="App"> 
    <button onClick={signOut}>Sign out</button> {user?.username}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/posts/:id' element={<Posts />} />
        <Route path='/posts/:id/new' element={<AddPost />} />
        <Route path='/post/:id' element={<Post />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default withAuthenticator(App);
