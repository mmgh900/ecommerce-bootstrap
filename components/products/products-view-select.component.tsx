
import * as React from "react";
import {useProductParamsContext} from "../../contex/product-params.context";
import {ProductItemView} from "../../lib/products";
import useWindowDimensions, {BootstrapBreakpoints} from "../../hooks/useWindowDimensions";

export default function ProductViewSelect () {
    const {productsPrams, setManualParams} = useProductParamsContext()
    const {width, height} = useWindowDimensions()
    const handleViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setManualParams({
            ...productsPrams,
            ProductView: event.target.value as unknown as ProductItemView
        })
    }
    return (

        <div
            className={`d-flex justify-content-center align-items-center px-2 ${width > BootstrapBreakpoints.md ? 'border-end' : ''}`}>{
            width > BootstrapBreakpoints.md ?
                <label htmlFor={"SortOrder"} className="me-2 text-nowrap">
                    نمایش:
                </label>
                :
                <></>
        }

            <select id="SortOrder" value={productsPrams.ProductView}
                    onChange={handleViewChange} name={"ViewForm"}
                    className="form-select form-select-sm listing__sort w-auto">
                <option value={ProductItemView.CARD}>با عکس</option>
                <option value={ProductItemView.CARD_NO_IMAGE}>بدون عکس</option>
            </select>

        </div>
    )
}