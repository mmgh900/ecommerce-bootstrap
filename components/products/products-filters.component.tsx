import styles from './products.module.scss'
import ICategory, {getCar, getCompany, getSection, ProductGroupLevel} from "../../types/ICategory";
import {useProductParamsContext} from "../../context/product-params.context";
import * as React from "react";
import {ProductsParamsType} from "../../lib/products";
import {useEffect, useState} from "react";
import {useGetProductGroupsQuery} from "../../redux/api.slice";
import AppliedFilterBadge from "./applied-filter-badge";
import ProductsFilterAccordion from "./products-filter-accordion";
import ProductsFilterByCategoryAccordion from "./products-filter-by-category-accordion";
import {Accordion, Button} from "react-bootstrap";
import useWindowDimensions, {BootstrapBreakpoints} from "../../hooks/useWindowDimensions";

const Filters = ({applyImmediately}: { applyImmediately: boolean }) => {

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

    /**
     * localParams is a state for when we want to
     * apply filter when user submits not immediately after each change
     */
    const [localParams, setLocalParams] = useState<ProductsParamsType>(productsPrams)
    const handleLocalFiltersSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setManualParams(localParams)
    }
    const handleViewFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newParams: ProductsParamsType = {
            ...(applyImmediately ? productsPrams : localParams),
            [event.target.name]: event.target.checked
        }
        applyImmediately ? setManualParams(newParams) : setLocalParams(newParams)

    }
    const handleCatFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLButtonElement>, pLevel: ProductGroupLevel) => {
        const targetId = parseInt(event.target.id)
        const newParams: ProductsParamsType = {...(applyImmediately ? productsPrams : localParams)}

        switch (pLevel) {
            case ProductGroupLevel.Company:
                // Removes if exists
                if (productsPrams.Company.includes(targetId)) {
                    newParams.Company = newParams.Company.filter(item => {
                        return item != targetId
                    })
                }
                // Adds if it's new
                else {
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
        applyImmediately ? setManualParams(newParams) : setLocalParams(newParams)

    }
    const {width, height} = useWindowDimensions()
    return (
        <form onSubmit={handleLocalFiltersSubmit}>
            {
                applyImmediately ? <></> :
                    <div className={styles.applyFiltersButtonWrapper}>
                        <Button className={`w-100 rounded-0 py-3`} type={'submit'} variant={'primary'}>
                            اعمال فیلتر ها
                        </Button>
                    </div>

            }
            <Accordion defaultActiveKey={'cars'}>
                {
                    (
                        appliedFilters.length > 0 && // We want to show applied filers if there is some
                        width > BootstrapBreakpoints.lg // We don't want applied filters in mobile
                    ) ?
                        <ProductsFilterAccordion title={"فیلترهای اعمال شده"} name={"appliedFilters"}
                                                 isCollapsable={false}>
                            <div className="p-2">
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
                    <div className="list-group list-group-flush">
                        <label className='list-group-item list-group-item-action' htmlFor="OnlyExists">
                            <div
                                className="form-check form-switch">

                                <input
                                    id={"OnlyExists"}
                                    checked={(applyImmediately ? productsPrams : localParams).OnlyExists}
                                    onChange={handleViewFilterChange}
                                    name="OnlyExists"
                                    type="checkbox"
                                    className={`${styles.listFilterInput} form-check-input`}/>

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
                                    checked={(applyImmediately ? productsPrams : localParams).OnlyLastInputs}
                                    onChange={handleViewFilterChange}
                                    name="OnlyLastInputs"
                                    type="checkbox"
                                    className={`${styles.listFilterInput} form-check-input`}/>

                                <span className="c-ui-checkbox__check"/>
                                <label htmlFor="OnlyLastInputs">
                                    فقط کالاهای جدید الورود
                                </label>
                            </div>
                        </label>
                    </div>

                </ProductsFilterAccordion>
                {
                    productGroups ?
                        <React.Fragment>
                            <ProductsFilterByCategoryAccordion type={ProductGroupLevel.Car}
                                                               handler={handleCatFilterChange} title={"خودرو‌ها"}
                                                               name={"cars"}
                                                               items={getCar(productGroups).map(item => {
                                                                   return {
                                                                       ...item,
                                                                       isChecked: (applyImmediately ? productsPrams : localParams).Car.includes(item.id)
                                                                   }
                                                               })}
                                                               initiallyOpen={true}
                                                               parentId={"productFilterAccordionsParent"}/>
                            <ProductsFilterByCategoryAccordion type={ProductGroupLevel.Company}
                                                               handler={handleCatFilterChange} title={"برند‌ها"}
                                                               name={"brands"}
                                                               items={getCompany(productGroups).map(item => {
                                                                   return {
                                                                       ...item,
                                                                       isChecked: (applyImmediately ? productsPrams : localParams).Company.includes(item.id)
                                                                   }
                                                               })}
                                                               initiallyOpen={false}
                                                               parentId={"productFilterAccordionsParent"}/>
                            <ProductsFilterByCategoryAccordion type={ProductGroupLevel.Section}
                                                               handler={handleCatFilterChange} title={"بخش ها"}
                                                               name={"parts"}
                                                               items={getSection(productGroups).map(item => {
                                                                   return {
                                                                       ...item,
                                                                       isChecked: (applyImmediately ? productsPrams : localParams).Section.includes(item.id)
                                                                   }
                                                               })}
                                                               initiallyOpen={false}
                                                               parentId={"productFilterAccordionsParent"}/>
                        </React.Fragment>
                        :
                        <></>
                }

            </Accordion>
        </form>
    )
}

export default Filters