import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "./store";
import ICategory, {CatType, getCatTypePrefix, getCatTypeUtl} from "../types/ICategory";
import getApiUrl from "../lib/backend-root";

// Define a type for the slice state
interface UserState {
    cars: Array<ICategory>,
    parts: Array<ICategory>,
    brands: Array<ICategory>,
}

// Define the initial state using that type
const initialState = {
    [CatType.CAR]: [],
    [CatType.BRANDS]: [],
    [CatType.PART]: [],
    loading: false

}
export const fetchCategoriesByType = createAsyncThunk('categories/fetchCategoriesByType',
    async (type:CatType) => {
        const response = await fetch(getApiUrl(getCatTypeUtl(type)), {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({})
        })
        const data = await response.json()
        return data.data.map(item =>
            ({
                name: item.name,
                id: item.id,
                image: `/images/productGroups/${getCatTypePrefix(type)}_${item.id}.png`,
                type: type
            })
        )
    }
)
export const catSlice = createSlice({
    name: 'categories',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategoriesByType.fulfilled, (state, { payload }) => {
            state[payload[0].type] = payload
        })
        builder.addCase(fetchCategoriesByType.pending, (state, action) => {
            state.loading = true
        })

    },
})


export default catSlice.reducer