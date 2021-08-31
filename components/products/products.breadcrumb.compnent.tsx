import {defaultProductParams} from "../../lib/products";
import Link from "next/link";
import * as React from "react";
import {useProductParamsContext} from "../../contex/product-params.context";

export default function ProductsBreadcrumb() {
    const {productsPrams, setManualParams} = useProductParamsContext()
    return (
        <nav aria-label="breadcrumb">
            {
                productsPrams == defaultProductParams ?
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><Link href="/" >خانه</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">همه
                            محصولات
                        </li>
                    </ol>
                    :
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><Link href="/">خانه</Link></li>
                        <li className="breadcrumb-item"><Link href="/products">همه
                            محصولات</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">نتایج
                            جستجو
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            صفحه
                            {" "}
                            {productsPrams.Page}
                        </li>
                    </ol>
            }
        </nav>
    )
}