import React, {ReactNode} from "react";
import styles from "./section.module.scss"

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

        <div className={'container-fluid'}
             style={isHero ? {backgroundColor: "#f3fcf4"} : (color ? {backgroundColor: color} : null)} {...otherProps}>
            <section data-aos="fade-up" className={"section px-lg-4 " + styles.section}>
                {children}
            </section>
        </div>


    )
}

export default Section;