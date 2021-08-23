import Head from 'next/head'
import styles from './layout.module.scss'
import Link from 'next/link'
import React, {ReactNode, useEffect, useState} from "react";
import Footer from "../footer/footer";
import Offcanvas from "./offcanvas";
import DeviceState from "../../lib/device-state";
import Image from "next/image";
import MainMenu from "../main-menu/main-menu";
import MobileSearchMenu from "../search-menu/mobile-search-menu";
import DesktopSearchMenu from "../search-menu/desktop-search-menu";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {setCurrentUser} from "../../redux/user.reducer";

import getApiUrl from "../../lib/backend-root";
import {CatType} from "../../types/ICategory";
import {fetchCategoriesByType} from "../../redux/categories.reducer";
import {useRouter} from "next/router";
import {rotate} from "next/dist/next-server/server/lib/squoosh/impl";
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
    const dispatch = useAppDispatch()
    useEffect(() => {
        (async () => {
            // @ts-ignore
            await dispatch(fetchCategoriesByType(CatType.CAR))
            // @ts-ignore
            await dispatch(fetchCategoriesByType(CatType.BRANDS))
            // @ts-ignore
            await dispatch(fetchCategoriesByType(CatType.PART))
        })()
    }, [])
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



