import { instance } from "../utils/axios"



export const getProductsService = async ()=>{
  const response = await instance.get();
  console.log('repsonse :>> ', response);
}