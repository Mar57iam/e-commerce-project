import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function useProducts() {



    function geCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
       }
     
       let categoriesInfo =  useQuery ({
       queryKey:['allCategories'],
       queryFn: geCategories,
    //    staleTime: 2000 ,
    //    gcTime: 2000,
    //  select: (data) => data?.data?.data
     })
     
    


    // return categoriesInfo

    }