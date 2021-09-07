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





    const insideButton = (
        <React.Fragment>
            <div>

                {
                    count ?
                        <span className="badge bg-danger fasBadge rounded-pill">{count}</span>
                        :
                        <></>
                }
                <i className={`${styles.userOptionIcon} fad ${icon}`}/>
            </div>

            {
                hideTitle ?
                    <></>
                    :
                    <small className={`${styles.userOptionLabel} d-md-none`}>{title}</small>
            }
        </React.Fragment>
    )
    return (
        others.children ?
            <Dropdown className={'h-100'}>
                <Dropdown.Toggle variant={isActive ? 'primary' : 'light'} className={isActive ? styles.userActionActive : styles.userAction}>
                    {insideButton}
                </Dropdown.Toggle>
                {others.children}
            </Dropdown>
            :
            <Link href={link ? link : ""} passHref>
                <Button id={id}
                        variant={isActive ? 'primary' : 'light'}
                        className={isActive ? styles.userActionActive : styles.userAction}
                        role="button"
                >
                    {insideButton}
                </Button>
            </Link>


    )


}