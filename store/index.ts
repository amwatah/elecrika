import { proxy } from "valtio";

interface CartItem {
  id: string;
  deviceName: string;
  price: number;
  imageUrl: string;
  stocked: number;
  quantity: number;
}

type Cart = {
  electronicsInCart: CartItem[];
  addItemtoCart: (itemToAdd: CartItem) => void;
  removeItemFromCart: (itemId: string) => void;
};

export const GlobalStore = proxy<Cart>({
  electronicsInCart: [],
  addItemtoCart: (itemToAdd: CartItem) => {
    GlobalStore.electronicsInCart = [
      ...GlobalStore.electronicsInCart,
      itemToAdd,
    ];
  },
  removeItemFromCart: (itemToRemove: string) => {
    GlobalStore.electronicsInCart.filter((itemInCart) => {
      return itemInCart.id !== itemToRemove;
    });
  },
});
