import React from 'react';
import {Outlet,Navigate} from "react-router-dom";
import {BOOKSHELF_KEY, BOOKSHELF_SECRET} from "../const";
function PrivateRouter() {
    const token= localStorage.getItem(BOOKSHELF_KEY) && localStorage.getItem(BOOKSHELF_SECRET)
    return (
        <div>
            {token ? <Outlet></Outlet> : <Navigate to="/registration" />}
        </div>
    );
}

export default PrivateRouter;