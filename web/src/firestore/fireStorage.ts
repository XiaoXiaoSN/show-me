import fireStore from './firebaseConfig'

// Saves a new message on the Cloud Firestore.
export const saveMessage = (msgType: string, msgText: string) => {
  // Add a new message entry to the Firebase database.
  return fireStore.collection('messages').add({
    type: msgType,
    content: msgText,
    timestamp:  Date.now() / 1000,
  }).catch(function (error) {
    console.error('Error writing new message to Firebase Database', error);
  });
}

// Loads chat messages history and listens for upcoming ones.
export const loadMessages = (handleCallbackFn: (change: any) => void) => {
  const nowTime = Date.now() / 1000

  // Create the query to load the latest message and listen for new ones.
  const query = fireStore.collection('messages')
      // .where('type', 'in', ['text', 'image'])
      .where('timestamp', '>', nowTime)
      .orderBy('timestamp', 'desc')

  // Start listening to the query.
  query.onSnapshot(snapshot => {
    console.log('HERE IS onSnapshot')
    snapshot.docChanges().forEach(handleCallbackFn);
  });
}