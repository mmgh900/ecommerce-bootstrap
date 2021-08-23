import React, {ReactNode} from "react";
import styles from "./offcanvas.module.scss"
export default function Offcanvas (props: {
    name: string,
    parentId: string,
    title: string,
    icon: ReactNode,
    children: ReactNode,
    mobileOnly: boolean
}){
    const OffcanvasButton = (props: {
        name: string,
        icon: ReactNode,
    }) => {
        const targetId = props.name + "Canvas"
        return (
            <button id={props.name + "Button"} className={ styles.button + " search-header-button btn"}
                    data-bs-toggle="offcanvas.tsx" data-bs-target={"#" + targetId} type="button"
                    aria-expanded="false" aria-controls={targetId}>
                <i className={"far fs-5 d-block " + props.icon}/>
            </button>
        )
    }



    return (
        <div className={props.mobileOnly ? "d-lg-none" : ""}>
            <OffcanvasButton name={props.name} icon={props.icon}/>
            <OffcanvasCanvas name={props.name} title={props.title} parentId={props.parentId}>
                {props.children}
            </OffcanvasCanvas>
        </div>
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
