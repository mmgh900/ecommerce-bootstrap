import React, {useContext, useState} from "react";
import SearchCategorySelects from "./search-category-selects";
import styles from "./desktop-search-menu.module.scss"

import {ProductsParamsType} from "../../lib/products";
import {useFocusProvider} from "../../contex/focus-provider.context";
import {Button} from "react-bootstrap";

export default function DesktopSearchMenu() {
    const {isFocused, setFocused} = useFocusProvider()
    const [form, setForm] = useState<ProductsParamsType>({})

    const handleSubmit = (e) => {
       /* e.preventDefault()*/
        console.log(e)
    }
    return (
        <div onClick={(e) => {e.stopPropagation()}} className={[styles.desktopSearch, "main-header-option d-flex mx-2 d-none d-lg-block"].join(" ")}>
            <div className={[(isFocused ? styles.containerFocused : ""), styles.container].join(" ")}>
                <form onSubmit={handleSubmit} autoComplete={"off"} action="/products">
                    <input
                        onClick={()=> setFocused(true)}
                        name={"SearchText"}
                        className={[(isFocused ? styles.inputFocused : ""), styles.input, "form-control d-none d-md-block"].join(" ")}
                        placeholder={"نام یا کد فنی محصول مورد نظر..."}
                    />
                    {
                        isFocused ?
                            <div className={styles.menu + " bg-white"}>
                                <div className="row d-flex justify-content-center align-items-center">
                                    <SearchCategorySelects />
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


    )
}