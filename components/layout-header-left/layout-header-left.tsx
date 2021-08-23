import Link from "next/link";
import React from "react";
import Offcanvas from "../layout/offcanvas";
import MainMenu from "../main-menu/main-menu";
import MobileSearchMenu from "../search-menu/mobile-search-menu";
import LayoutUserActions from "../layout-user-actions/layout-user-actions";
import {useAppSelector} from "../../redux/hooks";
import LayoutAccountUserAction from "../layout-account-user-action/layout-account-user-action";
import DeviceState from "../../lib/device-state";

export default function LayoutHeaderLeft({parentId}: { parentId: string }) {
    const user = useAppSelector(state => state.user.currentUser)
    return (

        <div id="leftSideOfHeader" className="d-flex flex-row-reverse w-50">
            <div className={"d-flex flex-row-reverse"}>
                <Offcanvas name={"mainMenu"} parentId={parentId} title={"منوی اصلی"} icon={"fa-bars"}
                           mobileOnly={false}>
                    <MainMenu/>
                </Offcanvas>
                <Offcanvas name={"searchMenu"} parentId={parentId} title={"جستجو"} icon={"fa-search"}
                           mobileOnly={true}>
                    <MobileSearchMenu/>
                </Offcanvas>
                {
                    user ?
                        <LayoutAccountUserAction hideTitle={true} device={DeviceState.MOBILE_ONLY}/>
                        :
                        <></>
                }

            </div>
            <div className="w-75">
                {
                    user ?
                        <LayoutUserActions/>
                        :
                        <div className="d-flex justify-content-end align-items-center h-100 me-3">
                            <Link href="/login">
                                <a className="sign-in-button btn btn-primary text-nowrap me-2 shadow">
                                    <span className="m-lg-2"><i className="fas me-2 fa-user"/>ورود</span>
                                </a>
                            </Link>
                        </div>
                }
            </div>

        </div>
    )
}
