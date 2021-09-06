import DeviceState from "../../lib/device-state";
import React, {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import styles from './layout.module.scss'
import {Button, Dropdown} from "react-bootstrap";

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

    const className =
        [
            "p-md-3 no-sub",
            "h-100 w-100 text-nowrap",
            "d-flex flex-column justify-content-center align-items-center",
            getState(),
            (isActive ? `btn-primary ${styles.userActionActive}` : "btn-light bg-white border-0"),
        ].join(" ")


    const insideButton = (
        <React.Fragment>
            <div>

                {
                    count ?
                        <span className="badge bg-secondary fasBadge rounded-pill">{count}</span>
                        :
                        <></>
                }
                <i className={`${styles.userOptionIcon} fad ${icon}`}/>
            </div>

            {
                hideTitle ?
                    <></>
                    :
                    <small className={styles.userOptionLabel}>{title}</small>
            }
        </React.Fragment>
    )
    return (


        others.children ?
            <Dropdown className={`col ${getState()}`}>
                <Dropdown.Toggle variant={'light'} className={className}>
                    {insideButton}
                </Dropdown.Toggle>
                {others.children}
            </Dropdown>
            :
            <div className={`col ${getState()}`}>
                <Link href={link ? link : ""} passHref>
                    <Button id={id}
                            className={className}
                            role="button"
                    >
                        {insideButton}
                    </Button>
                </Link>
            </div>


    )


}