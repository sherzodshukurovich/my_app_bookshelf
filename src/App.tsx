import React from 'react';
import './App.css';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookShelfRouter from "./Router/BookShelfRouter";

function App() {
    return (
        <div className="App">
            <BookShelfRouter/>
            <ToastContainer/>
        </div>
    );
}

export default App;
