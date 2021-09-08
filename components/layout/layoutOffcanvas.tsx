import React, {ReactNode, useState} from "react";
import styles from "./layout.module.scss"
import useWindowDimensions, {BootstrapBreakpoints} from "../../hooks/useWindowDimensions";
import {Button, Offcanvas} from "react-bootstrap";

export default function LayoutOffcanvas(props: {
    name: string,
    parentId: string,
    title: string,
    icon: ReactNode,
    children: ReactNode,
    mobileOnly: boolean,
    buttonStyles?: string,
    buttonText?: string
    canvasStyle?: string
}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {width, height} = useWindowDimensions()
    /**
     * Returns nothing if there the component is mobile only and the screen is bigger than md
     */
    if (width > BootstrapBreakpoints.lg && props.mobileOnly) {
        return <></>
    }
    return (
        <React.Fragment>
            <Button
                /**
                * The default variant is light with white background but if there be a
                * custom style then variant will be empty and the variant will be determined by className
                */
                variant={(props.buttonStyles ? '' : 'light')}
                onClick={handleShow}
                /**
                * If there won't be a custom styles the default style will be set
                * default style is from the layout sass module and matches the buttons
                * on the left side of the navigation bar
                */
                className={(props.buttonStyles ? props.buttonStyles : styles.userAction)
                }>
                <i className={`${props.buttonStyles ? '' : styles.userOptionIcon} fad ${props.icon} ${(props.buttonText && width > BootstrapBreakpoints.sm ? "me-2" : "")}`}/>
                {props.buttonText && width > BootstrapBreakpoints.sm ? props.buttonText : ""}
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{props.title}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={props.canvasStyle}>
                    {props.children}
                </Offcanvas.Body>
            </Offcanvas>
        </React.Fragment>
    )
}

