// Need to use the React-specific entry point to import createApi
import {createApi} from '@reduxjs/toolkit/query/react'
import ICategory from "../types/ICategory";
import IProduct from "../types/IProduct";
import {ProductsParamsType} from "../lib/products";
import ICartItem from "../types/ICartItem";
import ErrorCode from "../data/error-codes";
import getApiUrl, {pathName} from "../lib/backend-root";
import queryString from 'query-string'
import IUser from "../types/IUser";
import {RootState} from "./store";
import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import {setCurrentUser} from "./user.reducer";


const baseQuery = fetchBaseQuery({
    baseUrl: `${pathName}/api/`,
    prepareHeaders: (headers, {getState}) => {
        // By default, if we have a token in the store, let's use that for authenticated requests
        const user = (getState() as RootState).user.currentUser
        if (user) {
            headers.set('authorization', `Bearer ${user.jwtToken}`)
        }
        return headers
    },
    credentials: 'include', // This allows server to set cookies
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs,
    unknown,
    FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        console.log('user is unauthorized')
        // try to get a new token
        const refreshResult = await baseQuery({url: 'user/RefreshToken', method: 'POST'}, api, extraOptions)
        // @ts-ignore
        if (refreshResult.data && !refreshResult.data.errorCode) {
            // store the new token
            api.dispatch(setCurrentUser(refreshResult.data))
            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(setCurrentUser(null))
        }
    }
    return result
}
export type ProductsDataType =
    {
        products: Array<IProduct>
        pagesCount: number
    }

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Cart', 'Products', 'ProductGroup', 'User'],
    endpoints: (builder) => ({
        login: builder.mutation(
            {
                query: (patch: { UserName: string, Password: string }) => ({
                    url: 'user/login',
                    method: 'POST',
                    body: patch
                }),
                invalidatesTags: ['Cart', 'Products'],
                transformResponse: (response: { errorCode: ErrorCode, data: IUser }) => response,
            }
        ),
        refreshToken: builder.mutation<IUser, void>(
            {
                query: () => ({
                    url: '/user/RefreshToken',
                    method: 'POST',
                }),
            }
        ),

        logout: builder.mutation(
            {
                query: () => ({
                    url: '/user/logout',
                    method: 'POST'
                }),
                invalidatesTags: ['Cart', 'Products'],
                transformResponse: (response: { errorCode: ErrorCode }) => !response.errorCode,
            }
        ),
        getProductGroups: builder.query<Array<ICategory>, void>({
            query: () => 'ProductGroup/GetProductGroups',
            transformResponse: (response: { errorCode: ErrorCode, data: Array<ICategory> }) => response.data,
            providesTags: (result, error, arg) => [{type: 'ProductGroup', arg}]
        }),
        getCart: builder.query<Array<ICartItem>, void>({
            query: () => ({
                url: 'Cart/GetCart',
                validateStatus: (response, result) => {

                    return response.status === 200 && !result.errorCode
                }

            }),
            transformResponse: (response: { errorCode: ErrorCode, data: Array<ICartItem> }) => response.data,
            providesTags: (result, error, arg) => [{type: 'Cart', arg}],

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
        ),


    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetCartQuery,
    useAddToCartMutation,
    useLazyGetCartQuery,
    useRemoveFromCartMutation,
    useConfirmCartMutation,
    useLazyGetGiftCodeQuery,
    useGetProductGroupsQuery,
    useGetDetailsQuery,
    useLoginMutation,
    useLogoutMutation,
    useRefreshTokenMutation
} = api

