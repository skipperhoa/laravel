import React from 'react'
import NavMenu from '../components/ui/app-nav';
import { useConfig } from '@/hooks/useConfig';
import { FaCartArrowDown } from "react-icons/fa";
import { IoMdAddCircle , IoMdRemoveCircle  } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import  useCartStore  from '@/stores/cartStore';

export default function Cart() {
  const { cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore()
  const translations = useConfig();
  const translation_product = translations.get('translations.product');

  return (
     <div className="">
        <NavMenu />

                <div className="max-w-4xl mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="w-full">
                       <div className='flex flex-row items-center justify-center px-5'>
                            <label className='font-bold text-center text-3xl py-5 block'>{translation_product.list_carts}</label>

                       </div>
                        <div className="">
                            <ul className="list-disc grid grid-cols-3 gap-6 p-6">
                                {
                                    cart.map((item) => (
                                        <li key={item.id} className='list-none'>
                                            <div>
                                                <div className="w-full h-[100px] bg-gray-100 rounded-xl flex flex-col items-center justify-center mb-4">
                                                   <label>{item.id}</label>
                                                </div>
                                                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                                                <p className="text-sm mb-1">{translation_product.Price}: ${item.price}</p>
                                                <p className="text-sm mb-1">{translation_product.description}: {item.description}</p>
                                                <div className='flex flex-row items-center justify-between'>
                                                    <div className='flex flex-row items-center justify-center gap-2'>
                                                        <IoMdAddCircle className='cursor-pointer' size={25} onClick={() => increaseQuantity(item.id)}/>
                                                        <span>{item.quantity}</span>
                                                        <IoMdRemoveCircle className='cursor-pointer' size={25} onClick={() => decreaseQuantity(item.id)}/>
                                                    </div>
                                                    <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => removeFromCart(item.id)}>
                                                        <MdDeleteForever size={20}/>
                                                    </button>
                                                </div>

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
