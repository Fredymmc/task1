        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
        import { 
          getFirestore, 
          collection,
          addDoc,
          getDocs,
          getDoc,
          deleteDoc,
          onSnapshot,
          doc,
          updateDoc
       } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js"
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        const firebaseConfig = {
          apiKey: "AIzaSyBc2Uflbp7Ijcu0mx6bNZrN6bvx5A-y6Wc",
          authDomain: "tareasjavascript-28a6a.firebaseapp.com",
          projectId: "tareasjavascript-28a6a",
          storageBucket: "tareasjavascript-28a6a.appspot.com",
          messagingSenderId: "492032903837",
          appId: "1:492032903837:web:92a68ce5dc76b45ac9a274"
        };
      
        // Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveTask = (title, description) => 
   addDoc(collection(db, "task"), {title, description });
       
export const getTasks = () => getDocs(collection(db, "task")); 

export const onGetTasks = (callback) => onSnapshot(collection(db, "task"), callback);  

export const deleteTask = (id) => deleteDoc(doc(db, "task", id));

export const getTask = (id) => getDoc(doc(db, "task", id));

export const updateTask = (id, newFields) =>  
updateDoc(doc(db, "task", id), newFields);

