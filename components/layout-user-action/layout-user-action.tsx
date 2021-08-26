import DeviceState from "../../lib/device-state";
import React, {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";

export default function LayoutUserAction({title, icon, id, link, device, hideTitle, count, ...others}:
                                             {
                                                 title: string,
                                                 icon: string,
                                                 link?: string,
                                                 id: string,
                                                 device?: DeviceState
                                                 hideTitle?: boolean
                                                 count?: number
                                                 children?: ReactNode
                                             }
) {
    const [isActive, setActive] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setActive(router.pathname == link)
    }, [router, link])

    const getState = () => {
        if (device == DeviceState.DESKTOP_ONLY) {
            return "d-none d-md-block"
        } else if (device == DeviceState.MOBILE_ONLY) {
            return "d-md-none"
        } else {
            return ""
        }
    }

    const className = () => {
        return (
            [
                "btn",
                "h-100 w-100",
                "d-flex flex-column justify-content-center align-items-center",
                (others.children ? "" : getState()),
                (isActive ? "btn-primary user-action__active" : ""),
            ].join(" ")
        )
    }

    return (
        <div className={"col " + (others.children ? "dropdown " : " ") + getState()}>
            <Link href={link ? link : ""} passHref>
                <a id={id}
                   className={className()}
                   role="button"
                   data-bs-toggle={others.children ? "dropdown" : ""}
                   aria-expanded="false"
                >
                    <div>

                        {
                            count ?
                                <span className="badge bg-secondary fasbadge rounded-pill">{count}</span>
                                :
                                <></>
                        }
                        <i className={"user-option__icon fad " + icon}/>
                    </div>

                    {
                        hideTitle ?
                            <></>
                            :
                            <small className="mt-md-0">{title}</small>
                    }
                </a>
            </Link>
            {others.children}

        </div>
    )


}