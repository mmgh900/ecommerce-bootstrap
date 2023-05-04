import CatalogMagic from "./catalog-loader";
import NoSearchResult from "../../errors/no-search-result";
import Pagination from "../pagination/pagination";
import * as React from "react";
import {useProductParamsContext} from "../../context/product-params.context";
import {useEffect, useRef, useState} from "react";
import IProduct from "../../types/IProduct";
import useNumberOfProductColumns from "../../hooks/useNumberOfProductColumns";
import ProductCard from "../product-card/product-card";

export default function ProductsContainer(
    {products, isProductsLoading, pagesCount, preOrderModalHandler}:
        {
            products: Array<IProduct>,
            isProductsLoading: boolean,
            pagesCount: number,
            preOrderModalHandler: (IProduct) => (void)
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
                            image={'/images/errors/no-product.png'}
                            mainMassage={"نتیجه ای یافت نشد"}
                            description={"لطفا فیلترهای جستجو را حذف کنید."}
                            button={{
                                label: "مشاهده همه کالا ها",
                                link: './products'
                            }}
                        />
                        :
                        <div>
                            <div className={`row row-cols-${numberOfColumns} g-3`}>
                                {
                                    products.map(item =>
                                        <div className="col"
                                             key={`col${item.id}`}>
                                            <ProductCard preOrderModalHandler={preOrderModalHandler}
                                                         key={item.id}
                                                         view={productsPrams.ProductView}
                                                         productData={item}/>
                                        </div>
                                    )
                                }
                            </div>

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