import getApiUrl from "./backend-root";
import IProduct from "../types/IProduct";


export enum ProductSortOrder {
    Newest = 1,
    Alphabet = 2,
    Cheapest = 3,
    MostExpensive = 4
}
export enum ProductItemView {
    CARD,
    CARD_NO_IMAGE,
    PRE_ORDER_VIEW,
    CART_VIEW
}
export type ProductsParamsType =  {
    SearchText?: string
    OnlyExists?: boolean,
    OnlyLastInputs?: boolean,
    OnlyLastInputsLimit?: boolean,

    Company?: Array<number>
    Car?: Array<number>
    Section?: Array<number>
    SortOrder?: ProductSortOrder,
    Page?: number

    ProductView?: ProductItemView
}
export const defaultProductParams: ProductsParamsType = {
    Car: [],
    Section: [],
    Company: [],
    Page: 1,
    ProductView: ProductItemView.CARD
}

export async function getProducts(params: ProductsParamsType): Promise<[Array<IProduct>, number]> {


    const response = await fetch(getApiUrl("/api/Product/GetProducts"), {
        method: 'GET',

    })


    const data = await response.json()

    if (data.errorCode) {
        return [[], 1]
        /**
         * This is for when the sever is down and you want to test the app anyway
         */
        // return [sampleProductList, 1]
    } else {
        return [
            data.data.products,
            data.data.pagesCount
        ]
    }

}

/**
 * This function format queries from address bar to parameters format
 * @param queries
 */
export const createParamsFromQueries = (queries) => {

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