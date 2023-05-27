import React, {useEffect, useState} from 'react';
import './books.scss'
import {Button, Form, Input, Modal} from 'antd';
import axios from "axios";
import {BOOKSHELF_KEY, BOOKSHELF_SECRET, BOOKSHELF_URL} from "../../const";
import {toast} from 'react-toastify'
import {MD5} from 'crypto-js'
import {DeletedBookToast, EditedToast, ErrorDataToast, ErrorToast, SuccessToast} from "../../components/AllToasts";
const { Search } = Input;
function Books() {
    // ================ start Modal ========================

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [allbooks, setAllBooks] = useState([])
    const [deleteId, setDeleteId] = useState([])
    const showModal = () => {
        setIsModalOpen(true);
    };
    const showModalEdit = () => {
        setIsModalOpenEdit(true);
    };
    const showModalDelete = () => {
        setIsModalOpenDelete(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleEdit = () => {
        setIsModalOpenEdit(false);
    };
    const handleDelete = () => {
        setIsModalOpenDelete(false);
    };
    // ========= end Modal =============================
    // ========= start form ===========================

    const onFinish = (values: any) => {
        axios.post(BOOKSHELF_URL + 'books', values, {
            headers: {
                Key: localStorage.getItem(BOOKSHELF_KEY),
                Sign: MD5('POST' + '/books' + JSON.stringify(values) + localStorage.getItem(BOOKSHELF_SECRET)).toString()
            }
        })
            .then((resp) => {
                SuccessToast()
                getAllBooks()
            })
            .catch((error) => {
                ErrorToast()
            })
        handleCancel()
    };
    const onFinishEdit = (values: any) => {
        axios.patch(BOOKSHELF_URL + `books/${deleteId}`, values, {
            headers: {
                Key: localStorage.getItem(BOOKSHELF_KEY),
                Sign: MD5('PATCH' + `/books/${deleteId}` + JSON.stringify(values) + localStorage.getItem(BOOKSHELF_SECRET)).toString()
            }
        })
            .then((resp) => {
                EditedToast()
                getAllBooks()
            })
            .catch((error) => {
                ErrorToast()
            })
        handleEdit()
    };

    const onFinishFailed = (errorInfo: any) => {
        ErrorDataToast()
    };
    // ========== end form =================================
    useEffect(() => {
      getAllBooks()
    }, [])
    const getAllBooks=()=>{
        axios.get(BOOKSHELF_URL + 'books', {
            headers: {
                Key: localStorage.getItem(BOOKSHELF_KEY),
                Sign: MD5('GET' + '/books' + localStorage.getItem(BOOKSHELF_SECRET)).toString()
            }
        })
            .then((resp) => {
                setAllBooks(resp.data.data)
            })
            .catch((error) => {
                ErrorToast()
            })
    }
    const deletedBook = () => {
        if (deleteId) {
            axios.delete(BOOKSHELF_URL + `books/${deleteId}`, {
                headers: {
                    Key: localStorage.getItem(BOOKSHELF_KEY),
                    Sign: MD5('DELETE' + `/books/${deleteId}` + localStorage.getItem(BOOKSHELF_SECRET)).toString()
                }
            })
                .then((resp) => {
                    DeletedBookToast()
                    getAllBooks()
                })
                .catch((error)=>{
                    ErrorToast()
                })
        }
        handleDelete()
    }
    const onSearch = (value: string) => {
        axios.get(BOOKSHELF_URL + `books/${value}`, {
            headers: {
                Key: localStorage.getItem(BOOKSHELF_KEY),
                Sign: MD5('GET' + `/books/${value}` + localStorage.getItem(BOOKSHELF_SECRET)).toString()
            }
        })
            .then((resp) => {
                setAllBooks(resp.data.data)
            })
            .catch((error)=>{
                getAllBooks()
                ErrorToast()
            })
    };
    return (
        <div>
            <div className="books-page">
                <div className="books-search">
                    <Search placeholder=" Search ..." onSearch={onSearch}  />
                </div>
                <div className="cards">
                    {
                        allbooks?.map((item: any, index) => (
                            <div className="card">
                                <div className="card-img">
                                    <img
                                        src={item.book ?  item.book?.cover ? item.book.cover : '/media/icon/book.png' : item.cover ? item.cover : '/media/icon/book.png'}
                                        alt=""/>
                                </div>
                                <div className="card-footer">
                                    <div className="book-name">
                                        {item.book? item.book.title : item.title}
                                    </div>
                                    <div className="book-author">
                                        <span>Author:</span> {item.book? item.book.author: item.author}
                                    </div>
                                    <div className="book-published">
                                        <span>Published:</span> {item.book? item.book.published : item.published}
                                    </div>
                                </div>
                                <div className="card-action">
                                    <div onClick={() => {
                                        setDeleteId(item.book? item.book.id : item.id)
                                        showModalDelete()
                                    }} className="icon-circle">
                                        <img src="/media/icon/icons8-delete-100.png" alt=""/>
                                    </div>
                                    <div onClick={()=>{
                                        setDeleteId(item.book? item.book.id : item.id)
                                        showModalEdit()
                                    }} className="icon-circle">
                                        <img src="/media/icon/edit.png" alt=""/>
                                    </div>
                                </div>
                            </div>
                        ))
                    }


                </div>
                <div onClick={showModal} className="add-books">
                    <div className="add-text">
                        Add book
                    </div>
                </div>
            </div>
            <Modal title="ADD NEW BOOK" open={isModalOpen} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="ISBN"
                        name="isbn"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your ISBN!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item

                    >
                        <Button type="primary" htmlType="submit">
                            <div className="key">
                                Save
                            </div>
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal title="EDIT BOOK" open={isModalOpenEdit} onCancel={handleEdit}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinishEdit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your status!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item

                    >
                        <Button type="primary" htmlType="submit">
                            <div className="key">
                                Edit
                            </div>
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal open={isModalOpenDelete} onCancel={handleDelete}>
                <div className="circle">
                    <img src="/media/icon/icons8-delete-100.png" alt=""/>
                </div>
                <div className="description">
                    Are you sure you want to delete the book?
                </div>
                <div className="footer-button">
                    <div onClick={handleDelete} className="cancel">Cancel</div>
                    <div onClick={() => deletedBook()} className="success">Delete book</div>
                </div>
            </Modal>
        </div>
    );
}

export default Books;