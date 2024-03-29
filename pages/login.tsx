﻿import React, {ReactNode, useEffect, useState} from 'react';
import {setCurrentUser} from '../redux/user.reducer'
import FormInput from '../components/form-input/form-input.component';
import styles from "./login.module.scss"
import Enter from "../components/enter-card/enter-card.component";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {useRouter} from "next/router";
import ErrorCode from "../data/error-codes";
import {useLoginMutation} from "../redux/api.slice";
import {Alert} from "react-bootstrap";
import {FaDoorOpen} from "react-icons/fa";
import {sampleUser} from "../types/IUser";

type TPhoneNumberForm = {
    [key: string]: string;
    UserName: string;
    Code: string;
    Password: string;
}

enum FormTypes {
    PHONE,
    NEW,
    PASSWORD,
    CODE,
}

const Gate = () => {
    const [form, setForm] = useState<TPhoneNumberForm>({
        UserName: "",
        Code: "",
        Password: "",
    })
    const router = useRouter()
    const [formState, setFormState] = useState<FormTypes>(FormTypes.PHONE)
    const [error, setError] = useState<string | null>(null)
    const [isValid, setIsValid] = useState<boolean>(true)
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.currentUser)
    const [login, {isLoading: loginLoading, error: loginError}] = useLoginMutation()
    useEffect(() => {
        if (user) {
            router.push('/')
        }
    })
    const onFormSuccess = (data: any) => {

        setError(null);
        setIsValid(true);
        setForm({
            UserName: "",
            Code: "",
            Password: "",
        })
        /*dispatch(setCurrentUser(data.data))*/
        dispatch(setCurrentUser(data))
        router.push('/')
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        switch (formState) {
            case FormTypes.PHONE:
                setFormState(FormTypes.CODE)
                break;
            case FormTypes.CODE:
                onFormSuccess(sampleUser)
                break;
            case FormTypes.PASSWORD:
                onFormSuccess(sampleUser)
             /*   login({
                    "UserName": form.UserName,
                    "Password": form.Password
                })
                    .unwrap()
                    .then(data => {
                        switch (data.errorCode) {
                            case ErrorCode.NoError:
                                onFormSuccess(data)
                                break
                            case ErrorCode.Exception:
                                setError(`خطای 1: مشکلی پیش آمده است. لطفا با تماس بگیرید.`);
                                setIsValid(false);
                                break
                            case ErrorCode.NoExistUserName:
                                setError("این نام کاربری وجود ندارد.")
                                setIsValid(false);
                                break
                            case ErrorCode.WrongPassword:
                                setError("پسورد اشتباه است.")
                                setIsValid(false);
                                break
                            default:
                                setError(`خطای ناشناخته کد ${data.errorCode}`)
                                setIsValid(false);
                                break
                        }
                    })
                    .catch(error => {
                        setError(`System error: ${error}`);
                        setIsValid(false);
                    });*/


                break;
        }
        setError(null);
        setIsValid(true);
    };

    const handleTransition = (event: React.MouseEvent<HTMLButtonElement>) => {
        const {name} = event.currentTarget;
        event.preventDefault();

        if (name == "enterPassword") {
            setFormState(FormTypes.PASSWORD)
        } else if (name == "enterCode") {
            setFormState(FormTypes.CODE)
        } else if (name == "backPhone") {
            setFormState(FormTypes.PHONE)
        }
        setError(null);
        setIsValid(true);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.currentTarget;
        setForm({
            ...form,
            [name]: value
        })
    };

    const renderError = () => {
        if (error) {
            return (
                <Alert variant={'danger'}>
                    {String(error)}
                </Alert>
            );
        }
    }
    switch (formState) {
        case FormTypes.PHONE: {
            return (
                <Enter title='ورود / عضویت'
                       subtitle='لطفا شماره همراه خود را وارد کنید.'
                       imagePath='/images/banner6.jpg'>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <FormInput
                            id='PhoneNumber'
                            name='UserName'
                            type='tel'
                            handleChange={handleChange}
                            value={form.UserName}
                            label='شماره همراه'
                            className='mb-3'
                            isValid={isValid}
                            required
                        />

                        {renderError()}


                        <button className='btn btn-primary w-100 mb-5' type='submit'>
                            <FaDoorOpen className={'me-2'}/>
                            ورود به Carrow
                        </button>

                        <div className='login__new-other-options'>
                            <div className='login__forget-password-redirection'>
                                نیاز به کمک دارید؟
                                <a href="tel:+989153179082"> با پشتیبانی تماس بگیرید</a>
                            </div>
                        </div>
                    </form>
                </Enter>
            );
        }
        case FormTypes.CODE: {
            return (
                <Enter title='ورود با کد تایید'
                       subtitle={`
                       کد تایید ارسال شده به
                        ${form.UserName}
                        را وارد کنید. 
                       `}
                       imagePath='/images/banner6.jpg'>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <FormInput
                            id='Code'
                            name='Code'
                            type='text'
                            handleChange={handleChange}
                            value={form.Code}
                            label='کد تایید'
                            className='mb-3'
                            isValid={isValid}
                            required
                        />

                        {renderError()}


                        <div className='row g-3 mb-5'>
                            <div className='col'>
                                <button className='login__submit-btn btn btn-primary w-100' type='submit'>
                                    ادامه
                                </button>
                            </div>
                            <div className='col'>
                                <button className='login__submit-btn btn btn-light w-100' name='backPhone'
                                        onClick={handleTransition}>
                                    تغییر شماره
                                </button>
                            </div>
                        </div>

                        <button className='btn btn-link p-0 mb-2' name="enterPassword" onClick={handleTransition}>
                            ورود با رمز عبور
                        </button>
                        <div className=''>
                            نیاز به کمک دارید؟
                            <a href="tel:+989153179082"> با پشتیبانی تماس بگیرید</a>
                        </div>

                    </form>
                </Enter>
            );
        }
        case FormTypes.PASSWORD: {
            return (
                <Enter title='ورود با رمز عبور'
                       subtitle="رمز عبور خود را وارد کنید"
                       imagePath='/images/banner6.jpg'>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <FormInput
                            id='Password'
                            name='Password'
                            type='password'
                            handleChange={handleChange}
                            value={form.Password}
                            label='رمز عبور'
                            className='mb-3'
                            isValid={isValid}
                            required
                        />

                        {renderError()}


                        <div className='row g-3 mb-5'>
                            <div className='col'>
                                <button className='login__submit-btn btn btn-primary w-100' type='submit'>
                                    ادامه
                                </button>
                            </div>
                            <div className='col'>
                                <button className='login__submit-btn btn btn-light w-100' name='backPhone'
                                        onClick={handleTransition}>
                                    تغییر شماره
                                </button>
                            </div>
                        </div>

                        <button className='btn btn-link p-0 mb-2' name="enterCode" onClick={handleTransition}>
                            ورود با کد یک‌بار‌مصرف
                        </button>
                        <div>
                            نیاز به کمک دارید؟
                            <a href="tel:+989153179082"> با پشتیبانی تماس بگیرید</a>
                        </div>
                    </form>
                </Enter>
            );
        }
        default: {
            //statements;
            break;
        }
    }


}

export default Gate;
