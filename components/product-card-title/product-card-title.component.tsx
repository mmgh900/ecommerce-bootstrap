import styles from "../product-card/product-card.module.scss";
import * as React from "react";

export default function ProductTitle({
                                         withCategories,
                                         className,
                                         car,
                                         company,
                                         namePersian
                                     }: { namePersian: string, car: string, company: string, withCategories: boolean, className?: string }) {
    return (
        withCategories ?
            <h6 className={[ styles.name, className].join(" ")}>
                {[namePersian, car, company].filter(item => item).join(" | ")}
            </h6>
            :
            <h6 className={[styles.name, className].join(" ")}>
                {namePersian}
            </h6>
    )
}