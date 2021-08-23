
import * as React from "react";
import {useProductParamsContext} from "../../../contex/product-params.context";
import {ProductItemView} from "../../../lib/products";

export default function ProductViewSelect () {
    const {productsPrams, setManualParams} = useProductParamsContext()
    const handleViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value as unknown as ProductItemView)
        setManualParams({
            ...productsPrams,
            ProductView: event.target.value as unknown as ProductItemView
        })
    }
    return (

        <div
            className={"d-flex mx-2 justify-content-center align-items-center  border-end"}>
            <label htmlFor={"SortOrder"} className="me-2 text-nowrap">
                نمایش:
            </label>


            <select id="SortOrder" value={productsPrams.ProductView}
                    onChange={handleViewChange} name={"ViewForm"}
                    className="me-2 form-select form-select-sm listing__sort w-auto">
                <option value={ProductItemView.CARD}>با عکس</option>
                <option value={ProductItemView.CARD_NO_IMAGE}>بدون عکس</option>
            </select>

        </div>
    )
}