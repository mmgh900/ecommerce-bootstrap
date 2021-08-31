import React, {useEffect, useRef, useState} from 'react';

import getApiUrl from "../lib/backend-root";
import Layout from "../components/layout/layout";
import Link from "next/link";

import sampleProductList from '../data/sample-product-list'
import ProductCard from "../components/product-card/product-card";
import {ProductItemView} from "../lib/products";
import Price from "../components/product-card/product-card-price.component";
import {useConfirmCartMutation, useGetCartQuery, useLazyGetCartQuery} from "../redux/api.slice";
import ICartItem from "../types/ICartItem";
import CartItem from "../components/cart/cart-item.component";
import {useAppSelector} from "../redux/hooks";
import {useRouter} from "next/router";
import useCartPrices from "../hooks/useCartPrices";
import CartGiftCard from "../components/cart/cart-gift-card";
import {event} from "next/dist/build/output/log";
import CartConfirmModal from "../components/cart/cart-confirm-modal";
import NoSearchResult from "../errors/no-search-result";
import CartInfo from "../components/cart/cart-info";

const staticPath = '/images/products/'
const sampleImage = '/images/products/sample.jpg'
const API = {
    getCart: getApiUrl('/api/Cart/GetCart'),
    removeCartItem: getApiUrl('/api/Cart/RemoveFromCart'),
    editCartItemCount: getApiUrl('/api/Cart/EditCount'),
    confirmCart: getApiUrl('/api/Cart/ConfirmCart'),

}
export default function Cart() {

    const user = useAppSelector(state => state.user.currentUser)
    const {data, error, isLoading} = useGetCartQuery()

    const router = useRouter()
    useEffect(() => {
        if (!user) {
            router.push('/')
        }
    })
    const [
        confirmCart, // This is the mutation trigger
        {isLoading: isConfirming}, // This is the destructured mutation result
    ] = useConfirmCartMutation()

    const [giftCode, setGiftCode] = useState<string>()
    const [settleDays, setSettleDays] = useState<number>(10)
    const [giftAmount, setGiftAmount] = useState<number>()

    const handleConfirmButtonClick = event => {
        event.preventDefault()

        confirmCart({
            GiftCode: giftCode,
            SettleDays: settleDays
        }).then(response => {
            if (response as { data: number })
                setGiftAmount((response as { data: number }).data)
        })
    }

    return (
        <Layout title={"سبدخرید"}>


            <div className="container-lg container-fluid">
                <nav aria-label="breadcrumb ">
                    <ol className="breadcrumb m-0 py-3">
                        <li className="breadcrumb-item"><Link href="/">خانه</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">
                            سبد خرید
                        </li>
                    </ol>
                </nav>
                {
                    isLoading ?
                        <div className="spinner-border text-primary m-auto" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        data && data?.length ?
                            <div className="row g-3">
                                <div className="col-md-9 ">
                                    <div className="">
                                        {
                                            data.map(item =>
                                                <CartItem key={item.productId} cartItem={item}/>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    {/*total price box*/}
                                    <form onSubmit={handleConfirmButtonClick}>
                                        <CartInfo giftAmount={giftAmount} settleDays={settleDays} giftCode={giftCode}
                                                  onSettleDaysChange={(event) => {
                                                      setSettleDays(event.target.value)
                                                  }}
                                                  onGiftCodeChange={(code: string) => {
                                                      setGiftCode(code)
                                                  }}/>
                                    </form>
                                </div>
                            </div>
                            :
                            <NoSearchResult mainMassage={"سبد خرید شما خالی است"}
                                            description={"لطفا ابتدا کالاها را به سبد خرید خود اضافه کنید."}
                                            button={{label: "خرید", link: "/products"}}/>
                }

            </div>
            <CartConfirmModal isConfirming={isConfirming} giftAmount={giftAmount} settleDays={settleDays}/>
        </Layout>
    )
}

