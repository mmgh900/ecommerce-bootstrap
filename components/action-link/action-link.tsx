import React from "react";
import styles from "./action-link.module.scss"
import Link from "next/link"
const ActionLink = (props: {
    link: string,
    text: string
}) => {
    const {link, text} = props;
    return (
        <Link href={link}>
            <a
                className= {styles.anchor + " fs-5 fw-bold section__mini"}
            >
                {text}
                <i className={styles.actionArrow + " far fa-arrow-left"}/>
            </a>
        </Link>

    )
}

export default ActionLink;