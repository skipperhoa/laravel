import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const cart = get().cart
        const exist = cart.find(item => item.id === product.id)

        if (exist) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({
            cart: [...cart, { ...product, quantity: 1 }]
          })
        }
      },

      removeFromCart: (id) => {
        set({
          cart: get().cart.filter(item => item.id !== id)
        })
      },

      increaseQuantity: (id) => {
        set({
          cart: get().cart.map(item =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        })
      },

      decreaseQuantity: (id) => {
        const cart = get().cart
        const item = cart.find(i => i.id === id)

        if (item?.quantity === 1) {
          set({
            cart: cart.filter(i => i.id !== id)
          })
        } else {
          set({
            cart: cart.map(i =>
              i.id === id
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
          })
        }
      },
    }),
    {
      name: 'cart-storage', // key trong localStorage
    }
  )
)

export default useCartStore
