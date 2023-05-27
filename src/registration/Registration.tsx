import './registration.scss'
import {Button, Form, Input} from 'antd';
import axios from "axios";
import {BOOKSHELF_URL} from "../const";
import {ErrorDataToast, ErrorToast, SuccessRegisteredToast} from "../components/AllToasts";
import {useNavigate} from "react-router-dom";

function Registration() {
    const navigate=useNavigate()
    const onFinish = (values: any) => {
        axios.post(BOOKSHELF_URL + 'signup', values)
            .then((resp) => {
                localStorage.setItem('BOOKSHELF_SECRET',resp.data.data.secret)
                localStorage.setItem('BOOKSHELF_KEY',resp.data.data.key)
                SuccessRegisteredToast()
                navigate('/books')
            })
            .catch((error) => {
                ErrorToast()
            })
    };

    const onFinishFailed = (errorInfo: any) => {
        ErrorDataToast()
    };
    return (
        <div>
            <div className="registration-page">
                <div className="registration-card">
                    <div className="name">
                        Tizimga kirish
                    </div>
                    <div className="form-page">
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
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input style={{height:'44px'}}/>
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                        type: 'email'
                                    },
                                ]}
                            >
                                <Input style={{height:'44px'}} type='email'/>
                            </Form.Item>
                            <Form.Item
                                label="Key"
                                name="key"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input style={{height:'44px'}}/>
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="secret"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password style={{height:'44px'}}/>
                            </Form.Item>


                            <Form.Item

                            >
                                <Button style={{borderRadius:'12px',background:'green',justifyContent:'center',height:'44px',width:'100%',display:'flex',alignItems:'center'}}  htmlType="submit">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10.1034 15.9769C9.95854 15.8115 9.8861 15.6282 9.8861 15.4269C9.8861 15.2256 9.95854 15.0526 10.1034 14.9077L12.0111 13H4.34568C4.13286 13 3.95466 12.9282 3.81108 12.7846C3.66749 12.641 3.5957 12.4628 3.5957 12.25C3.5957 12.0372 3.66749 11.859 3.81108 11.7154C3.95466 11.5718 4.13286 11.5 4.34568 11.5H12.0111L10.0938 9.58273C9.94508 9.43401 9.87073 9.25902 9.87073 9.05776C9.87073 8.85647 9.94829 8.67826 10.1034 8.52313C10.2483 8.36801 10.4213 8.29046 10.6226 8.29046C10.8239 8.29046 10.997 8.36289 11.1419 8.50776L14.2514 11.6173C14.345 11.7109 14.411 11.8096 14.4495 11.9135C14.488 12.0173 14.5072 12.1295 14.5072 12.25C14.5072 12.3705 14.488 12.4827 14.4495 12.5866C14.411 12.6904 14.345 12.7891 14.2514 12.8827L11.1322 16.0019C10.9835 16.1506 10.8111 16.2199 10.6149 16.2096C10.4188 16.1993 10.2483 16.1218 10.1034 15.9769ZM12.6341 21C12.4213 21 12.2431 20.9282 12.0995 20.7846C11.9559 20.641 11.8841 20.4628 11.8841 20.25C11.8841 20.0372 11.9559 19.859 12.0995 19.7154C12.2431 19.5718 12.4213 19.5 12.6341 19.5H18.5956C18.6726 19.5 18.7431 19.468 18.8072 19.4039C18.8713 19.3398 18.9034 19.2693 18.9034 19.1923V5.30773C18.9034 5.2308 18.8713 5.16027 18.8072 5.09616C18.7431 5.03206 18.6726 5.00001 18.5956 5.00001H12.6341C12.4213 5.00001 12.2431 4.92821 12.0995 4.78463C11.9559 4.64105 11.8841 4.46285 11.8841 4.25003C11.8841 4.03721 11.9559 3.85901 12.0995 3.71543C12.2431 3.57183 12.4213 3.50003 12.6341 3.50003H18.5956C19.1007 3.50003 19.5283 3.67503 19.8783 4.02503C20.2283 4.37503 20.4033 4.8026 20.4033 5.30773V19.1923C20.4033 19.6974 20.2283 20.125 19.8783 20.475C19.5283 20.825 19.1007 21 18.5956 21H12.6341Z"
                                            fill="white"/>
                                    </svg>
                                    <div style={{fontWeight:'400',color:'white',fontSize:'16px',marginLeft:'12px'}} className="key">
                                        Registration
                                    </div>
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;