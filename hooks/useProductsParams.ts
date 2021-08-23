import {useEffect, useState} from "react";
import {defaultProductParams, ProductItemView, ProductsParamsType} from "../lib/products";
import {Machine} from "xstate";
import {useMachine} from '@xstate/react';
import {useRouter} from "next/router";

export default function useProductsParams() {
    const productsParamsMachine = Machine({
        id: 'productsParams',
        initial: 'first_query',
        states: {
            first_query: {
                on: {
                    QUERY_CHANGE: 'normal_query'
                }
            },
            manual_query: {
                on: {
                    DEACTIVATE_MANUAL: 'normal_query',
                    QUERY_CHANGE: 'manual_query'
                }
            },
            normal_query: {
                on: {
                    ACTIVE_MANUAL: 'manual_query',
                    QUERY_CHANGE: 'normal_query'
                }
            }
        }
    });

    const router = useRouter()
    const [productsPrams, setParamsRaw] = useState<ProductsParamsType>(defaultProductParams)


    /**
     * This function format queries from address bar to parameters format
     * @param queries
     */
    const createParamsFromQueries = (queries) => {
        /**
         * Because queries are strings, we need to convert them to right type (Array of numbers)
         * @param value This is the query params that wants to be converted to array of numbers
         */
        const formatCategoryIdArray = (value: Array<string> | string | undefined) => {
            if (Array.isArray(value)) {
                return value.map(item => Number.parseInt(item))
            } else if (typeof value == "string" && value != "") {
                const array = []
                array.push(Number.parseInt(value))
                return array
            } else {
                return []
            }
        }
        /**
         * Because queries are strings, we need to convert them to right type (ProductItemView type)
         */
        const formatProductView = () => {
            if (queries.ProductView) {
                return parseInt(queries.ProductView as string) as ProductItemView
            } else {
                return defaultProductParams.ProductView
            }
        }

        let newParams: ProductsParamsType = {
            ...queries,
            Car: formatCategoryIdArray(queries.Car),
            Company: formatCategoryIdArray(queries.Company),
            Section: formatCategoryIdArray(queries.Section),
            ProductView: formatProductView()
        }
        if (newParams.Page == undefined) {
            newParams = {
                ...newParams,
                Page: 1
            }
        }
        if (queries.OnlyExists != undefined) {
            newParams = {
                ...newParams,
                OnlyExists: queries.OnlyExists == 'true'
            }
        }
        if (queries.OnlyLastInputs != undefined) {
            newParams = {
                ...newParams,
                OnlyLastInputs: queries.OnlyLastInputs == 'true'
            }
        }
        return newParams
    }

    /**
     * This function should be used to manually set parameters without loading parameters again from queries
     * @param productsPrams Params that we want to be set
     */
    const setManualParams = (productsPrams: ProductsParamsType) => {
        /**
         * After we set the parameters and updated products and queries,
         * we allow to load params from queries for other links
         */
        setParamsRaw(productsPrams)
        router.push(
            {
                query: {...productsPrams}
            }, undefined, {shallow: true}
        )
    }

    /**
     * Based on @link https://nextjs.org/docs/advanced-features/automatic-static-optimization,
     * the first time the page renders, it has a router.queries of {} even if the page has some queries.
     * So we don't want to update params from queries until the right queries are fully loaded which is after the second change of queries
     */
    useEffect(()=> {
        setParamsRaw(createParamsFromQueries(router.query))
        console.log(router.query)
    }, [router.query])


    return {
        productsPrams,
        setManualParams
    }
}