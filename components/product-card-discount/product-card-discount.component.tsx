import * as React from "react";

export default function ProductCardDiscount ({discountPercentage}: { discountPercentage: number })  {
    return (
        <div>
            <span className={["mx-2 badge bg-secondary text-white"].join(" ")}>{` تخفیف${discountPercentage}%`}</span>
        </div>
    )
}

