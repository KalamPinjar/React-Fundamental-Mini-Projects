// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  databaseURL: import.meta.env.VITE_DATABASEURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function writeUserData(name, email, address, phone, orderItems, totalAmount) {
  // Check if any required parameter is undefined
  if (!name || !email || !address || !phone || !orderItems || !totalAmount) {
    console.error("One or more required parameters are undefined:", {
      name,
      email,
      address,
      phone,
      orderItems,
      totalAmount,
    });
    return;
  }
  const db = getDatabase();
  set(ref(db, "foodOrder/" + name), {
    username: name,
    email: email,
    address: address,
    phone: phone,
    orderItems: orderItems,
    totalAmount: totalAmount,
  })
    .then(() => {
      console.log("Data successfully written!");
    })
    .catch((error) => {
      console.error("Error writing data:", error);
    });
}

export { database, writeUserData };
