import styles from "../product-card/product-card.module.scss";
import Link from "next/link";

import ProductCardCategoryTag from "../product-card-category-tag/product-card-category-tag.component";
import * as React from "react";
import ICartItem from "../../types/ICartItem";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import ProductCardCountControlPart from "../product-card-count-control-part/product-card-count-control-part.component";
import {useEffect, useState} from "react";
import ProductTitle from "../producr-card-title/producr-card-title.component";
import ProductCardPricesPart from "../product-card-prices-part/product-card-prices-part.component";
import ProductCardTechnicalCode from "../product-card-technical-code/product-card-technical-code";
import useProductCount from "../../hooks/useProductCount";



export default function CartItem(
    {
        cartItem
    }:
        {
            cartItem: ICartItem
        }
) {
    const {
        productId,
        namePersian,
        car,
        company,
        techNumber,
        count,
        cost,
        discount
    }
        = cartItem
    const {height, width} = useWindowDimensions();
    const [isLoading, setLoading] = useState(false)

    const {productCount, setProductCount, setDelayedProductCount, isLoading: countLoading} = useProductCount(productId, count)

    return (

        <div className={["card p-2 p-md-3 mb-2", styles.productCard].join(" ")}>
            <div className="row g-0 g-md-3">
                <div className="col-3 col-md-2 d-flex justify-content-center align-items-center">
                    <Link href={`./p/${productId}`} passHref>
                        <a>
                            <img
                                className={"w-100"}
                                src="/images/products/sample.jpg"// Route of the image file
                                alt={namePersian}
                            />
                        </a>
                    </Link>

                </div>
                <div className="col-9 col-md-10">
                    <div className="card-body h-100">
                        <div className="row">
                            <div className="col-6">
                                <Link href={`./p/${productId}`} passHref>
                                    <a>
                                        <ProductTitle className={width > 1000 ? "h5" : ""} withCategories={false} car={car}
                                                      company={company} namePersian={namePersian}/>
                                    </a>
                                </Link>

                                <ul className="list-unstyled">
                                    {
                                        techNumber != "" ?
                                            <ProductCardTechnicalCode techNumber={techNumber}/>
                                            :
                                            <></>
                                    }

                                    <ProductCardCategoryTag icon={"flag"} valueStr={company}/>
                                    <ProductCardCategoryTag icon={"car"} valueStr={car}/>
                                </ul>
                            </div>


                            <div className="col-6 d-flex flex-column justify-content-between">

                                <ProductCardCountControlPart isLoading={countLoading} deleteButton count={productCount}
                                                             setDelayedProductCount={setDelayedProductCount}
                                                             setProductCount={setProductCount} productId={productId}/>

                                <ProductCardPricesPart discount={discount} price={cost}/>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>


    )
}