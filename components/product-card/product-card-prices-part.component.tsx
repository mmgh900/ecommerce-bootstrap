import ProductCardDiscount from "./product-card-discount.component";
import Price from "./product-card-price.component";
import * as React from "react";

export default function ProductCardPricesPart({
                                                  discount,
                                                  price,
                                                  className,
                                                  ...otherProps
                                              }: { discount: number, price: number, className?: string }) {
    return (
        <div
            className={["d-flex flex-column justify-content-end align-items-end", (className ? className : "")].join(" ")} {...otherProps}>
            {
                discount ?
                    <ProductCardDiscount discountPercentage={discount}/> :
                    <></>
            }
            <Price salePrice={price}/>
        </div>

    )
}