import Link from "next/link";
import LayoutSearchMenu from "./layout-search-menu";
import React from "react";
import Image from 'next/image'
import useWindowDimensions, {BootstrapBreakpoints} from "../../hooks/useWindowDimensions";
export default function LayoutHeaderRight() {
    const {width, height} = useWindowDimensions()
    return (
        <div id="rightSideOfHeader" className="d-flex">
            <Link href="/" passHref>
                <a className="d-flex align-items-center me-0">
                    <Image
                        width={38}
                        height={38}
                        layout={'fixed'}
                        src={"/images/logo/logo.svg"} // Route of the image file
                        alt={"www.paykanpars.com"}
                    />

                    {
                       width > BootstrapBreakpoints.sm ?
                           <div className='ms-2 d-flex align-items-center'>
                               <Image
                                   width={120}
                                   height={48}
                                   layout={'fixed'}
                                   src={"/images/logo/text.svg"} // Route of the image file
                                   alt={"www.paykanpars.com"}
                               />
                           </div>

                           :
                           <></>
                    }

                </a>
            </Link>
            <LayoutSearchMenu/>
        </div>
    )
}