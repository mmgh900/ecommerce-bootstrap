import {ProductSortOrder, ProductsParamsType} from "../../lib/products";
import * as React from "react";
import {useProductParamsContext} from "../../contex/product-params.context";
import useWindowDimensions, {BootstrapBreakpoints} from "../../hooks/useWindowDimensions";

export default function ProductsSortSelect() {
    const {productsPrams, setManualParams} = useProductParamsContext()
    const {width, height} = useWindowDimensions()
    const handleSortFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newParams: ProductsParamsType = {
            ...productsPrams,
            [event.target.name]: event.target.value
        }
        setManualParams(newParams)
    }

    return (
        <div
            className={`d-flex justify-content-center align-items-center ${width > BootstrapBreakpoints.md ? 'border-end' : ''}`}>
            {
                width > BootstrapBreakpoints.md ?
                    <label htmlFor={"SortOrder"} className="me-2 text-nowrap">
                        مرتب سازی:
                    </label>
                    :
                    <></>
            }

            <select id="SortOrder" defaultValue={ProductSortOrder.Newest}
                    onChange={handleSortFilterChange} name={"SortOrder"}
                    className="me-2 form-select form-select-sm listing__sort w-auto"
                    aria-label="Default select example">
                <option value={ProductSortOrder.Newest}>جدیدترین</option>
                <option value={ProductSortOrder.Alphabet}>حروف الفبا</option>
                <option value={ProductSortOrder.Cheapest}>ارزان ترین</option>
                <option value={ProductSortOrder.MostExpensive}>گران ترین</option>
            </select>
        </div>
    )
}