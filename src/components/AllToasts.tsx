import React from 'react';
import {toast} from "react-toastify";

export const ErrorToast = () => {
    toast.error('There is a server or internet error')
}
export const ErrorDataToast = () => {
    toast.error('Your information is incomplete')
}

export const SuccessToast = () => {
    toast.success('A successful book has been created')
}
export const SuccessRegisteredToast = () => {
    toast.success('You have successfully registered')
}
export const DeletedBookToast = () => {
    toast.success('The book has been deleted')
}

export const EditedToast = () => {
    toast.success('The book has been edited')
}