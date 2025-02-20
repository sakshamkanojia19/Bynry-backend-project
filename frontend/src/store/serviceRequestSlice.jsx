import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Correctly creating fetchServiceRequests using createAsyncThunk
export const fetchServiceRequests = createAsyncThunk(
  "serviceRequests/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await axios.get("http://127.0.0.1:8000/api/service-requests/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data; // ✅ Returns data properly
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch service requests");
    }
  }
);

const serviceRequestSlice = createSlice({
  name: "serviceRequests",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceRequests.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchServiceRequests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchServiceRequests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default serviceRequestSlice.reducer;
