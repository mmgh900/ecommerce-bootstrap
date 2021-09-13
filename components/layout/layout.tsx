import Head from 'next/head'
import styles from './layout.module.scss'
import React, {ReactNode, useEffect, useState} from "react";
import Footer from "./footer";
import {useAppDispatch} from "../../redux/hooks";
import {FocusProvider} from '../../contex/focus-provider.context';
import LayoutHeaderRight from "./layout-header-right";
import LayoutHeaderLeft from "./layout-header-left";
import {Navbar} from "react-bootstrap";
import {useRouter} from "next/router";

export default function Layout({
                                   children,
                                   title
                               }: {
    children: ReactNode
    title: string
}) {
    const [isFocused, setFocused] = useState<boolean>(false)
    const router = useRouter()

    return (
        <div className={styles.container}>
            <Navbar className={`${styles.header}`}
                    onClick={() => setFocused(false)}>
                <div className={`${styles.headerInner} d-flex justify-content-between h-100 container-lg`}>
                    <FocusProvider.Provider value={{isFocused, setFocused}}>
                        <LayoutHeaderRight/>
                    </FocusProvider.Provider>
                    <LayoutHeaderLeft/>
                </div>
            </Navbar>
            <main className={styles.mainContent}>{children}</main>
            <Footer/>
            {
                isFocused ?
                    (<div onClick={() => setFocused(false)}
                          className={[styles.focusProvider, (isFocused ? styles.show : "")].join(" ")}/>)
                    :
                    ""
            }


        </div>
    )
}



