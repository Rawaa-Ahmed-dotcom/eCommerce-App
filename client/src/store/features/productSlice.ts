import {createSlice , type PayloadAction} from "@reduxjs/toolkit";

interface productState {
    page : number,
    limit : number,
    category? : string,
    sort? : string,
    price? : {
        min? : number,
        max? : number
    },
    keyword? : string
}
const initialState : productState = {
    page : 1,
    limit  : 2
} 
interface price {
    min : number,
    max : number
}

const productSlice = createSlice({
    name : "productsFilter",
    initialState,
    reducers : {
        setCategory : (state , action : PayloadAction<string>) => {
            state.category = action.payload;
            state.page = 1
        },
        setPage : (state ,action : PayloadAction<number>) => {
            state.page = action.payload;
        },
        sortBy : (state , action : PayloadAction<string>) => {
            state.sort = action.payload
        },
        setPrice : (state , action : PayloadAction<price>) => {
            if (!state.price) {
                state.price = {};
            }
            state.price.min = action.payload.min;
            state.price.max = action.payload.max;
        },
        setKeyword : (state , action : PayloadAction<string>) => {
            state.keyword = action.payload;
        },
        resetFilters : () => initialState
    }
})

export const {setCategory , setPage , sortBy , setPrice , setKeyword , resetFilters} = productSlice.actions;
export default productSlice.reducer;