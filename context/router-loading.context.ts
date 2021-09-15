import { createContext, useContext } from "react"
export type RouterLoadingType = {
    isRouterLoading: boolean
    setRouterLoading:(c: boolean) => void
}
export const RouterLoading = createContext<RouterLoadingType>({
    isRouterLoading: false, // set a default value
    setRouterLoading: () => {},
})
export const useRouterLoading = () => useContext(RouterLoading)