import {User} from "@/types";
import axios from "axios";

// This is the function that will be called by React Query
export const fetchRandomUser = async (): Promise<User> => {
    const {data} = await axios.get(
        "https://randomuser.me/api/?results=1&nat=us"
    );
    // The API returns an array, we just need the first user
    if (data.results && data.results.length > 0) {
        return data.results[0];
    }
    throw new Error("User not found");
};
