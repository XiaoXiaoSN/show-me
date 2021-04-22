import React, { useState, useEffect } from 'react';
import "firebase/database";

import Bullet from './bullet/BulletScreen';
import { saveMessage, loadMessages } from './firestore'

import logo from './logo.svg';
import './App.css';

const bullets = [
  'I am the first',
  'I am the second ha',
  'I am the third haha',
  'I am the fourth hahaha',
  'I am the fifth hahahahaha',
]

function App() {
  const [data] = useState(bullets)

  const renderItem = (item: string) => {
    return <div className="item"> { item } </div>
  }

  const saveTESTING = () => { 
    console.log('Ｉ ＡＭ SAVE')
    saveMessage('text', 'From Code')
   }

  ////////////////////////////
  // const [blogs, setBlogs] = useState([])
  useEffect(() => {
    console.log('Ｉ ＡＭ ＨＥＲＥ')
    loadMessages()
  }, [])

  // const fetchBlogs = async () => {
  //   const response = firebaseDB.collection('messages');
  //   const data = await response.get();
  //   data.docs.forEach((item: any) => {
  //     console.log('item:', item.data())
  //     // setBlogs([...blogs, item.data()])
  //   })
  // }
  ////////////////////////////


  return (
    <div className="App">

      <button onClick={saveTESTING} > CLICK ME !!!!!!!!!!!!!!!!!!! </button>

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
