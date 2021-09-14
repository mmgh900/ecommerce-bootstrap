import React from "react";
import styles from "./action-link.module.scss"
import Link from "next/link"
import {FaArrowLeft} from "react-icons/fa";
const ActionLink = (props: {
    link: string,
    text: string
}) => {
    const {link, text} = props;
    return (
        <Link href={link} passHref>
            <a
                className= {styles.anchor + " fs-5 fw-bold section__mini"}
            >
                {text}
                <FaArrowLeft className={styles.actionArrow}/>
            </a>
        </Link>

    )
}

export default ActionLink;