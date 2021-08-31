import IProduct from "../../types/IProduct";

import * as React from "react";
import ProductCard from "./product-card";
import {ProductItemView} from "../../lib/products";

export default function ProductPreOrderModal({product}: { product: IProduct }) {
    return (
        /*   <!-- Pre Order Modal -->*/
        <div className="modal fade" id="preorderModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">سفارش پیش خرید</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <div className="modal-body">
                        <p>
                            محصول انتخاب شده شما در حال حاضر موجود نمی باشد. در صورت تمایل می توانید با تکمیل فرم
                            زیر، سفارش خود را برای پیش خرید ثبت کنید تا کالای مورد نظر را برای شما تهیه کنیم. در
                            صورتی که کالا موجود شد، به شما اطلاع داده خواهد شد.
                        </p>
                        {
                            product ?
                                <div className="row">
                                    <div className="col-6">
                                        <ProductCard productData={product}
                                                     view={ProductItemView.PRE_ORDER_VIEW}/>
                                    </div>

                                </div>
                                :
                                <></>
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn" data-bs-dismiss="modal">بستن</button>
                        <button type="button" className="btn btn-primary">ثبت درخواست</button>
                    </div>
                </div>
            </div>
        </div>

    )
}