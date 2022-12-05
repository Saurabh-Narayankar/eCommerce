import {initializeApp } from 'firebase/app'
import { 
    getAuth,  
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'

import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
 } from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBRSmVEDT602380he4ZwJ-IBz5YYqSeWnI",
    authDomain: "capstone-db-f4d15.firebaseapp.com",
    projectId: "capstone-db-f4d15",
    storageBucket: "capstone-db-f4d15.appspot.com",
    messagingSenderId: "305022421071",
    appId: "1:305022421071:web:a33d4519973f2b8588023a"
};
const fireBaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.getCustomParameters({
    prompt: 'select_account'
});


export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectstoAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectstoAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
}


export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshots = await getDocs(q);
    const categoryMap = querySnapshots.docs.reduce((acc, docSnapShot) => {
        const { title, items } = docSnapShot.data()
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return categoryMap

}


export const createUserDocumentFromAuth = async (userauth, additionalInformation) => {
    if (!userauth) return;
    const userDocRef = doc(db, 'users', userauth.uid);
    
    const userSnapshot = await getDoc(userDocRef)
    
    if(!userSnapshot.exists()) {
        const { displayName, email } = userauth;
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user');
        }
    }

    return userDocRef;
}


export const createAuthUserWithEmailandPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}


export const signInAuthUserWithEmailandPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}


export const SignOutUser = async () => await signOut(auth);


export const OnAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);