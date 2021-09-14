import React from 'react';

import getApiUrl from "../lib/backend-root";
import Layout from "../components/layout/layout";
import NoSearchResult from "../errors/no-search-result";


const staticPath = '/images/products/'
const sampleImage = '/images/products/sample.png'
const API = {
    getCart: getApiUrl('/api/Cart/GetCart'),
    removeCartItem: getApiUrl('/api/Cart/RemoveFromCart'),
    editCartItemCount: getApiUrl('/api/Cart/EditCount'),
    confirmCart: getApiUrl('/api/Cart/ConfirmCart'),

}
export default function Cart() {


    return (
        <Layout title={"شما آفلاین هستید!"}>

            <NoSearchResult mainMassage={"اتصال شما با اینترنت برقرار نیست!"}
                            description={"لطفا اتصال اینترنت خود را برسی کنید."}
            />


        </Layout>
    )
}

