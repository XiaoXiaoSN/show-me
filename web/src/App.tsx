import React, { useState, useEffect } from 'react';
import "firebase/database";

import Bullet from './bullet/BulletScreen';
import { loadMessages, saveMessage } from './firestore'

import logo from './logo.svg';
import './App.css';


function App() {
  const [bullets, setBullets] = useState<string[]>([])
  const [bulletID, setBulletID] = useState(0)

  const renderItem = (item: string) => {
    return <div className="item"> {item} </div>
  }

  const savingBackDoor = () => {
    saveMessage('text', `From Code ${bulletID}`)
    // setBullets(arr => [...arr, `Here is Message ${bulletID}`])
    // setBulletID(bulletID + 1)
  }

  // init function binding
  useEffect(() => {
    console.log('bind load firebase storage messages function !')
    loadMessages((change: any) => {
      const message = change.doc.data();
      console.log('loadMessages: recv message:', message)
  
      setBullets(arr => [...arr, `[${message.type}] ${message.content}`])
      setBulletID(bulletID => bulletID + 1)
    })
  }, [])

  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={savingBackDoor} > CLICK ME !!!!!!!!!!!!!!!!!!! </button>
      </header>

      <Bullet
        data={bullets}
        renderItem={renderItem}
        speed={80}
        row={5}
        rowHeight={20}
        spacing={120}
      />

    </div>
  );
}

export default App;
