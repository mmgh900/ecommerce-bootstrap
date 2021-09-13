import React, {ReactNode} from "react";
import styles from "./section.module.scss"
import {Container} from "react-bootstrap";

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
    return (

        <div style={isHero ? {backgroundColor: "#f3fcf4"} : (color ? {backgroundColor: color} : null)} {...otherProps}>
            <div className='container-lg'>
                <section className={"section " + styles.section}>
                    {children}
                </section>
            </div>

        </div>


    )
}

export default Section;