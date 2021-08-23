import {ReactNode} from "react";
import * as React from "react";

export default function ProductCardCategoryTag (
    {
        icon,
        valueStr,
        className

    }
        :
        {
            icon: string
            valueStr: string | ReactNode
            className?: string
        }
) {
    return (
        <li className={[(className ? className : " "), "text-muted"].join(" ")}>
            <span className="icon-container">
                <i className={`far fa-${icon}`}/>
            </span>
            {valueStr}
        </li>
    )
}