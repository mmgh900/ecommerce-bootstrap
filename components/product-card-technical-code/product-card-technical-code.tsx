import * as React from "react";

export default function ProductCardTechnicalCode ({techNumber}:{techNumber: string}) {
    return (
        <code className={"text-muted text-nowrap"}>
            {techNumber}
        </code>
    )
}