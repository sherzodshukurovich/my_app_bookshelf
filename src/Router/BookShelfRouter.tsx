import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Books from "../pages/books/Books";
import Navbar from "../layout/Navbar";
import Registration from "../registration/Registration";
import PrivateRouter from "./PrivateRouter";

function BookShelfRouter() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<PrivateRouter/>}>
                        <Route
                            element={<Navbar/>}>
                            <Route
                                path="/books"
                                element={<Books/>}
                            />
                        </Route>
                    </Route>
                    <Route
                        path="/registration"
                        element={<Registration/>}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default BookShelfRouter;