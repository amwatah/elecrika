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
  increaseQuantity: (itemID: string) => void;
  decreaseQuantity: (itemID: string) => void;
};

export const GlobalStore = proxy<Cart>({
  electronicsInCart: [],
  addItemtoCart: (itemToAdd: CartItem) => {
    GlobalStore.electronicsInCart = [
      ...GlobalStore.electronicsInCart,
      itemToAdd,
    ];
  },
  removeItemFromCart: (itemId: string) => {
    const newItems = GlobalStore.electronicsInCart.filter((itemInCart) => {
      return itemInCart.id !== itemId;
    });
    GlobalStore.electronicsInCart = newItems;
  },
  increaseQuantity: (itemID: string) => {
    const itemToUpdate = GlobalStore.electronicsInCart.find(
      (itemInCart) => itemInCart.id === itemID
    );
    if (itemToUpdate) {
      itemToUpdate.quantity++;
    }
  },
  decreaseQuantity: (itemID: string) => {
    const itemToUpdate = GlobalStore.electronicsInCart.find(
      (itemInCart) => itemInCart.id === itemID
    );
    if (itemToUpdate) {
      itemToUpdate.quantity--;
    }
  },
});
