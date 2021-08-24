import ICategory, {getCar, getCompany, getSection, ProductGroupLevel} from "../../../types/ICategory";
import {useAppSelector} from "../../../redux/hooks";
import {useProductParamsContext} from "../../../contex/product-params.context";
import * as React from "react";
import {ProductsParamsType} from "../../../lib/products";
import ProductsFilterAccordion from "../products-filter-accordion/products-filter-accordion";
import AppliedFilterBadge from "../../applied-filter-badge/applied-filter-badge";
import ProductsFilterByCategoryAccordion
    from "../products-filter-by-category-accordion/products-filter-by-category-accordion";
import {useEffect, useState} from "react";
import {useGetProductGroupsQuery} from "../../../redux/api.slice";

const Filters = () => {

    const {productsPrams, setManualParams} = useProductParamsContext()
    const {data: productGroups, isLoading: productGroupsLoading, error: productGroupsError} = useGetProductGroupsQuery()
    const [appliedFilters, setAppliedFilters] = useState<Array<ICategory>>([])
    useEffect(() => {
        /* console.log("Updating applied filters...")*/
        let list = [];
        if (productGroups) {
            setAppliedFilters(list.concat(
                productsPrams.Car.map(id => (
                    getCar(productGroups).find(element => element.id === id)
                )), productsPrams.Section.map(id => (
                    getSection(productGroups).find(element => element.id === id)
                )), productsPrams.Company.map(id => (
                    getCompany(productGroups).find(element => element.id === id)
                ))).filter(item => item != undefined))
        }
    }, [productsPrams, productGroups])

    const handleViewFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newParams: ProductsParamsType = {
            ...productsPrams,
            [event.target.name]: event.target.checked
        }
        setManualParams(newParams)

    }
    const handleCatFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLButtonElement>, pLevel: ProductGroupLevel) => {
        const targetId = parseInt(event.target.id)
        const newParams: ProductsParamsType = {...productsPrams}

        switch (pLevel) {
            case ProductGroupLevel.Company:
                if (productsPrams.Company.includes(targetId)) {
                    newParams.Company = newParams.Company.filter(item => {
                        return item != targetId
                    })
                } else {
                    newParams.Company = [...newParams.Company, targetId]
                }
                break
            case ProductGroupLevel.Car:
                if (productsPrams.Car.includes(targetId)) {
                    newParams.Car = newParams.Car.filter(item => {
                        return item != targetId
                    })
                } else {
                    newParams.Car = [...newParams.Car, targetId]
                }

                break
            case ProductGroupLevel.Section:
                if (productsPrams.Section.includes(targetId)) {
                    newParams.Section = newParams.Section.filter(item => {
                        return item != targetId
                    })
                } else {
                    newParams.Section = [...newParams.Section, targetId]

                }
                break
        }
        setManualParams(newParams)

    }
    return (
        <div id="list-filter__body" className="accordion">
            {
                (appliedFilters.length > 0) ?
                    <ProductsFilterAccordion title={"فیلترهای اعمال شده"} name={"appliedFilters"}
                                             isCollapsable={false}>
                        <div id="divFilterList" className="p-2">
                            {
                                appliedFilters.map(item => {
                                    if (item != undefined) {
                                        return (
                                            <AppliedFilterBadge type={item.pLevel} key={item.id} id={item.id}
                                                                label={item.name}
                                                                handler={handleCatFilterChange}/>
                                        )
                                    }
                                })
                            }
                        </div>

                    </ProductsFilterAccordion>
                    :
                    ""
            }

            <ProductsFilterAccordion title={"ویژگی ها"} name={"features"} isCollapsable={false}>
                <label className='list-group-item list-group-item-action' htmlFor="OnlyExists">
                    <div
                        className="form-check form-switch">

                        <input
                            id={"OnlyExists"}
                            checked={productsPrams.OnlyExists}
                            onChange={handleViewFilterChange}
                            name="OnlyExists"
                            type="checkbox"
                            className="form-check-input list-filter__input"/>

                        <label htmlFor="OnlyExists">
                            فقط کالاهای موجود
                        </label>
                    </div>
                </label>

                <label className='list-group-item list-group-item-action' htmlFor="OnlyLastInputs">
                    <div
                        className="form-check form-switch">

                        <input
                            id={"OnlyLastInputs"}
                            checked={productsPrams.OnlyLastInputs}
                            onChange={handleViewFilterChange}
                            name="OnlyLastInputs"
                            type="checkbox"
                            className="form-check-input list-filter__input"/>

                        <span className="c-ui-checkbox__check"/>
                        <label htmlFor="OnlyLastInputs">
                            فقط کالاهای جدید الورود
                        </label>
                    </div>
                </label>
            </ProductsFilterAccordion>
            {
                productGroups ?
                    <React.Fragment>
                        <ProductsFilterByCategoryAccordion type={ProductGroupLevel.Car} handler={handleCatFilterChange} title={"خودرو‌ها"}
                                                           name={"cars"}
                                                           items={getCar(productGroups).map(item => {
                                                               return {
                                                                   ...item,
                                                                   isChecked: productsPrams.Car.includes(item.id)
                                                               }
                                                           })}
                                                           initiallyOpen={true}
                                                           parentId={"list-filter__body"}/>
                        <ProductsFilterByCategoryAccordion type={ProductGroupLevel.Company} handler={handleCatFilterChange} title={"برند‌ها"}
                                                           name={"brands"}
                                                           items={getCompany(productGroups).map(item => {
                                                               return {
                                                                   ...item,
                                                                   isChecked: productsPrams.Company.includes(item.id)
                                                               }
                                                           })}
                                                           initiallyOpen={false}
                                                           parentId={"list-filter__body"}/>
                        <ProductsFilterByCategoryAccordion type={ProductGroupLevel.Section} handler={handleCatFilterChange} title={"بخش ها"}
                                                           name={"parts"}
                                                           items={getSection(productGroups).map(item => {
                                                               return {
                                                                   ...item,
                                                                   isChecked: productsPrams.Section.includes(item.id)
                                                               }
                                                           })}
                                                           initiallyOpen={false}
                                                           parentId={"list-filter__body"}/>
                    </React.Fragment>
                    :
                    <></>
            }

        </div>
    )
}

export default Filters