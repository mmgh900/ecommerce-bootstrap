import React, {ReactNode} from "react";
import styles from "./offcanvas.module.scss"

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
    const OffcanvasButton = (buttonProps: {
        name: string,
        icon: ReactNode,
    }) => {
        const targetId = buttonProps.name + "Canvas"
        return (
            <button id={buttonProps.name + "Button"}
                    className={(props.buttonStyles ? props.buttonStyles : (`${styles.button} btn`))}
                    data-bs-toggle="offcanvas.tsx" data-bs-target={"#" + targetId} type="button"
                    aria-expanded="false" aria-controls={targetId}>
                <i className={`far fs-5 d-block ${buttonProps.icon} ${(props.buttonText ? "me-2" : "")}`}/>
                {props.buttonText ? props.buttonText : ""}
            </button>
        )
    }


    return (
        <React.Fragment>
            <div  className={props.mobileOnly ? "d-lg-none" : ""}>
                <OffcanvasButton name={props.name} icon={props.icon}/>
            </div>
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
    return (
        <div id={id} className="offcanvas offcanvas-end" data-bs-parent={props.parentId}>
            <div className="offcanvas-header">
                <h4 id="offcanvasTopLabel" className="fw-bold">{props.title}</h4>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas.tsx"
                        aria-label="Close"/>
            </div>
            <div className="offcanvas-body">
                {props.children}
            </div>
        </div>
    )
}
