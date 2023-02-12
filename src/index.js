import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CartContextProvider from "./context/CartContext";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDky5wEujI7ANs2LDbsC1DXY5vQLm8GtQo",
  authDomain: "fleux-19ebc.firebaseapp.com",
  projectId: "fleux-19ebc",
  storageBucket: "fleux-19ebc.appspot.com",
  messagingSenderId: "735120316296",
  appId: "1:735120316296:web:ec722d2246221b206acc3d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </React.StrictMode>
);
