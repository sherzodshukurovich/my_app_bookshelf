import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import './navbar.scss'
import type { MenuProps } from 'antd';
import {  Dropdown } from 'antd';
import axios from "axios";
import {BOOKSHELF_KEY, BOOKSHELF_SECRET, BOOKSHELF_URL} from "../const";
import {MD5} from "crypto-js";
import {ErrorToast} from "../components/AllToasts";
function Navbar() {
    interface IUser {
        name: string;
        email: string;
        key: string;
        secret: string;
    }
    const [userData,setUserData]=useState<IUser>()
    useEffect(()=>{
        axios.get(BOOKSHELF_URL+ 'myself', {
            headers: {
                Key: localStorage.getItem(BOOKSHELF_KEY),
                Sign: MD5('GET' + '/myself' + localStorage.getItem(BOOKSHELF_SECRET)).toString()
            }
        })
            .then((resp) => {
                setUserData(resp.data.data)
            })
            .catch((error) => {
                ErrorToast()
            })
    },[])
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div style={{padding:'6px',fontSize:'14px',fontWeight:'400'}}>
                  <b>Name:</b>  {userData?.name}
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div style={{padding:'6px',fontSize:'14px',fontWeight:'400'}}>
                <b>Email:</b>  {userData?.email}
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div style={{padding:'6px',fontSize:'14px',fontWeight:'400'}}>
                   <b>Key:</b> {userData?.key}
                </div>
            ),
        },
    ];
    return (
        <div>
            <div className="navbar-page">
                <div className="logo">
                    Lavina Tech
                </div>
                <div className="user">
                    <Dropdown overlayStyle={{width:'240px'}} menu={{ items }} placement="bottomRight" arrow>
                        <div>
                            <img src="/media/icon/user.png" alt=""/>
                        </div>
                    </Dropdown>
                </div>
            </div>
            <Outlet/>
        </div>
    );
}

export default Navbar;