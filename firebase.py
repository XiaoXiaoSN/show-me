import json
import os

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


class Firebase():
    db = None
    collection = None

    def __init__(self, cert_file='./firebaseServiceAccount.json', collection=u'messages'):
        # get cert source from json file or environment variable
        cert_source = None
        if os.path.isfile(cert_file) and os.access(cert_file, os.R_OK):
            cert_source = cert_file
        elif 'FIREBASE_SERVICE_ACCOUNT' in os.environ:
            json_str = os.getenv('FIREBASE_SERVICE_ACCOUNT', '{}')
            cert_source = json.loads(json_str)
        else:
            raise Exception("Sorry, you must set one of kind cert_source")

        cred = credentials.Certificate(cert_source)
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

