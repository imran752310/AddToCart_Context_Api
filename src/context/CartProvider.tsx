import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Product {
  id: string;
  thumbnail: string;
  title: string;
  mrp: number;
  salePrice: number;
  percentOff: number;
}

type cartItem = {
  product: Product;
  count: number;
};

interface CartContext {
  items: cartItem[];
  updateCart(product: Product, qty: number): void;
  removeFromCart(product: Product): void;
  countAllItems(): number;
  countTotalPrice(): string;
  clearCart(): void;
}

const updateCartInLS = (products: cartItem[]) => {
  localStorage.setItem("cartItems", JSON.stringify(products));
};

const CartContext = createContext<CartContext>({
  items: [],
  updateCart() {},
  removeFromCart() {},
  clearCart() {},
  countAllItems() {
    return 0;
  },
  countTotalPrice() {
    return "0";
  },
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<cartItem[]>([]);

  const removeFromCart = (product: Product) => {
    const newProducts = cartItems.filter(
      (item) => item.product.id !== product.id
    );
    setCartItems(newProducts);
    updateCartInLS(newProducts);
  };

  const clearCart = () => {
    setCartItems([]);
    updateCartInLS([]);
  };

  const updateCart = (product: Product, qty: number) => {
    const finalCartItems = [...cartItems];
    const index = cartItems.findIndex((item) => product.id === item.product.id);

    if (index === -1) {
      finalCartItems.push({ count: qty, product });
    } else {
      finalCartItems[index].count += qty;
    }

    if (finalCartItems[index]?.count === 0) {
      removeFromCart(product);
    } else {
      setCartItems(finalCartItems);
      updateCartInLS(finalCartItems);
    }
  };

  // const removeFromCart = (product: Product, qty: number) => {
  //   const newProducts = cartItems.map((item) => {
  //     if (product.id === item.product.id) {
  //       item.count -= qty;
  //     }

  //     return item;
  //   });

  //   setCartItems(newProducts);
  // };

  const countAllItems = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.count, 0);
  };

  const countTotalPrice = () => {
    return cartItems
      .reduce(
        (total, cartItem) =>
          total + cartItem.product.salePrice * cartItem.count,
        0
      )
      .toFixed(2);
  };

  useEffect(() => {
    const result = localStorage.getItem("cartItems");
    if (result !== null) {
      setCartItems(JSON.parse(result));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        updateCart,
        removeFromCart,
        countTotalPrice,
        countAllItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);

// import {  ReactNode, createContext, useContext, useState } from "react"

// export interface Product {
//     id: string;
//     thumbnail: string;
//     title: string;
//     mrp: number;
//     salePrice: number;
//     percentOff: number;
//   };

//   type cartItem = {
//     product : Product;
//     count : number;
//   }

//   interface CartContext {
//     items : cartItem[]
//     updateCart(product: Product, qty: number) : void,
//     removeFromCart(product: Product) : void,
//     countAllItems(): number,
//     clearCart(): void,
//     countTotalPrice(): string
//   }

//   const updateCartInLS = (products: cartItem) => {
//     localStorage.setItem('cartItems', JSON.stringify(products))
//   }

//   const CartContext = createContext<CartContext>({
//     items: [], 
//     updateCart(){}, 
//     removeFromCart() {},
//     clearCart() {},
//     countAllItems() {
//         return 0
//     },
//     countTotalPrice() {
//         return "0"
//     }
// })

// export const CartProvider = ({children} : {children : ReactNode}) => {
//     const [cartItems, setCartItems] = useState<cartItem[]>([]);

//     const removeFromCart = (product: Product) => {
//         const newProducts = cartItems.filter(
//           (item) => item.product.id !== product.id
//         );
//         setCartItems(newProducts);
//         updateCartInLS(newProducts);
//       };
    
//       const clearCart = () => {
//         setCartItems([]);
//         updateCartInLS([]);
//       };
//     const updateCart = (product: Product, qty: number) => {
//         const finalCartItems = [...cartItems];
//         const index = cartItems.findIndex(
//             (item) => product.id === item.product.id);
    
//         if (index === -1) {
//           finalCartItems.push({ count: qty, product });
//         } else {
//           finalCartItems[index].count += qty;
//         }
    
//         if (finalCartItems[index]?.count === 0) {
//           removeFromCart(product);
//         } else {
//           setCartItems(finalCartItems);
//         }

//     };


//     // const newProduct = cartItems.map(item =>{
//         //     if(product.id === item.product.id){
//         //         item.count -= qty
//         //     }
//         //     return item
//         // });inside in remove from cart
//     // const removeFromCart = (product: Product, qty: number)=>{
        
//     //     const finalCartItems = [...cartItems]
//     //     const index = cartItems.findIndex(item =>product.id === item.product.id);
        
//     //     if(index === -1){
//     //         finalCartItems.push({product, count: qty})
//     //     }else{
//     //         finalCartItems[index].count -= qty
//     //     }
//     // // const newProduct = cartItems.map(item =>{
//     // //         if(product.id === item.product.id){
//     // //             item.count += qty
//     // //         }
//     // //         return item
//     // //     });
//     //     setCartItems(finalCartItems)
//     //     // setCartItems(newProduct)
//     // }

// const countAllItems = () =>{
//     return cartItems.reduce((total, cartItem) => total + cartItem.count, 0)
// }

// const countTotalPrice = () => {
//     return cartItems
//       .reduce(
//         (total, cartItem) =>
//           total + cartItem.product.salePrice * cartItem.count,
//         0
//       )
//       .toFixed(2);
//   };

//   return <CartContext.Provider value={{
//     items : cartItems, 
//     updateCart, 
//     removeFromCart, 
//     countAllItems,
//     countTotalPrice,
//     clearCart
//     }}>
//     {children}
//   </CartContext.Provider>
// }


// export const useCart = () => {
//     return useContext(CartContext)
// } 