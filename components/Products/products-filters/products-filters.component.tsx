import ICategory, {CatType} from "../../../types/ICategory";
import {useAppSelector} from "../../../redux/hooks";
import {useProductParamsContext} from "../../../contex/product-params.context";
import * as React from "react";
import {ProductsParamsType} from "../../../lib/products";
import ProductsFilterAccordion from "../products-filter-accordion/products-filter-accordion";
import AppliedFilterBadge from "../../applied-filter-badge/applied-filter-badge";
import ProductsFilterByCategoryAccordion
    from "../products-filter-by-category-accordion/products-filter-by-category-accordion";
import {useEffect, useState} from "react";

const Filters = () => {

    const parts = useAppSelector(state => state.categories[CatType.PART])
    const brands = useAppSelector(state => state.categories[CatType.BRANDS])
    const cars = useAppSelector(state => state.categories[CatType.CAR])
    const {productsPrams, setManualParams} = useProductParamsContext()

    const [appliedFilters, setAppliedFilters] = useState<Array<ICategory>>([])
    useEffect(() => {
        /* console.log("Updating applied filters...")*/
        let list = [];
        if (cars.length != 0 && parts.length != 0 && brands.length != 0) {
            setAppliedFilters(list.concat(
                productsPrams.Car.map(id => (
                    cars.find(element => element.id === id)
                )), productsPrams.Section.map(id => (
                    parts.find(element => element.id === id)
                )), productsPrams.Company.map(id => (
                    brands.find(element => element.id === id)
                ))).filter(item => item != undefined))
        }
    }, [productsPrams, cars, parts, brands])

    const handleViewFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newParams: ProductsParamsType = {
            ...productsPrams,
            [event.target.name]: event.target.checked
        }
        setManualParams(newParams)

    }
    const handleCatFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLButtonElement>, type: CatType) => {
        const targetId = parseInt(event.target.id)
        const newParams: ProductsParamsType = {...productsPrams}

        switch (type) {
            case CatType.BRANDS:
                if (productsPrams.Company.includes(targetId)) {
                    newParams.Company = newParams.Company.filter(item => {
                        return item != targetId
                    })
                } else {
                    newParams.Company = [...newParams.Company, targetId]
                }
                break
            case CatType.CAR:
                if (productsPrams.Car.includes(targetId)) {
                    newParams.Car = newParams.Car.filter(item => {
                        return item != targetId
                    })
                } else {
                    newParams.Car = [...newParams.Car, targetId]
                }

                break
            case CatType.PART:
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
                                            <AppliedFilterBadge type={item.type} key={item.id} id={item.id}
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
                <label
                    className="c-ui-checkbox list-group-item list-filter__list-item list-group-item-action"
                    htmlFor="OnlyExists">

                    <input
                        id={"OnlyExists"}
                        checked={productsPrams.OnlyExists}
                        onChange={handleViewFilterChange}
                        name="OnlyExists"
                        type="checkbox"
                        className="form-check-input list-filter__input"/>

                    <span className="c-ui-checkbox__check"/>
                    <label htmlFor="OnlyExists">
                        فقط کالاهای موجود
                    </label>
                </label>
                <label
                    htmlFor="OnlyLastInputs"
                    className="c-ui-checkbox list-group-item list-filter__list-item list-group-item-action">

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
                </label>
            </ProductsFilterAccordion>
            <ProductsFilterByCategoryAccordion type={CatType.CAR} handler={handleCatFilterChange} title={"خودرو‌ها"}
                                               name={"cars"}
                                               items={cars.map(item => {
                                                  return {
                                                      ...item,
                                                      isChecked: productsPrams.Car.includes(item.id)
                                                  }
                                              })}
                                               initiallyOpen={true}
                                               parentId={"list-filter__body"}/>
            <ProductsFilterByCategoryAccordion type={CatType.BRANDS} handler={handleCatFilterChange} title={"برند‌ها"}
                                               name={"brands"}
                                               items={brands.map(item => {
                                                  return {
                                                      ...item,
                                                      isChecked: productsPrams.Company.includes(item.id)
                                                  }
                                              })}
                                               initiallyOpen={false}
                                               parentId={"list-filter__body"}/>
            <ProductsFilterByCategoryAccordion type={CatType.PART} handler={handleCatFilterChange} title={"بخش ها"}
                                               name={"parts"}
                                               items={parts.map(item => {
                                                  return {
                                                      ...item,
                                                      isChecked: productsPrams.Section.includes(item.id)
                                                  }
                                              })}
                                               initiallyOpen={false}
                                               parentId={"list-filter__body"}/>

        </div>
    )
}

export default Filters