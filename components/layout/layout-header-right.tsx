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
                        width={50}
                        height={50}
                        layout={'fixed'}
                        src={"/images/carrow-logo.png"} // Route of the image file
                        alt={"www.paykanpars.com"}
                    />
                    <h3 className={'fw-bold'} style={{marginBottom: -3, textTransform: 'uppercase', fontSize: 24, marginLeft: 10}}>
                        Carrow
                    </h3>
                </a>
            </Link>
            <LayoutSearchMenu/>
        </div>
    )
}