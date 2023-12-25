import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { productEndpoints } from "../apis";

const { GET_ALL_PRODUCT_API, CREATE_PRODUCT_API } = productEndpoints;

export function addProductDetails(data, navigate) {
  return async () => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", CREATE_PRODUCT_API, data, {
        "Content-Type": "multipart/form-data",
      });
      console.log("CREATE PRODUCT API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Product Create  Successful");
      navigate("/products");
    } catch (error) {
      console.log("CREATE PRODUCT API ERROR............", error);
      toast.error("Create Product Failed");
    }
    toast.dismiss(toastId);
  };
}

export const listAllProducts = async () => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_PRODUCT_API);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Product");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_PRODUCT_API API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
