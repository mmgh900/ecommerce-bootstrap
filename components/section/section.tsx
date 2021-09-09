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

        <div className={'w-100'} style={isHero ? {backgroundColor: "#f3fcf4"} : (color ? {backgroundColor: color} : null)} {...otherProps}>
            <Container fluid={'lg'}>
                <section className={"section " + styles.section}>
                    {children}
                </section>
            </Container>

        </div>


    )
}

export default Section;