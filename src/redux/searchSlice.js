import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchSearch = createAsyncThunk("search/fecthSearch", async (description, {rejectWithValue}) => {
    try{
        const { data} = await axios.get(`https://api.chucknorris.io/jokes/search?query=${description}`) 
        return data
    } catch (error){
        rejectWithValue(error.response.data)
    }
})

const searchSlice = createSlice({
    name: 'search',
    initialState:{
        data: [],
        isSuccess: false,
        message: "",
        loading: false
    },
    extraReducers: {
        [fetchSearch.pending]: (state) => {
            state.loading = true
        },
        [fetchSearch.fulfilled]: (state, {payload}) => {
            state.loading = false,
            state.data = payload,
            state.isSuccess = true
        },
        [fetchSearch.rejected]: (state, {payload}) => {
            state.loading = false,
            state.message = payload,
            state.isSuccess = false
        }
    }
  })

  export default searchSlice.reducer