import styles from './layout.module.scss'
import React, {ReactNode, useEffect, useState} from "react";
import Footer from "./footer";
import {FocusProvider} from '../../context/focus-provider.context';
import LayoutHeaderRight from "./layout-header-right";
import LayoutHeaderLeft from "./layout-header-left";
import {Navbar} from "react-bootstrap";
import {useRouter} from "next/router";
import { HeroScrollContext } from '../../context/hero-scroll-context';

export default function Layout({
                                   children,
                                   title
                               }: {
    children: ReactNode
    title: string
}) {
    const [isFocused, setFocused] = useState<boolean>(false)
    const [isHeroScrolled, setHeroScrolled] = useState(false)

    const router = useRouter()

    return (
        <HeroScrollContext.Provider value={{isHeroScrolled, setHeroScrolled}}>
            <div className={styles.container}>
                <Navbar className={`${styles.header} ${router.pathname == '/' && !isHeroScrolled ? '' : styles.headerWhite}`}
                        onClick={() => setFocused(false)}>
                    <div className={`d-flex justify-content-between h-100 custom-container`}>
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
        </HeroScrollContext.Provider>

    )
}



