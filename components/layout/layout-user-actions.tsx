import DeviceState from "../../lib/device-state";
import React from "react";
import LayoutUserAction from "./layout-user-action";
import {useGetCartQuery} from "../../redux/api.slice";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import styles from './layout.module.scss'
import {FaEnvelope, FaFileInvoiceDollar, FaHandPaper, FaShoppingBag, FaShoppingCart} from "react-icons/fa";


export default function LayoutUserActions() {
    const {data: cart, error, isLoading} = useGetCartQuery()
    return (
        <div className={`${styles.userOptions} flex-nowrap`}>

            <LayoutUserAction id={"shop"} title={"خرید"} icon={<FaShoppingBag/>} link={"/products"}
                              device={DeviceState.MOBILE_ONLY}/>


            <LayoutUserAction id={"cart"} title={"سبد خرید"} icon={<FaShoppingCart/>} link={"/cart"}
                              count={cart ? cart.length : null}/>


            <LayoutUserAction id={"tracking"} title={"دست"} icon={<FaHandPaper/>} link={"/tracking"}/>


            <LayoutUserAction id={"invoice"} title={"صورتحساب"} icon={<FaFileInvoiceDollar/>}
                              link={"/bill"}/>


            <LayoutUserAction id={"messenger"} title={"پیام‌رسان"} icon={<FaEnvelope/>} link={"/messenger"}/>


        </div>

    )
}