import {useAppDispatch} from "../../redux/hooks";
import DeviceState from "../../lib/device-state";
import {setCurrentUser} from "../../redux/user.reducer";
import getApiUrl from "../../lib/backend-root";
import React from "react";
import LayoutUserAction from "../layout-user-action/layout-user-action";
import LayoutAccountUserAction from "../layout-account-user-action/layout-account-user-action";
import {useGetCartQuery} from "../../redux/api.slice";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function LayoutUserActions () {
    const dispatch = useAppDispatch()
    const {data: cart, error, isLoading} = useGetCartQuery()
    const {height, width} = useWindowDimensions();
    return (
        <div id="userOptions" className="user-options row g-0 flex-nowrap">


            <LayoutAccountUserAction device={DeviceState.DESKTOP_ONLY}/>
            {
                width > 450 ?
                    <LayoutUserAction id={"shop"} title={"خرید"} icon={"fa-shopping-bag"} link={"/products"}
                                      device={DeviceState.MOBILE_ONLY}/>
                    :
                    <></>
            }
            <LayoutUserAction id={"cart"} title={"سبد خرید"} icon={"fa-shopping-cart"} link={"/cart"} count={cart? cart.length : null}/>
            <LayoutUserAction id={"tracking"} title={"پیگیری"} icon={"fa-hand-paper"} link={"/tracking"}/>
            <LayoutUserAction id={"invoice"} title={"صورتحساب"} icon={"fa-file-invoice-dollar"}
                        link={"/bill"}/>
            <LayoutUserAction id={"messenger"} title={"پیام‌رسان"} icon={"fa-envelope"} link={"/messenger"}/>

        </div>

    )
}