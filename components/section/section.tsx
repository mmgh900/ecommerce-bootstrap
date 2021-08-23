import React, {ReactNode} from "react";
import styles from "./section.module.scss"

const Section = (
    {
        isHero, children, color
    }
        :
        {
            isHero: boolean;
            children: ReactNode
            color?: string
        }
) => {
    return (
        <div  className={"section__wrapper container-fluid p-0 "}
             style={isHero ? {backgroundColor: "#f3fcf4"} : (color ? {backgroundColor: color} : null)}>
            <section data-aos="fade-up" className={"section px-4 " + styles.section}>
                {children}
            </section>
        </div>
    )
}

export default Section;