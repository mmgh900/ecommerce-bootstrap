import React, {ChangeEventHandler, useContext, useEffect, useState} from "react";
import SearchCategorySelects from "./search-category-selects";
import styles from "./desktop-search-menu.module.scss"

import {ProductsParamsType} from "../../lib/products";
import {useFocusProvider} from "../../contex/focus-provider.context";
import {Button} from "react-bootstrap";
import {useRouter} from "next/router";
import useWindowDimensions, {BootstrapBreakpoints} from "../../hooks/useWindowDimensions";

export default function LayoutSearchMenu({mobile}: { mobile?: boolean }) {
    const {isFocused, setFocused} = useFocusProvider() // Determines whether the desktop search menu is clicked and activated or not
    const [selectStates, setSelectStates] = useState({}) // This is just to manage select states
    const [params, setParams] = useState<ProductsParamsType>({}) // This object will be passed as a query to products page to filter products
    const router = useRouter()
    const {width, height} = useWindowDimensions()
    const handleSubmit = (e) => {
        e.preventDefault()
        router.push({
            pathname: '/products',
            query: params
        })
        setFocused(false)
    }

    const selectsChangeHandler = (selectedItems, action) => {
        setSelectStates({
            ...selectStates,
            [action.name]: selectedItems
        })
        setParams({
            ...params,
            [action.name]: selectedItems.map(item => item.value)
        })
    }

    const searchTextEventHandler = ((event) => {
        setParams({
            ...params,
            [event.target.name]: event.target.value
        })
    }) as ChangeEventHandler<HTMLInputElement>

    if (mobile && width < BootstrapBreakpoints.lg) {
        return (
            <form onSubmit={handleSubmit} className={"d-flex flex-column"} autoComplete={"off"} action="/products">
                <label htmlFor="searchInputMobile" className="form-label">نام یا کد فنی محصول:</label>
                <input onChange={searchTextEventHandler} id="searchInputMobile" name="SearchText"
                       className="form-control mb-3"
                       type="text" list="datalistOptions" placeholder="جستجو کنید"/>
                <SearchCategorySelects handler={selectsChangeHandler} params={selectStates}/>
                <button className="mt-2 btn btn-primary" type="submit">جستجو</button>
            </form>
        )
    } else if (!mobile && width > BootstrapBreakpoints.lg) {
        return (
            <div onClick={(e) => {
                e.stopPropagation()
            }} className={[styles.desktopSearch, "d-flex mx-2 align-items-center"].join(" ")}>
                <div className={styles.containerWrapper}>
                    <div className={[(isFocused ? styles.containerFocused : ""), styles.container].join(" ")}>
                        <form onSubmit={handleSubmit} autoComplete={"off"} action="/products">
                            <input
                                onChange={searchTextEventHandler}
                                onClick={() => setFocused(true)}
                                name={"SearchText"}
                                className={[(isFocused ? styles.inputFocused : ""), styles.input, "form-control w-100 selectStates-control"].join(" ")}
                                placeholder={"نام یا کد فنی محصول مورد نظر..."}
                            />
                            {
                                isFocused ?
                                    <div className={styles.menu + " bg-white"}>
                                        <div className="row d-flex justify-content-center align-items-center">
                                            <SearchCategorySelects handler={selectsChangeHandler}
                                                                   params={selectStates}/>
                                            <Button variant={'primary'} className="col-12 w-50"
                                                    type="submit">جستجو
                                            </Button>
                                        </div>
                                    </div>
                                    :
                                    ""
                            }
                        </form>

                    </div>
                </div>

            </div>


        )
    } else {
        return <></>
    }

}