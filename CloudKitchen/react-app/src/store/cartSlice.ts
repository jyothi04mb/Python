import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  spicy?: boolean;
  veg?: boolean;
};

export type CartItem = MenuItem & { qty: number };

type CartState = {
  items: CartItem[];
  open: boolean;
};

const initialState: CartState = { items: [], open: false };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<MenuItem>) {
      const found = state.items.find((i) => i.id === action.payload.id);
      if (found) found.qty += 1;
      else state.items.push({ ...action.payload, qty: 1 });
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    decrement(state, action: PayloadAction<string>) {
      const found = state.items.find((i) => i.id === action.payload);
      if (!found) return;
      found.qty -= 1;
      if (found.qty <= 0) state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clear(state) {
      state.items = [];
    },
    setOpen(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
  },
});

export const { addItem, removeItem, decrement, clear, setOpen } = cartSlice.actions;
export default cartSlice.reducer;
