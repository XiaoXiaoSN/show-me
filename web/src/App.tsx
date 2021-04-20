import React, { useState, useEffect } from 'react';
import firebase from "firebase/app";
import "firebase/database";
import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
  FirebaseDatabaseMutation,
} from "@react-firebase/database";
import Bullet from './BulletScreen';
import firebaseDB from "./firebaseConfig";
import logo from './logo.svg';
import './App.css';

const text = [
  'I am the first',
  'I am the second ha',
  'I am the third haha',
  'I am the fourth hahaha',
  'I am the fifth hahahahaha',
]

function App() {
  const [data] = useState(text)

  const renderItem = (item) => {
    return <div className="item"> {item} </div>
  }

  ////////////////////////////
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    fetchBlogs();
  }, [])

  const fetchBlogs = async () => {
    const response = firebaseDB.collection('/blogs');
    const data = await response.get();
    data.docs.forEach(item => {
      console.log('item:', item.data())
      setBlogs([...blogs, item.data()])
    })
  }
  ////////////////////////////


  return (
    <div className="App">

      {
        blogs && blogs.map(blog => {
          return (
            <div className="blog-container">
              <h4>{blog.title}</h4>
              <p>{blog.body}</p>
            </div>
          )
        })
      }

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
      </a>
      </header>

      <Bullet
        data={data}
        renderItem={renderItem}
        speed={50}
        row={3}
        rowHeight={40}
        spacing={120}
      />

    </div>
  );
}

export default App;
