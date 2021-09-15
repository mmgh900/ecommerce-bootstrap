import CartGiftCard from "./cart-gift-card";
import React, {ChangeEventHandler, MouseEventHandler, useState} from "react";
import Price from "../product-card/product-card-price.component";
import {useConfirmCartMutation, useGetCartQuery, useLazyGetCartQuery} from "../../redux/api.slice";
import {useRouter} from "next/router";
import useCartPrices from "../../hooks/useCartPrices";
import CartConfirmModal from "./cart-confirm-modal";
import CartSettleDaysCard from "./cart-settle-days-card";
import {Button, Spinner} from "react-bootstrap";
import {useAppSelector} from "../../redux/hooks";

export default function CartInfo({
                                     giftCode,
                                     onGiftCodeChange,
                                     settleDays,
                                     onSettleDaysChange,
                                     giftAmount,
                                     handleShow
                                 }: { handleShow: MouseEventHandler<HTMLElement>, giftCode: string, giftAmount: number, settleDays: number, onGiftCodeChange: (code: string) => void, onSettleDaysChange: ChangeEventHandler<HTMLFormElement> }) {

    const {data, error, isLoading} = useGetCartQuery()


    const {totalPrice, totalAmountOfDiscount, finalPrice} = useCartPrices()
    const PriceListItem = ({keyStr, color, price}: { keyStr: string, price: number, color?: string }) => {
        return (
            <li className="d-flex justify-content-between align-items-center mb-3">
                <small className={color ? " fw-bold" : "text-muted fw-bold"}
                       style={color ? {color: color} : {}}>{keyStr} :</small>
                <Price color={color} salePrice={price}/>
            </li>
        )
    }


    return (
        <React.Fragment>
            <div className="cart-total card mb-2">
                <div className="card-body">
                    <ul className="list-unstyled">
                        <PriceListItem price={totalPrice}
                                       keyStr={`قیمت کالا‌ها (${data.length})`}/>
                        <PriceListItem price={totalAmountOfDiscount} color={"#dc3545"}
                                       keyStr={"تخفیف اعمال شده"}/>
                        <hr/>
                        <PriceListItem price={finalPrice} color={"black"}
                                       keyStr={"مبلغ نهایی"}/>


                    </ul>
                </div>
            </div>
            <CartSettleDaysCard settleDays={settleDays} onSettleDaysChange={onSettleDaysChange}/>
            <CartGiftCard onGiftCodeChange={onGiftCodeChange}
                          giftCode={giftCode}/>

            <Button type={"submit"}
                    variant={'primary'}
                    size={'lg'}
                    className="w-100 my-2"
                    onClick={handleShow}
            >
                ثبت سفارش
            </Button>
            <small className="text-muted">
                سفارش شما پس از ثبت توسط همکاران ما برسی می‌شوند و در صورت امکان تایید خواهد
                شد. در غیر
                این صورت ممکن است مواردی از سفارش شما حذف شود یا تعدادشان تغییر کند که در
                این صورت در
                قسمت پیگیری سفارش به اطلاع شما خواهد رسید.
            </small>
        </React.Fragment>


    )
}