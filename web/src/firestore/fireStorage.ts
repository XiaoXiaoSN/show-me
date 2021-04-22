import fireStore from './firebaseConfig'

// Saves a new message on the Cloud Firestore.
export const saveMessage = (msgType: string, msgText: string) => {
  // Add a new message entry to the Firebase database.
  return fireStore.collection('messages').add({
    type: msgType,
    content: msgText,
    timestamp:  Math.floor(Date.now()),
  }).catch(function (error) {
    console.error('Error writing new message to Firebase Database', error);
  });
}

// Loads chat messages history and listens for upcoming ones.
export const loadMessages = () => {
  // Create the query to load the last 12 messages and listen for new ones.
  var query = fireStore.collection('messages').orderBy('timestamp', 'desc').limit(1);
  
  // Start listening to the query.
  query.onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
        const message = change.doc.data();
        console.log('recv message:', message.timestamp)
    });
  });
}