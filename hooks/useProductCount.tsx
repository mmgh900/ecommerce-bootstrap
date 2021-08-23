import {useEffect, useState} from "react";
import {useAddToCartMutation, useGetCartQuery} from "../redux/api.slice";

export default function useProductCount(productId: string, initialCount: number ) {


    const [productCount, setProductCountRaw] = useState<number>(initialCount)
    const [timeOut, setTimeOut] = useState<any>()

    const [
        addToCart, // This is the mutation trigger
        {isLoading},
    ] = useAddToCartMutation()


    /**
     * To set product count without delay
     * @param count product count to be set
     */
    function setProductCount (count: number) {
        if (count < 0 || count > 10000) {
            return
        }
        addToCart({
            Count: count,
            ProductId: productId
        })
        setProductCountRaw(count)
    }

    /**
     * To set product count with delay
     * @param count product count to be set
     */
    function setDelayedProductCount (count: number) {
        if (count < 0 || count > 10000) {
            return
        }
        timeOut ? clearTimeout(timeOut) : ""
        const timeOutId = setTimeout(() => {
            addToCart({
                Count: count,
                ProductId: productId
            })
        }, 2000)
        setTimeOut(timeOutId)
        setProductCountRaw(count)
    }

    return {productCount, setProductCount, setDelayedProductCount, isLoading}

}
