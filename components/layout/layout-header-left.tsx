import Link from "next/link";
import React from "react";
import Offcanvas from "./offcanvas";
import MainMenu from "./main-menu";
import MobileSearchMenu from "./mobile-search-menu";
import LayoutUserActions from "./layout-user-actions";
import {useAppSelector} from "../../redux/hooks";
import LayoutAccountUserAction from "./layout-account-user-action";
import DeviceState from "../../lib/device-state";
import {Button} from "react-bootstrap";

export default function LayoutHeaderLeft({parentId}: { parentId: string }) {
    const user = useAppSelector(state => state.user.currentUser)
    return (

        <div id="leftSideOfHeader" className="d-flex flex-row-reverse">
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
                {
                    user ?
                        <LayoutUserActions/>
                        :

                        <div className="d-flex justify-content-end align-items-center h-100 me-3">
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
