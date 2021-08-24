import Head from 'next/head'
import styles from './layout.module.scss'
import React, {ReactNode, useEffect, useState} from "react";
import Footer from "../footer/footer";
import {useAppDispatch} from "../../redux/hooks";
import {FocusProvider} from '../../contex/focus-provider.context';
import LayoutHeaderRight from "../layout-header-right/layout-header-right";
import LayoutHeaderLeft from "../layout-header-left/layout-header-left";

export const siteTitle = 'Next.js Sample Website'

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
            <header className={styles.header} onClick={() => setFocused(false)}>
                <div id={canvassesFather}
                     className="container-custom position-fixed top-0 w-100 shadow-sm d-flex flex-row justify-content-between">
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



