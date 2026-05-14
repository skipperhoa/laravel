import React from 'react'
import { useConfig } from '@/hooks/useConfig';
import { FaCartArrowDown } from "react-icons/fa";
import  useCartStore  from '@/stores/cartStore';
export default function Product({ products }) {
  const { cart, addToCart } = useCartStore()
  const translations = useConfig();
  const translation_product = translations.get('translations.product');

  return (
     <div className="">
                <div className="max-w-4xl mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="w-full">
                       <div className='flex flex-row items-center justify-center px-5'>
                            <label className='font-bold text-center text-3xl py-5 block'>{translation_product.title}</label>

                       </div>
                        <div className="">
                            <ul className="list-disc grid grid-cols-3 gap-6 p-6">
                                {
                                    products.map((product) => (
                                        <li key={product.id} className='list-none'>
                                            <div>
                                                <div className="w-full h-[100px] bg-gray-100 rounded-xl flex flex-col items-center justify-center mb-4">
                                                   <label>{product.id}</label>
                                                </div>
                                                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                                                <p className="text-sm mb-1">{translation_product.Price}: ${product.price}</p>
                                                <p className="text-sm mb-1">{translation_product.description}: {product.description}</p>
                                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => addToCart(product)}>
                                                    {translation_product.add_to_cart}
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>

                        </div>
                    </div>
                </div>

    </div>
  )
}
