import React, {MouseEventHandler} from "react";
import {useRouter} from "next/router";
import Price from "../product-card/product-card-price.component";
import {Button, Modal, Spinner} from "react-bootstrap";

export default function CartConfirmModal(
    {giftAmount, isConfirming, settleDays, handleClose, show}
        :
        {
            show: boolean
            handleClose: MouseEventHandler<HTMLElement>,
            giftAmount: number,
            isConfirming: boolean,
            settleDays: number
        }
) {

    const router = useRouter();
    return (
        <Modal onHide={handleClose} show={show} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title className="modal-title">تایید سفارش</Modal.Title>
            </Modal.Header>
            <div className="modal-body">


                {

                    isConfirming ?
                        <div className="w-100 d-flex justify-content-center p-5">
                            <Spinner animation={'border'} role={'status'} variant={'primary'}>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
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
            <Modal.Footer>
                <Button disabled={isConfirming} onClick={handleClose}>باشه
                </Button>
            </Modal.Footer>
        </Modal>
    )
}