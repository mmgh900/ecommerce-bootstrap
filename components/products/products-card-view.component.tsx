import ProductCard from "../product-card/product-card";
import * as React from "react";
import IProduct from "../../types/IProduct";
import {useProductParamsContext} from "../../contex/product-params.context";

export default function ProductsCardView ({numberOfColumns, products}:{numberOfColumns: number, products: Array<IProduct>}) {
    const {productsPrams, setManualParams} = useProductParamsContext()
    return (
        <div className={`row row-cols-${numberOfColumns} g-2`}>
            {
                products.map(item =>
                    <div className="col"
                         key={`col${item.id}`}>
                        <ProductCard key={item.id}
                                     view={productsPrams.ProductView}
                                     productData={item}/>
                    </div>
                )
            }
        </div>
    )
}