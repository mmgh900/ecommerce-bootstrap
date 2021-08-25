import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from "redux-persist";
import '../styles/global.css'
import {AppProps} from 'next/app'
import Head from 'next/head'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import {Provider} from 'react-redux'
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {CookiesProvider} from 'react-cookie';
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss"
import "swiper/components/navigation/navigation.scss"
import React, {useEffect, useState} from "react";
import store from "../redux/store";
import {useCookies} from 'react-cookie';
import NProgress from 'nprogress';
import Router from 'next/router';
import "nprogress/nprogress.css";
import {GetServerSideProps} from "next";
import {createParamsFromQueries} from "../lib/products";
import getApiUrl from "../lib/backend-root";
import queryString from "querystring";
import {useGetCartQuery} from "../redux/api.slice";
import {setCurrentUser} from "../redux/user.reducer";

NProgress.configure({
    showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({Component, pageProps}: AppProps) {
    let persistor = persistStore(store);

    useEffect(() => {
        /**
         * This is for running the animations
         * */
        AOS.init();
    }, [])


    const AppWrapper = ({children}) => {
        const {data: cart, error, isLoading} = useGetCartQuery()
        const dispatch = useAppDispatch()
        useEffect(() => {
            if (error?.status == 401) {
                dispatch(setCurrentUser(null))
            }
        }, [error])
        return (
            <div dir="rtl" lang="fa">
                {children}
            </div>
        )
    }

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description"
                      content="فروشگاه پیکان پارس، تهیه و توزیع لوازم یدکی اصلی خودرو با ارائه برندهای برتر ایساکو، اورجینال، بوش، اکیوم، ایران کاربراتور، آی ان آ، اتحاد موتور، عظام و... در خدمت همکاران گرامی می باشد."/>
                <meta name="keywords"
                      content="فروشگاه اینترنتی، خرید آنلاین، لوازم یدکی خودرو، ایساکو، ایران کاربراتور، اکیوم، بوش، لنت، تسمه تایم، شمع موتور، بلبرینگ، سوپاپ، بوجیکرد، پیکان پارس"/>
                <meta name="theme-color" content="#198754"/>

                <link rel="apple-touch-icon" sizes="57x57" href="/images/favicon/apple-icon-57x57.png"/>
                <link rel="apple-touch-icon" sizes="60x60" href="/images/favicon/apple-icon-60x60.png"/>
                <link rel="apple-touch-icon" sizes="72x72" href="/images/favicon/apple-icon-72x72.png"/>
                <link rel="apple-touch-icon" sizes="76x76" href="/images/favicon/apple-icon-76x76.png"/>
                <link rel="apple-touch-icon" sizes="114x114" href="/images/favicon/apple-icon-114x114.png"/>
                <link rel="apple-touch-icon" sizes="120x120" href="/images/favicon/apple-icon-120x120.png"/>
                <link rel="apple-touch-icon" sizes="144x144" href="/images/favicon/apple-icon-144x144.png"/>
                <link rel="apple-touch-icon" sizes="152x152" href="/images/favicon/apple-icon-152x152.png"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-icon-180x180.png"/>
                <link rel="icon" type="image/png" sizes="192x192" href="/images/favicon/android-icon-192x192.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="96x96" href="/images/favicon/favicon-96x96.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png"/>
                <meta name="msapplication-TileColor" content="#ffffff"/>
                <meta name="msapplication-TileImage" content="/images/favicon/ms-icon-144x144.png"/>
                <meta name="theme-color" content="#41657e"/>

                <link rel="manifest" href="/manifest.json" />

                /*FontAwesome*/
                <link rel="stylesheet" href="/lib/font-awesome/css/all.min.css"/>
            </Head>
            <CookiesProvider>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <AppWrapper>
                            <Component {...pageProps} />
                        </AppWrapper>
                    </PersistGate>
                </Provider>
            </CookiesProvider>
            <script type="module" src="/lib/bootstrap/dist/js/bootstrap.bundle.min.js"/>
        </>
    )
}




