import * as React from "react";
import styles from './product-card.module.scss'

export default function ProductCardTechnicalCode ({techNumber}:{techNumber: string}) {
    return (
        <code className={"text-muted text-nowrap " + styles.smallText}>
            {techNumber}
        </code>
    )
}