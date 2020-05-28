import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: "wordvault",
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

firebase.initializeApp(firebaseConfig);

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

export default firebase;
export { db, searchHashByString, searchStringByHash, addVault };
