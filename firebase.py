import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


class Firebase():
    db = None
    collection = None

    def __init__(self, cert_file='./firebaseServiceAccount.json', collection=u'messages'):
        cred = credentials.Certificate(cert_file)
        firebase_admin.initialize_app(cred)

        self.db = firestore.client()
        self.collection = collection

    def save(self, content):
        doc_ref = self.db.collection(self.collection).document(None)
        doc_ref.set(content)


if __name__ == "__main__":
    fb = Firebase()
    fb.save({
            u'type': u'Text',
            u'content': u'所謂的內容文字',
        })
    fb.save({
            u'type': u'Image',
            u'content': u'https://image.com/something.png',
        })

