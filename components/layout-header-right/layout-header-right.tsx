import Link from "next/link";
import Image from "next/image";
import {FocusProvider} from "../../contex/focus-provider.context";
import DesktopSearchMenu from "../search-menu/desktop-search-menu";
import React from "react";

export default function LayoutHeaderRight() {
    return (
        <div id="rightSideOfHeader" className="d-flex w-50">
            <Link href="/" passHref>
                <a className="d-flex align-items-center me-0">
                    <Image
                        className={"card-img-top"}
                        src={"/images/favicon/apple-icon-144x144.png"} // Route of the image file
                        height={50} // Desired size with correct aspect ratio
                        width={50} // Desired size with correct aspect ratio
                        alt={"www.paykanpars.com"}
                    />
                </a>
            </Link>


            <DesktopSearchMenu/>


        </div>
    )
}