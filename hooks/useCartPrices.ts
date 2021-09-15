import useWindowDimensions from "./useWindowDimensions";
import {useEffect, useState} from "react";
import {useGetCartQuery} from "../redux/api.slice";
import {useAppSelector} from "../redux/hooks";

export default function useCartPrices() {
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [totalAmountOfDiscount, setTotalAmountOfDiscount] = useState<number>(0)
    const {data: cart, error: cartError, isLoading: cartLoading} = useGetCartQuery()

    useEffect(() => {
        if (cart) {
            cart.forEach((item) => {
                setTotalPrice(item.cost * item.count + totalPrice)
                console.log(item.discount)
                setTotalAmountOfDiscount(item.discount * item.cost  * item.count / 100 + totalAmountOfDiscount)
            })
        }

    }, [cart])

    return {totalPrice, totalAmountOfDiscount, finalPrice: totalPrice - totalAmountOfDiscount};
}
