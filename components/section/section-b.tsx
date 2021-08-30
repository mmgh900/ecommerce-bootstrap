import React from "react";
import styles from "./section.module.scss"
import Section from "./section";

type SectionBProps = {}
const SectionB = (
    {
        title,
        children,
        color = "white",
        isColorDark,
        ...otherProps
    }
        : {
        children: any,
        title: string,
        color?: string,
        isColorDark?: boolean,
        [key: string]: any
    }) => {
    return (
        <Section color={color} isHero={false} {...otherProps}>
            <h2 className={["w-100 text-center fw-bold ", (isColorDark? "text-white" : ""),  styles.head].join(" ")}>{title}</h2>
                {children}
        </Section>
    )
}


export default SectionB;