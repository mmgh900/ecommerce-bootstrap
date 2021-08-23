import React from "react";
import styles from "./section.module.scss"
import Section from "./section";

type SectionBProps = {}
const SectionB = (
    {
        title,
        children,
        color = "white",
        isColorDark
    }
        : {
        children: any,
        title: string,
        color?: string,
        isColorDark?: boolean
    }) => {
    return (
        <Section color={color} isHero={false}>
            <h2 className={["w-100 text-center fw-bold ", (isColorDark? "text-white" : ""),  styles.head].join(" ")}>{title}</h2>
            <div className="section__row row row-cols-1 row-cols-md-3">
                {children}
            </div>
        </Section>
    )
}


export default SectionB;