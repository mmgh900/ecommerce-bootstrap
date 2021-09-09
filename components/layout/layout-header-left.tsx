import Link from "next/link";
import React from "react";
import LayoutOffcanvas from "./layoutOffcanvas";
import MainMenu from "./main-menu";
import LayoutUserActions from "./layout-user-actions";
import {useAppSelector} from "../../redux/hooks";
import LayoutAccountUserAction from "./layout-account-user-action";
import DeviceState from "../../lib/device-state";
import {Button} from "react-bootstrap";
import LayoutSearchMenu from "./layout-search-menu";

export default function LayoutHeaderLeft() {
    const user = useAppSelector(state => state.user.currentUser)
    return (

        <div id="leftSideOfHeader" className="d-flex flex-row-reverse">
            <div className={"d-flex flex-row-reverse align-items-center"}>
                <LayoutOffcanvas name={"mainMenu"}  title={"منوی اصلی"} icon={"fa-bars"}
                                 mobileOnly={false}>
                    <MainMenu/>
                </LayoutOffcanvas>
                <LayoutOffcanvas name={"searchMenu"} title={"جستجو"} icon={"fa-search"}
                                 mobileOnly={true}>
                    <LayoutSearchMenu mobile={true}/>
                </LayoutOffcanvas>
                {
                    user ?
                        <LayoutAccountUserAction hideTitle={true} device={DeviceState.MOBILE_ONLY}/>
                        :
                        <></>
                }

            </div>
                {
                    user ?
                        <LayoutUserActions/>
                        :

                        <div className="d-flex justify-content-end align-items-center me-3">
                            <Link href="/login" passHref>
                                <Button className="btn-primary sign-in-button text-nowrap me-2 shadow">
                                    <span className="m-lg-2"><i className="fas me-2 fa-user"/>ورود</span>
                                </Button>
                            </Link>
                        </div>
                }

        </div>
    )
}
