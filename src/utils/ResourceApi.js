 import { axiosInstance } from "../lib/axios"
 import { toast } from "react-toastify";
 import {CREATE_RESOURCE,CREATE_RESOURCE_FAILURE}  from '../constants/Resource.constant'

 export const createResource= async ( description,
         topicId,
         token,Url)=>{
    try{        
    await axiosInstance.post(
      `create-resource/${topicId}`,
      {
        description:description,
        Url:Url,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
 toast.success(CREATE_RESOURCE);
}
catch(error){
console.log(error);
 toast.error(CREATE_RESOURCE_FAILURE);
}
}

export const handleClickPost=async(navigate)=>{
  navigate('/dashboard/post')
}