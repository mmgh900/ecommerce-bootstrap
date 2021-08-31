import IProduct from "../../types/IProduct";
import {useProductParamsContext} from "../../contex/product-params.context";
import ProductCard from "../product-card/product-card";
import * as React from "react";

function TableView({products}: { products: Array<IProduct> }) {
    const {productsPrams, setManualParams} = useProductParamsContext()
    return (
        <div className="table-responsive w-100">
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">نام کالا</th>
                    <th scope="col">موجودیت</th>
                    <th scope="col">کدفنی</th>
                    <th scope="col">برند</th>
                    <th scope="col">خودرو</th>
                    <th scope="col">بخش</th>
                    <th scope="col">قیمت</th>
                    <th colSpan={2} scope="col">خرید</th>
                </tr>
                </thead>
                <tbody>
                {
                    products.map(item =>
                        <ProductCard key={item.id} productData={item} view={productsPrams.ProductView}/>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}
export default TableView