import Head from 'next/head'
import styles from './layout.module.scss'
import React, {ReactNode, useEffect, useState} from "react";
import Footer from "./footer";
import {useAppDispatch} from "../../redux/hooks";
import {FocusProvider} from '../../contex/focus-provider.context';
import LayoutHeaderRight from "./layout-header-right";
import LayoutHeaderLeft from "./layout-header-left";

export default function Layout({
                                   children,
                                   title
                               }: {
    children: ReactNode
    title: string
}) {
    const [isFocused, setFocused] = useState<boolean>(false)

    const canvassesFather = "mainHeader"

    return (
        <div className={styles.container}>
            <Head>
                <title>{"پیکان پارس | " + title}</title>
            </Head>
            <header id={canvassesFather} className={`${styles.header} shadow-sm`}
                    onClick={() => setFocused(false)}>
                <div className={`${styles.headerInner} container-xxl d-flex justify-content-between h-100`}>
                    <FocusProvider.Provider value={{isFocused, setFocused}}>
                        <LayoutHeaderRight/>
                    </FocusProvider.Provider>
                    <LayoutHeaderLeft parentId={canvassesFather}/>
                </div>

            </header>
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



