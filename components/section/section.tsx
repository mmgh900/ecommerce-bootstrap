import React, {ReactNode} from "react";
import styles from "./section.module.scss"
import {Container} from "react-bootstrap";
import {useHeroScroll} from "../../contex/hero-scroll-context";

const Section = (
    {
        isHero, children, color, ...otherProps
    }
        :
        {
            isHero: boolean;
            children: ReactNode
            color?: string,
            [key: string]: any
        }
) => {
    const {isHeroScrolled, setHeroScrolled} = useHeroScroll()
    return (

        <div onScroll={() => {
            /*setHeroScrolled(true)*/
            console.log('scrolled')
        }} style={isHero ? {backgroundColor: "#f3fcf4"} : (color ? {backgroundColor: color} : null)} {...otherProps}>
            <div className='container-lg'>
                <section className={"section " + styles.section}>
                    {children}
                </section>
            </div>

        </div>


    )
}

export default Section;