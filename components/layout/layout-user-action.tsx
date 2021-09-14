import DeviceState from "../../lib/device-state";
import React, {ReactNode, useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import styles from './layout.module.scss'
import {Button, Dropdown, Overlay, Tooltip} from "react-bootstrap";
import useWindowDimensions, {BootstrapBreakpoints} from "../../hooks/useWindowDimensions";

export default function LayoutUserAction({title, icon, id, link, device, hideTitle, count, ...others}:
                                             {
                                                 title: string,
                                                 icon: ReactNode,
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

    const {width, height} = useWindowDimensions()
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
                {icon}


            </div>

            {
                hideTitle ?
                    <></>
                    :
                    <small className={`${styles.userOptionLabel} d-md-none`}>{title}</small>
            }
        </React.Fragment>
    )
    const [showTooltip, setShowToolTip] = useState(false);
    const target = useRef(null);
    return (
        <React.Fragment>
            <Overlay
                target={target.current}
                show={showTooltip}
                placement={width > BootstrapBreakpoints.md ? 'bottom' : 'top'}>
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        {title}
                    </Tooltip>
                )}
            </Overlay>
            {
                others.children ?
                    <Dropdown className={''}>
                        <Dropdown.Toggle
                            ref={target}
                            onMouseEnter={() => setShowToolTip(true)}
                            onMouseLeave={() => setShowToolTip(false)}
                            variant={isActive ? 'primary' : 'light'}
                            className={isActive ? styles.userActionActive : styles.userAction}>
                            {insideButton}
                        </Dropdown.Toggle>

                        {others.children}
                    </Dropdown>
                    :
                    <Link href={link ? link : ""} passHref>
                        <Button id={id}
                                ref={target}
                                onMouseEnter={() => setShowToolTip(true)}
                                onMouseLeave={() => setShowToolTip(false)}
                                variant={isActive ? 'primary' : 'light'}
                                className={isActive ? styles.userActionActive : styles.userAction}
                                role="button"
                        >
                            {insideButton}
                        </Button>
                    </Link>
            }
        </React.Fragment>


    )


}