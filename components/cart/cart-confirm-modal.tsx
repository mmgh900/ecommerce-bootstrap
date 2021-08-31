import * as animationData from "../../data/330-empty-status.json";
import React from "react";
import {useRouter} from "next/router";
import Price from "../product-card/product-card-price.component";

export default function CartConfirmModal(
    {giftAmount, isConfirming, settleDays}
        :
        {
            giftAmount: number,
            isConfirming: boolean,
            settleDays: number
        }
) {

    const router = useRouter();
    return (
        <div className="modal fade" id="cartConfirmModal" aria-labelledby="تایید سفارش" aria-hidden="true"
             data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">تایید سفارش</h5>
                    </div>
                    <div className="modal-body">


                        {

                            isConfirming ?
                                <div className="w-100 d-flex justify-content-center p-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>

                                :
                                <React.Fragment>
                                    <div className="w-100 d-flex justify-content-center pb-5">
                                        <i className="text-primary fas fa-4x fa-check-circle me-3"/>
                                    </div>

                                    <p>سفارش شما با موفقیت ثبت شد. لطفا در بخش پیگیری سفارش خود را پیگیری کنید.</p>

                                    {
                                        giftAmount ?
                                            <p>
                                                 همچنین مبلغ
                                                <Price className="d-inline-block mx-2" salePrice={giftAmount * 10000}/>
                                                بابت کارت هدیه به حساب شما واریز خواهد شد.
                                            </p>
                                            :
                                            <></>
                                    }
                                </React.Fragment>

                        }


                    </div>
                    <div className="modal-footer">
                        <button disabled={isConfirming} data-bs-dismiss="modal" type="button"
                                className="btn btn-primary" onClick={() => router.push("/")}>باشه
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}