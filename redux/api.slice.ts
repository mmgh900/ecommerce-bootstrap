// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import ICategory from "../types/ICategory";
import IProduct from "../types/IProduct";
import {ProductsParamsType} from "../lib/products";
import ICartItem from "../types/ICartItem";
import ErrorCode from "../data/error-codes";
import getApiUrl from "../lib/backend-root";
import queryString from 'query-string'
import IUser from "../types/IUser";
// Define a service using a base URL and expected endpoints
export type ProductsDataType =
    {
        products: Array<IProduct>
        pagesCount: number
    }
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:10987/api/',
        credentials: 'include', // This allows server to set cookies
    }),
    tagTypes: ['Cart', 'Products', 'ProductGroup'],
    endpoints: (builder) => ({
        getProductGroups: builder.query<Array<ICategory>, void>({
            query: () => 'ProductGroup/GetProductGroups',
            transformResponse: (response: { errorCode: ErrorCode, data: Array<ICategory> }) => response.data,
            providesTags: (result, error, arg) => [{type: 'ProductGroup', arg}]
        }),
        getCart: builder.query<Array<ICartItem>, void>({
            query: () => 'Cart/GetCart',
            transformResponse: (response: { errorCode: ErrorCode, data: Array<ICartItem> }) => response.data,
            providesTags: (result, error, arg) => [{type: 'Cart', arg}]
        }),
        getProducts: builder.query<ProductsDataType, ProductsParamsType>({
            query: (params) => `Product/GetProducts?${queryString.stringify(params)}`,
            transformResponse: (response: { errorCode: ErrorCode, data: ProductsDataType }) => response.data,
            providesTags: (result, error, arg) => [{type: 'Products', arg}]
        }),
        getDetails: builder.query<IProduct, string>({
            query: (id) => `Product/GetDetails?id=${id}`,
            transformResponse: (response: { errorCode: ErrorCode, data: IProduct }) => response.data,
            providesTags: (result, error, arg) => [{type: 'Products', arg}]
        }),
        getProductsUpdateDateTime: builder.query<string, void>({
            query: (params) => `Product/GetUpdateDateTime`,
            transformResponse: (response: { errorCode: ErrorCode, data: string }) => response.data,
        }),
        getGiftCode: builder.query(
            {
                query: (patch: { GiftCode: string }) => ({
                    url: 'Cart/GetGiftAmount',
                    method: "POST",
                    body: patch
                }),
                transformResponse: (response: { errorCode: ErrorCode, data: number }) => response.data,
            }
        ),
        getUser: builder.mutation(
            {
                query: (patch) => ({
                    url: 'User/Login',
                    method: 'POST',
                    body: patch
                }),
                transformResponse: (response: { errorCode: ErrorCode, data: IUser }) => response.data,
            }
        ),
        addToCart: builder.mutation(
            {
                query: (patch: { ProductId: string, Count: number }) => ({
                    url: 'Cart/Add',
                    method: 'POST',
                    body: patch
                }),
                invalidatesTags: ['Cart', 'Products'],
                transformResponse: (response: { errorCode: ErrorCode, data: any }) => !response.errorCode,
            }
        ),
        removeFromCart: builder.mutation(
            {
                query: (patch: { ProductId: string }) => ({
                    url: 'Cart/Remove',
                    method: 'POST',
                    body: patch
                }),
                invalidatesTags: ['Cart', 'Products'],
                transformResponse: (response: { errorCode: ErrorCode, data: any }) => !response.errorCode,
            }
        ),
        confirmCart: builder.mutation(
            {
                query: (patch: { GiftCode: string, SettleDays: number }) => ({
                    url: 'Cart/Confirm',
                    method: 'POST',
                    body: patch
                }),
                invalidatesTags: ['Cart', 'Products'],
                transformResponse: (response: { errorCode: ErrorCode, data: { giftAmount: number } }) => response.data.giftAmount,
            }
        )
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetCartQuery,
    useAddToCartMutation,
    useGetProductsQuery,
    useGetProductsUpdateDateTimeQuery,
    useLazyGetCartQuery,
    useRemoveFromCartMutation,
    useConfirmCartMutation,
    useLazyGetGiftCodeQuery,
    useGetProductGroupsQuery,
    useGetDetailsQuery
} = api