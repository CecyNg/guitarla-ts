import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db.js'
import type { GuitarT, CartItem } from '../types/index.js'


export const useCart = () => {

    const initialCart = () :CartItem[] => {
      const localStorageCart = localStorage.getItem('cart')
      return localStorageCart ? JSON.parse(localStorageCart) : []
        
      }
      const [data, setData] = useState(db)
      const [cart, setCart] = useState(initialCart)
    
      const MAX_ITEMS = 5
      const MIN_ITEMS = 1
    
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])
      
      function addToCart(item : GuitarT){
        const itemExists = cart.findIndex(guitar => guitar.id === item.id) 
        if(itemExists >= 0) {
            if(cart[itemExists].quantity >= MAX_ITEMS){
                return
            }
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        }else{
            const newItem : CartItem = {...item, quantity : 1}
            setCart([...cart, newItem]);
        }
        
      }
    
      function removeFromCart(id : GuitarT['id']){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
    
      function increaseQuantity(id : GuitarT['id'] ){
        const updatedCart = cart.map(item => { 
            if(item.id === id && item.quantity  < MAX_ITEMS){
                return{
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item 
        }) 
        setCart(updatedCart)
      }
    
      function decreaseQuantity(id : GuitarT['id']){
        const updatedCart = cart.map(item => { 
            if(item.id === id && item.quantity  > MIN_ITEMS){
              return{
                ...item,
                quantity: item.quantity - 1
              }
            }else{
              return{
                ...item,
                quantity: 0
             }
            }
        }) 

        const filteredCart = updatedCart.filter(item => item.quantity > 0)

        setCart(filteredCart)
      }
    
      function ClearCart(){
        setCart([])
      }

    
      const isEmpty = useMemo(() => cart.length === 0, [cart]) 
      const cartTotal = useMemo (() => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart])
    
      return{
          data,
          cart,
          addToCart,
          removeFromCart,
          decreaseQuantity,
          increaseQuantity,
          ClearCart,
          isEmpty,
          cartTotal,
      }
        
    
}
