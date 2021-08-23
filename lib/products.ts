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
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(params)
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