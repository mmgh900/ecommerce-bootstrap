import CatalogMagic from "../../catalog-loader/catalog-loader";
import NoSearchResult from "../../../errors/no-search-result";
import ProductsCardView from "../products-card-view/products-card-view.component";
import Pagination from "../../pagination/pagination";
import * as React from "react";
import {useProductParamsContext} from "../../../contex/product-params.context";
import {useEffect, useRef, useState} from "react";
import IProduct from "../../../types/IProduct";
import useNumberOfProductColumns from "../../../hooks/useNumberOfProductColumns";

export default function ProductsContainer(
    {products, isProductsLoading, pagesCount}:
        {
            products: Array<IProduct>,
            isProductsLoading: boolean,
            pagesCount: number
        }
) {
    const {productsPrams, setManualParams} = useProductParamsContext()
    const numberOfColumns = useNumberOfProductColumns()
    /**
     * Hooks for controlling width of loader
     */
    const productsContainerRef = useRef(null);
    const [productContainerWidth, setProductContainerWidth] = useState<number>(0)
    useEffect(() => {
        setProductContainerWidth(productsContainerRef.current.offsetWidth)
    }, [productsContainerRef?.current?.offsetWidth])

    return (
        <div ref={productsContainerRef} className="">
            {
                isProductsLoading ? //TODO: Remove lsat two conditions
                    <CatalogMagic column={numberOfColumns} width={productContainerWidth}/>
                    :
                    products.length === 0 ?
                        <NoSearchResult
                            mainMassage={"نتیجه ای یافت نشد"}
                            description={"لطفا فیلترهای جستجو را حذف کنید."}
                            button={{
                                label: "مشاهده همه کالا ها",
                                link: './products'
                            }}
                        />
                        :
                        <div>
                            <ProductsCardView products={products}
                                              numberOfColumns={numberOfColumns}/>

                            <Pagination currentPage={productsPrams.Page}
                                        numberOfPages={pagesCount}
                                        changePageHandler={(pageNumber: number) => {
                                            setManualParams({
                                                ...productsPrams,
                                                Page: pageNumber
                                            })
                                        }}/>

                        </div>
            }
        </div>
    )
}