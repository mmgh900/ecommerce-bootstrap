import Link from "next/link"
import Layout from "../components/layout/layout";
import * as React from "react";
import {ReactNode, useEffect, useRef, useState} from "react";
import ICategory, {CatType} from "../types/ICategory";

import getApiUrl from "../lib/backend-root";
import IProduct from "../types/IProduct";
import {
    createParamsFromQueries,
    defaultProductParams,
    getProducts, ProductsParamsType,
} from "../lib/products";
import Router, {useRouter} from "next/router";
import {useAppSelector} from "../redux/hooks";
import CatalogMagic from "../components/catalog-loader/catalog-loader";
import Offcanvas from "../components/layout/offcanvas";
import useWindowDimensions from "../hooks/useWindowDimensions";
import {GetServerSideProps, GetStaticProps} from "next";
import {ProductParamsContext, useProductParamsContext} from "../contex/product-params.context";
import Filters from "../components/Products/products-filters/products-filters.component";
import ProductsTableView from "../components/Products/products-table-view/products-table-view";
import ProductsBreadcrumb from "../components/Products/products-breadcrumb/products.breadcrumb.compnent";
import LastUpdateBadge from "../components/last-update-badge/last-update-badge.component";
import ProductViewSelect from "../components/Products/products-view-select/products-view-select.component";
import ProductsCardView from "../components/Products/products-card-view/products-card-view.component";
import ProductPreOrderModal from "../components/product-preorder-modal/product-preorder-modal.component";
import useNumberOfProductColumns from "../hooks/useNumberOfProductColumns";
import ProductsSortSelect from "../components/Products/products-sort-select/products-sort-select.component";
import ProductsContainer from "../components/Products/products-container/products-container.component";
import useProductsParams from "../hooks/useProductsParams";
import {useGetCartQuery, useGetProductsQuery, useGetProductsUpdateDateTimeQuery} from "../redux/api.slice";
import * as queryString from "querystring";
import NProgress from "nprogress";

/**
 * This is the main product page component that manages layout of the page,
 * and also products data.
 *
 * Components used in this page are under /components/products/ directory
 *
 *
 * @param initialProducts
 * @param initialLastUpdate
 * @constructor
 */
export default function Products({products, pagesCount, lastUpdate, filters: productsPrams}) {

    /**
     * Selecting category lists
     */

    /*    const [isProductsLoading, setProductsLoading] = useState<boolean>(true)*/
    const router = useRouter()

    const [isLoading, setLoading] = useState(false)

    Router.events.on('routeChangeStart', () =>setLoading(true));
    Router.events.on('routeChangeComplete', () => setLoading(false));
    Router.events.on('routeChangeError', () => setLoading(false));

    const {height, width} = useWindowDimensions();

    function setManualParams (params) {
        router.push({
            query: params
        })
    }
    return (
        <Layout title={"کالاها"}>
            {
                /**
                 * This is the context provider of params that is wrapped
                 * around main container
                 */
            }
            <ProductParamsContext.Provider value={{productsPrams, setManualParams}}>
                {
                    /**
                     * This is the main container
                     * @extend_style .container-custom because it must be as wide as header in large screens
                     * @extend_style .container-fluid because it must have a minimum padding in small screens
                     */
                }
                <div className="container-custom container-fluid">
                    <div className="row g-3 ">
                        {
                            /**
                             * If the width of the screen is bigger than 992 pixels,
                             * it should show filter settings in a col next to the products container
                             * instead of a offcanvas
                             */
                        }
                        {
                            width > 992 ?
                                <div id="divFilters" className="col-lg-3 list-filter__col">
                                    <Filters/>
                                </div>
                                :
                                <></>
                        }
                        <div className="col-12 col-lg-9 listing">
                            <div className="my-3">
                                <div className="row g-2 mb-3">
                                    <div
                                        className="col-12 col-sm-6 d-flex justify-content-center justify-content-lg-start">
                                        <ProductsBreadcrumb/>
                                    </div>
                                    <div className="col d-flex justify-content-center  justify-content-lg-end">
                                        <LastUpdateBadge
                                            lastUpdate={lastUpdate}/>
                                    </div>
                                </div>
                                <div
                                    className="d-flex justify-content-center justify-content-lg-start align-items-center mb-3">
                                    <ProductsSortSelect/>
                                    <ProductViewSelect/>
                                    <div className={"d-flex  justify-content-center align-items-center"}>
                                        <Offcanvas name={"filters"} parentId={"mainHeader"} title={"فیلتر ها"}
                                                   icon={"far fa-filter me-1"} mobileOnly={true}>
                                            <Filters/>

                                        </Offcanvas>
                                    </div>
                                </div>


                                <ProductsContainer products={products}
                                                   isProductsLoading={isLoading}
                                                   pagesCount={pagesCount}/>
                            </div>
                        </div>
                    </div>
                </div>
            </ProductParamsContext.Provider>

            {
                products ?
                    <ProductPreOrderModal product={products[0]}/>
                    :
                    <></>
            }

        </Layout>
    )
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    const productParams = createParamsFromQueries(context.query)

    const productsData = await fetch(getApiUrl(`/api/Product/GetProducts?${queryString.stringify(productParams)}`), {
        method: 'GET',
    }).then(response => response.json())

    const lastUpdate = await fetch(getApiUrl(`/api/Product/GetUpdateDateTime`), {
        method: 'GET',
    }).then(response => response.json())


    if (!productsData?.data) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            products: productsData.data.products,
            pagesCount: productsData.data.pagesCount,
            lastUpdate: lastUpdate.data as string,
            filters: productParams
        }, // will be passed to the page component as props
    }
}

