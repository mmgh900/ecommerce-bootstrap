import React, {ReactNode} from "react";
import styles from "./offcanvas.module.scss"
import useWindowDimensions, {BootstrapBreakpoints} from "../../hooks/useWindowDimensions";
import ReactDOM from 'react-dom'

export default function Offcanvas(props: {
    name: string,
    parentId: string,
    title: string,
    icon: ReactNode,
    children: ReactNode,
    mobileOnly: boolean,
    buttonStyles?: string,
    buttonText?: string
}) {
    const {width, height} = useWindowDimensions()
    const OffcanvasButton = (buttonProps: {
        name: string,
        icon: ReactNode,
    }) => {
        const targetId = buttonProps.name + "Canvas"
        return (
            <button id={buttonProps.name + "Button"}
                    className={(props.buttonStyles ? props.buttonStyles : (`${styles.button} btn`))}
                    data-bs-toggle="offcanvas" data-bs-target={"#" + targetId} type="button">
                <i className={`far ${buttonProps.icon} ${(props.buttonText ? "me-2" : "")}`}/>
                {props.buttonText ? props.buttonText : ""}
            </button>
        )
    }


    /**
     * Returns nothing if there the component is mobile only and the screen is bigger than md
     */
    if (width > BootstrapBreakpoints.md && props.mobileOnly) {
        return <></>
    }
    return (
        <React.Fragment>
            <OffcanvasButton name={props.name} icon={props.icon}/>
            <OffcanvasCanvas name={props.name} title={props.title} parentId={props.parentId}>
                {props.children}
            </OffcanvasCanvas>
        </React.Fragment>
    )
}
export const OffcanvasCanvas = (props: {
    name: string,
    children: ReactNode,
    title: string,
    parentId: string
}) => {
    const id = props.name + "Canvas"
    const appWrapper = document.getElementById('appWrapper')
    return(
            <div id={id} className="offcanvas offcanvas-end" data-bs-parent={props.parentId}>
                <div className="offcanvas-header">
                    <h4 id="offcanvasTopLabel" className="fw-bold">{props.title}</h4>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                            aria-label="Close"/>
                </div>
                <div className="offcanvas-body">
                    {props.children}
                </div>
            </div>
        )

}
