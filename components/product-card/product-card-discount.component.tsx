import * as React from "react";
import styles from './product-card.module.scss'
export default function ProductCardDiscount ({discountPercentage}: { discountPercentage: number })  {
    return (
        <div>
            <span className={["text-secondary fw-bold", styles.smallText].join(" ")}>{` تخفیف${discountPercentage}%`}</span>
        </div>
    )
}

