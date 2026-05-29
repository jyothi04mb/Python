import type { MenuItem } from "@/store/cartSlice";

export const categories = ["All", "Signature", "Bowls", "Asian", "Street", "Sweets"] as const;

const placeholderImages = {
  burger: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=900&q=80",
  pizza: "https://images.unsplash.com/photo-1548365328-1f6c56f34e2f?auto=format&fit=crop&w=900&q=80",
  bowl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
  ramen: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=900&q=80",
  tacos: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f12?auto=format&fit=crop&w=900&q=80",
  dessert: "https://images.unsplash.com/photo-1542223616-bc5572c595a3?auto=format&fit=crop&w=900&q=80",
};

export const menu: MenuItem[] = [
  { id: "1", name: "Smash House Burger", description: "Double beef, aged cheddar, house sauce, brioche.", price: 12.5, category: "Signature", image: placeholderImages.burger },
  { id: "2", name: "Wood-Fired Margherita", description: "San Marzano, fior di latte, basil, 00 flour crust.", price: 14, category: "Signature", image: placeholderImages.pizza, veg: true },
  { id: "3", name: "Harvest Grain Bowl", description: "Quinoa, roasted yam, avocado, tahini-lemon dressing.", price: 11, category: "Bowls", image: placeholderImages.bowl, veg: true },
  { id: "4", name: "Tonkotsu Ramen", description: "24-hour pork broth, ramen egg, scallions, bamboo.", price: 15, category: "Asian", image: placeholderImages.ramen, spicy: true },
  { id: "5", name: "Crispy Chili Tacos", description: "Buttermilk-fried chicken, lime crema, cilantro.", price: 10.5, category: "Street", image: placeholderImages.tacos, spicy: true },
  { id: "6", name: "Molten Chocolate Cake", description: "Warm dark chocolate, vanilla bean ice cream, berries.", price: 8, category: "Sweets", image: placeholderImages.dessert, veg: true },
];
