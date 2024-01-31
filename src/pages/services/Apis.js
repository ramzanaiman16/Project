import {commonrequest} from "./ApiCall"
import {BASE_URL} from "./helper"


export const register = async(data, header)=>{
    return await commonrequest("POST",`${BASE_URL}/register`,data, header);
}

export const login = async(data, header)=>{
    return await commonrequest("POST",`${BASE_URL}/login`,data, header);
}


export const editfunc = async(id,data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/edit/${id}`,data,header);
}

export const getSingleImage = async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/${id}`,"");
}