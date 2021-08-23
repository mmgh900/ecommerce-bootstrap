import ICategory, {CatType} from "../../../types/ICategory";
import ProductsFilterAccordion from "../products-filter-accordion/products-filter-accordion";
import * as React from "react";

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
            type: CatType
        }
) {
    return (
        <ProductsFilterAccordion title={title} name={name} initiallyOpen={initiallyOpen} isCollapsable={true} parentId={parentId}>
            {
                items.map(item =>
                    <label
                        key={item.name}
                        htmlFor={item.id.toString()}
                        className="c-ui-checkbox list-group-item list-filter__list-item list-group-item-action">
                        <input id={item.id.toString()}
                               type="checkbox"
                               name={item.id.toString()}
                               className="form-check-input list-filter__input"
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