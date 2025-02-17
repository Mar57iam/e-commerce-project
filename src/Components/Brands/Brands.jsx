import React, { useState } from 'react'
import style from './Brands'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Brands() {
    const [showModal, setShowModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);

    function getBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }

    let { data, isError, error, isLoading } = useQuery({
        queryKey: ['allBrands'],
        queryFn: getBrands,
        staleTime: 2000,
        gcTime: 2000,
        select: (data) => data?.data?.data,
    });

    console.log(data);

    const handleBrandClick = (brand) => {
        setSelectedBrand(brand);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBrand(null);
    };

    return (
        <>
            <h2 className='text-emerald-600 text-3xl font-bold text-center'>All Brands</h2>

            <div className="row gap-5 justify-center">
                {data?.map((brand) => {
                    return (
                        <div 
                            className="max-w-s bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:shadow-emerald-200 hover:transition-shadow md:justify-center"
                            key={brand.id}
                            onClick={() => handleBrandClick(brand)}
                        >
                            <img className="p-8 rounded-t-lg" src={brand.image} alt="product image" />

                            <div className="px-5 pb-5">
                                <h3 className='text-xl font-semibold text-center'>{brand.name}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>

            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white p-6 rounded-lg"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <h3 className="text-2xl font-semibold">{selectedBrand.name}</h3>
                        <img className="w-full h-auto" src={selectedBrand.image} alt={selectedBrand.name} />
                        <p className="mt-4">{selectedBrand.description || "No description available."}</p>
                        <button
                            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}