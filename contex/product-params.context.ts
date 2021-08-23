import { createContext, useContext } from "react"
import {defaultProductParams, ProductsParamsType} from "../lib/products";

export type ProductParamsContextType = {
    productsPrams: ProductsParamsType
    setManualParams:(productsPrams: ProductsParamsType) => void
}

export const ProductParamsContext = createContext<ProductParamsContextType>({
    productsPrams: defaultProductParams, // set a default value
    setManualParams: () => {},
})
export const useProductParamsContext = () => useContext(ProductParamsContext)