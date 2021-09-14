import {useAppDispatch} from "../../redux/hooks";
import DeviceState from "../../lib/device-state";
import React from "react";
import LayoutUserAction from "./layout-user-action";
import LayoutAccountUserAction from "./layout-account-user-action";
import {useGetCartQuery} from "../../redux/api.slice";
import useWindowDimensions, {BootstrapBreakpoints} from "../../hooks/useWindowDimensions";
import styles from './layout.module.scss'
import {FaEnvelope, FaFileInvoiceDollar, FaHandPaper, FaShoppingBag, FaShoppingCart} from "react-icons/fa";

export default function LayoutUserActions() {
    const dispatch = useAppDispatch()
    const {data: cart, error, isLoading} = useGetCartQuery()
    const {height, width} = useWindowDimensions();
    return (
        <div className={`${styles.userOptions} flex-nowrap`}>

            <LayoutUserAction id={"shop"} title={"خرید"} icon={<FaShoppingBag/>} link={"/products"}
                              device={DeviceState.MOBILE_ONLY}/>


            <LayoutUserAction id={"cart"} title={"سبد خرید"} icon={<FaShoppingCart/>} link={"/cart"}
                              count={cart ? cart.length : null}/>


            <LayoutUserAction id={"tracking"} title={"پیگیری"} icon={<FaHandPaper/>} link={"/tracking"}/>


            <LayoutUserAction id={"invoice"} title={"صورتحساب"} icon={<FaFileInvoiceDollar/>}
                              link={"/bill"}/>


            <LayoutUserAction id={"messenger"} title={"پیام‌رسان"} icon={<FaEnvelope/>} link={"/messenger"}/>


        </div>

    )
}