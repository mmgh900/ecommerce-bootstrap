import Link from "next/link";
import DesktopSearchMenu from "./desktop-search-menu";
import React from "react";

export default function LayoutHeaderRight() {
    return (
        <div id="rightSideOfHeader" className="d-flex">
            <Link href="/" passHref>
                <a className="d-flex align-items-center me-0">
                    <img
                        className={"card-img-top"}
                        src={"/images/favicon/android-icon-48x48.png"} // Route of the image file
                        alt={"www.paykanpars.com"}
                    />
                </a>
            </Link>


            <DesktopSearchMenu/>


        </div>
    )
}