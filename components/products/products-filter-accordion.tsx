import {ReactNode} from "react";
import styles from "./products.module.scss";
import * as React from "react";

function ProductsFilterAccordion(
    {
        title,
        name,
        parentId,
        children,
        initiallyOpen,
        isCollapsable,

    }:
        {
            title: string,
            name: string,
            children: ReactNode,
            parentId?: string,
            initiallyOpen?: boolean,
            isCollapsable: boolean,
        }
) {
    const id = name + "ListFilterCollapse"
    return (
        <div className={[styles.catAccordionItem, "accordion-item my-3 shadow-sm"].join(" ")}>
            <h5 className="accordion-header">
                <button
                    className={["fw-bold", "accordion-button", ((initiallyOpen || !isCollapsable) ? "" : "collapsed"), (isCollapsable ? "" : "no-sub")].join(" ")}
                    type="button" data-bs-toggle={isCollapsable ? "collapse" : ""}
                    data-bs-target={isCollapsable ? "#" + id : ""}
                    aria-expanded={isCollapsable ? initiallyOpen : null}
                    aria-controls={id}
                >
                    {title}
                </button>
            </h5>
            <div id={id}
                 data-bs-parent={"#" + parentId}
                 className={[styles.productFilterAccordion,
                     (isCollapsable ? "accordion-collapse collapse " : ""),
                     ((isCollapsable && initiallyOpen) ? "show" : "")].join(" ")}>
                <div className="accordion-body list-group list-group-flush p-0">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default ProductsFilterAccordion