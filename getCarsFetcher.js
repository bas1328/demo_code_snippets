import axios from "axios";
import { getCookie } from "cookies-next";

/**
 * Fetches car data by sending a GET request to the backend API.
 * Sends custom header with initData, extracted from cookies, which is validated by validateHash on the server. 
 * Using custom header resolves the issue with the next server handling cookies from the client.
 *
 * @param {string | string[] | undefined} id - The ID or an array of IDs representing the car(s) to fetch.
 * @returns {Promise} A Promise that resolves with the response from the server.
 */
export const getCarFetcher = async (id) => {
  const initData = getCookie("initData");

  return axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API}/cars/${id}`, {
    withCredentials: true,
    headers: {
      validation_hash: [initData],
    },
  });
};
