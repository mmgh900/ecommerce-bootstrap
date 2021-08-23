import { createContext, useContext } from "react"
export type FocusProviderType = {
    isFocused: boolean
    setFocused:(c: boolean) => void
}
export const FocusProvider = createContext<FocusProviderType>({
    isFocused: false, // set a default value
    setFocused: () => {},
})
export const useFocusProvider = () => useContext(FocusProvider)