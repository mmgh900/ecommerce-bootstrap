import Link from "next/link"
import Layout from "../components/layout/layout";
import * as React from "react";
import {ReactNode, useEffect, useRef, useState} from "react";
import {Offcanvas} from 'bootstrap'
import getApiUrl from "../lib/backend-root";
import IProduct from "../types/IProduct";
import {
    createParamsFromQueries,
    defaultProductParams,
    getProducts, ProductsParamsType,
} from "../lib/products";
import Router, {useRouter} from "next/router";
import {useAppSelector} from "../redux/hooks";
import CatalogMagic from "../components/products/catalog-loader";
import OffcanvasComponent from "../components/layout/layoutOffcanvas";
import useWindowDimensions, {BootstrapBreakpoints} from "../hooks/useWindowDimensions";
import {GetServerSideProps, GetStaticProps} from "next";
import {ProductParamsContext, useProductParamsContext} from "../context/product-params.context";
import Filters from "../components/products/products-filters.component";
import ProductsTableView from "../components/products/products-table-view";
import ProductsBreadcrumb from "../components/products/products.breadcrumb.compnent";
import LastUpdateBadge from "../components/last-update-badge/last-update-badge.component";
import ProductViewSelect from "../components/products/products-view-select.component";
import ProductPreOrderModal from "../components/product-card/product-preorder-modal.component";
import ProductsSortSelect from "../components/products/products-sort-select.component";
import ProductsContainer from "../components/products/products-container.component";
import * as queryString from "querystring";
import {useRouterLoading} from "../context/router-loading.context";
import {FaFilter} from "react-icons/fa";
import sampleProducts from "../data/sampleProducts";

/**
 * This is the main product page component that manages layout of the page,
 * and also products data.
 *
 * Components used in this page are under /components/products/ directory
 *
 */
export default function Products({products, pagesCount, lastUpdate, filters: productsPrams}) {

    /**
     * Selecting category lists
     */

    /*    const [isProductsLoading, setProductsLoading] = useState<boolean>(true)*/
    const router = useRouter()

    const {isRouterLoading, setRouterLoading} = useRouterLoading()

    const {height, width} = useWindowDimensions();

    function setManualParams(params) {
        router.push({
            query: params
        })
    }

    const [showPreOrderModal, setPreOrderModalShow] = useState<boolean>(false)
    const [currentPreOrderProduct, setCurrentPreOrderModalProduct] = useState<IProduct>()

    const handlePreOrderModalClose = () => setPreOrderModalShow(false);
    const handlePreOrderModalShow = (product: IProduct) => {
        setCurrentPreOrderModalProduct(product)
        setPreOrderModalShow(true);
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
                     * @extend_style .container-xxl because it must be as wide as header in large screens
                     * @extend_style .container-fluid because it must have a minimum padding in small screens
                     */
                }
                <div className="custom-container">
                    <div className="row g-3 ">
                        {
                            /**
                             * If the width of the screen is bigger than 992 pixels,
                             * it should show filter settings in a col next to the products container
                             * instead of a offcanvas
                             */
                        }
                        {
                            width > BootstrapBreakpoints.lg ?
                                <div id="divFilters" className="col-lg-3 list-filter__col">
                                    <Filters applyImmediately={true}/>
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
                                <div className="d-flex mb-3 flex-wrap">
                                    <ProductsSortSelect/>
                                    <ProductViewSelect/>
                                    <OffcanvasComponent canvasStyle={'mb-5'} // Because we have a apply button here
                                                        name={"filters"}
                                                        title={"فیلتر ها"}
                                                        icon={<FaFilter className={'me-2'}/>}
                                                        mobileOnly={true}
                                                        buttonText={'فیلترها'}
                                                        buttonStyles={'btn btn-sm btn-secondary'}>
                                        <Filters applyImmediately={false}/>
                                    </OffcanvasComponent>
                                </div>

                                <ProductsContainer preOrderModalHandler={handlePreOrderModalShow}
                                                   products={products}
                                                   isProductsLoading={isRouterLoading}
                                                   pagesCount={pagesCount}/>
                            </div>
                        </div>
                    </div>
                </div>
            </ProductParamsContext.Provider>

            {
                products ?
                    <ProductPreOrderModal show={showPreOrderModal} handleClose={handlePreOrderModalClose} product={currentPreOrderProduct}/>
                    :
                    <></>
            }

        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const productParams = createParamsFromQueries(context.query)
    const startIndex = Math.random() * 980
    return {
        props: {
            products: sampleProducts.slice(startIndex, startIndex + 20),
            pagesCount: 20,
            lastUpdate: 'دیروز ساعت ۱۰ صبح',
            filters: productParams
        }, // will be passed to the page component as props
    }
}

/*

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

*/
