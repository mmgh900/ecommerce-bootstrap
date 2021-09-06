import IProduct from "../../types/IProduct";

import * as React from "react";
import ProductCard from "./product-card";
import {ProductItemView} from "../../lib/products";
import {Button, Modal} from "react-bootstrap";
import {MouseEventHandler} from "react";

export default function ProductPreOrderModal({
                                                 product,
                                                 show,
                                                 handleClose
                                             }: { product: IProduct, show: boolean, handleClose: MouseEventHandler<HTMLButtonElement> }) {
    return (
        /*   <!-- Pre Order Modal -->*/
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>سفارش پیش خرید</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'secondary'} onClick={handleClose}>بستن</Button>
                <Button variant={'primary'}>ثبت درخواست</Button>
            </Modal.Footer>
        </Modal>

    )
}