import styles from "./product-card-price.module.scss";
import * as React from "react";

export default function Price({salePrice, isBig, color, ...otherProps}: { salePrice: number, isBig?: boolean, color?: string, [key: string]: any }) {
    const price = salePrice.toString()
    const useless = price.substring(price.length - 4, price.length);
    const important = price.substring(0, price.length - 4);
    return (
        <span {...otherProps}>
            <span style={color ? {color: color} : {}} className={(isBig ? styles.importantBig : styles.important)}>{important}</span>
            <span className={(isBig ? styles.uselessBig : styles.useless)}>{useless}</span>
            <span className={(isBig ? styles.rialBig : styles.rial)}>ریال</span>
        </span>
    )
}