import styles from './products.module.scss'
import ICategory, {ProductGroupLevel} from "../../types/ICategory";
import * as React from "react";
import ProductsFilterAccordion from "./products-filter-accordion";
import {useEffect, useState} from "react";

function ProductsFilterByCategoryAccordion(
    {
        title,
        name,
        items,
        initiallyOpen,
        parentId,
        handler,
        type
    }:
        {
            title: string,
            name: string,
            items: Array<ICategory>
            initiallyOpen: boolean,
            parentId: string,
            handler: any,
            type: ProductGroupLevel
        }
) {

    const count = items.filter(item => item.isChecked).length
    return (
        <ProductsFilterAccordion title={count > 0 ? `${title} (${count})`: title} name={name} initiallyOpen={initiallyOpen} isCollapsable={true} parentId={parentId}>
            {
                items.map(item =>
                    <label
                        key={item.name}
                        htmlFor={item.id.toString()}
                        className="list-group-item list-group-item-action">
                        <input id={item.id.toString()}
                               type="checkbox"
                               name={item.id.toString()}
                               className={`${styles.listFilterInput} form-check-input`}
                               data-section_id={item.name}
                               checked={item.isChecked}
                               onChange={event => handler(event, type)}
                        />
                        <span>
                            {item.name}
                        </span>
                    </label>)
            }
        </ProductsFilterAccordion>
    )
}
export default ProductsFilterByCategoryAccordion