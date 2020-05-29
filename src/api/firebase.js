import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FB_DB_URL,
  projectId: process.env.VUE_APP_FB_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FB_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_FB_APP_ID,
  measurementId: process.env.VUE_APP_FB_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();

const searchHashByString = async function(collection, string) {
  try {
    const hash = await db
      .collection(collection)
      .where("string", "==", string)
      .get();

    if (hash.size) {
      return hash.docs[0].data();
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};

const searchStringByHash = async function(collection, hash) {
  try {
    const string = await db
      .collection(collection)
      .where("hash", "==", hash)
      .get();

    if (string.size) {
      return string.docs[0].data();
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};

const addVault = async function(collection, document) {
  try {
    const vault = await db.collection(collection).add({ ...document });
    return vault.id;
  } catch (error) {
    return error;
  }
};

const documentCount = function(collection, callback) {
  db.collection(collection).onSnapshot(querySnapShot => {
    const count = querySnapShot.size;
    // console.log(count);
    callback(count);
  });
};

export default firebase;
export { db, searchHashByString, searchStringByHash, addVault, documentCount };
