import * as React from 'react';
import FormInput from '../../components/form-input/form-input.component';
import Select from "react-select";
import '../../../../Sass/bootstrap-custom.scss'
import PasswordStrengthBar from 'react-password-strength-bar';
import cities_data, {ICity} from "../../../data/cities"
import provinces_data, {IProvince} from "../../../data/provinces"

import './signup.styles.scss';
import Enter from "../../components/enter-card/enter-card.component";
import FormSelect from "../../components/form-select/form-select.component";
import {Link} from "react-router-dom";
import {setCurrentUser} from "../../../redux/user/user.reducer";
import {useState} from "react";
import {useAppDispatch} from "../../../redux/hooks";

type SignUpForm = {
    [key: string]: any;
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    confirmPassword: string,
    city: string,
    address: string,
    phoneNumber: string,
    mobileNumber: string,
    province: string,
}
type SubmittableSignUpForm = {
    FirstName: string,
    LastName: string,
    UserName: string,
    Password: string,
    City: string,
    Address: string,
    Tel: string,
}
/**
 *
 * This is the sign up component that handles sign up of new user
 * to the system
 *
 * @todo Connect to API
 */
const Signup = () => {

    const provinces: IProvince[] = provinces_data
    const cities: ICity[] = cities_data


    const formDefaultState: SignUpForm = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        city: '',
        address: '',
        phoneNumber: '',
        mobileNumber: '',
        province: provinces[0].name,
    }

    const [form, setForm] = useState<SignUpForm>(formDefaultState)
    const [provinceId, setProvinceId] = useState<number>(provinces[0].id)
    const [error, setError] = useState<null | string>(null)
    const [isValid, setIsValid] = useState<boolean>(true)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const dispatch = useAppDispatch()


    const createSubmittableFrom = () => {
        return {
            FirstName: form.firstName,
            LastName: form.lastName,
            UserName: form.username,
            Password: form.password,
            City: form.city,
            Address: form.address,
            Tel: form.phoneNumber,
        }
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsFetching(true)
        fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(createSubmittableFrom())
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.status) {
                    console.log(data)
                    //window.location.href = "/";
                    setError(null);
                    setIsValid(true);
                    setForm(formDefaultState)
                    setProvinceId(provinces[0].id)
                    //dispatch(setCurrentUser(data.data))
                } else {
                    setError(data.message);
                    setIsValid(false);
                }

            })
            .catch(error => {
                setError(error);
                setIsValid(false);
            })
            .then(() => {
                setIsFetching(false)
            });
    };
    const handleChange = <Type extends HTMLInputElement | HTMLSelectElement>(event: React.ChangeEvent<Type>) => {
        const {value, name} = event.target;

        setForm({
            ...form,
            [name]: value
        })

        if (name == 'province') {
            let selectEvent = event as React.ChangeEvent<HTMLSelectElement>
            setProvinceId(Number(selectEvent.target.selectedOptions[0].getAttribute('data-index')))
        }
    };
    const renderError = () => {
        if (error) {
            return (
                <div className="alert alert-danger" role="alert">
                    {String(error)}
                </div>
            );
        }
    }

    return (
        <Enter title='عضویت در سیستم'
               subtitle='با وارد کردن اطلاعات خود ثبت نام کنید تا امکانات سایت برای شما فعال شود'
               imagePath='/images/banner7.jpg'>
            <form className='signup__form' onSubmit={handleSubmit}>

                <div className="signup__names row g-3">
                    <div className="col-md">
                        <FormInput
                            name='firstName'
                            type='text'
                            handleChange={handleChange}
                            value={form.firstName}
                            label='نام'
                            className='signup__first-name'
                            isValid={true}
                            required
                        />
                    </div>
                    <div className="col-md">
                        <FormInput
                            name='lastName'
                            type='text'
                            handleChange={handleChange}
                            value={form.lastName}
                            label='نام خانوادگی'
                            className='signup__last-name'
                            isValid={true}
                            required
                        />
                    </div>
                </div>

                <FormInput
                    name='username'
                    type='text'
                    handleChange={handleChange}
                    value={form.username}
                    label='نام کاربری'
                    className='signup__username'
                    isValid={true}
                    required
                />
                <div className="signup__names row g-3">
                    <div className="col-md">
                        <FormInput
                            name='password'
                            type='password'
                            value={form.password}
                            handleChange={handleChange}
                            label='رمز عبور'
                            className='signup__password mb-2'
                            isValid={true}
                            required
                        />
                        <PasswordStrengthBar scoreWords={['ضعیف', 'ضعیف', 'قابل قبول', 'خوب', 'قوی']}
                                             password={form.password}
                                             shortScoreWord={'خیلی کوتاه'}
                        />
                    </div>
                    <div className="col-md">
                        <FormInput
                            name='confirmPassword'
                            type='password'
                            value={form.confirmPassword}
                            handleChange={handleChange}
                            label='تکرار رمز عبور'
                            className='signup__confirm-password'
                            isValid={true}
                            required
                        />
                    </div>
                </div>


                <div className="signup__names row g-3">
                    <div className="col-md">
                        <FormSelect
                            name='province'
                            value={form.province}
                            handleChange={handleChange}
                            label='استان'
                            className='signup__province'
                            isValid={true}
                            options={provinces}
                            required
                        />
                    </div>
                    <div className="col-md">
                        <FormSelect
                            name='city'
                            value={form.city}
                            handleChange={handleChange}
                            label='شهر'
                            className='signup__city'
                            isValid={true}
                            options={cities.filter((item) => (item.provinceId == provinceId))}
                            required
                        />
                    </div>
                </div>

                <FormInput
                    name='address'
                    type='text'
                    value={form.address}
                    handleChange={handleChange}
                    label='آدرس'
                    className='signup__mobile-number'
                    isValid={true}
                    required
                />

                <FormInput
                    name='phoneNumber'
                    type='tel'
                    value={form.phoneNumber}
                    handleChange={handleChange}
                    label='تلفن ثابت'
                    className='signup__phone-number'
                    isValid={true}
                    required
                />

                <FormInput
                    name='mobileNumber'
                    type='tel'
                    value={form.mobileNumber}
                    handleChange={handleChange}
                    label='شماره همراه'
                    className='signup__mobile-number'
                    isValid={true}
                    required
                />
                {renderError()}
                <button className={"signup__submit-btn btn btn-primary btn-lg" + " "} disabled={isFetching}
                        type='submit'>
                    <i className='fas fa-user-plus me-2'/>
                    عضویت در سیستم
                    {isFetching ?
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/> : ""}
                </button>
                <div className='signup__other-options'>
                    <div className='signup__new-user-redirection'>
                        حساب کاربری دارید؟
                        <Link to="/login">ورود به سایت</Link>
                    </div>
                    <div className='signup__forget-password-redirection'>
                        مشکلی در ثبت نام دارید؟
                        <a href="tel:+989153179082">. با ما تماس بگیرید</a>
                    </div>
                </div>

            </form>
        </Enter>
    );

}

export default Signup;
