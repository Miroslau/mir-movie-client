import {createAsyncThunk} from "@reduxjs/toolkit";
import {resultType} from "../../types/moive-type";
import actorType, {actorParams} from "../../types/actor-type";
import actorsAPI from "../../api/actors/actorsAPI";


export const fetchActors = createAsyncThunk<resultType<actorType>, actorParams>(
    "actor/fetchActors",
    async (params, thunkAPI) => {
        try {
            const { limit, page } = params;
            
            const { status, data } = await actorsAPI.getAllActors(limit, page);

            if (status !== 200) {
                return thunkAPI.rejectWithValue(data);
            }

            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)