import { useDispatch, useSelector } from "react-redux";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { addItem, clear, decrement, removeItem, setOpen } from "@/store/cartSlice";
import type { RootState } from "@/store";
import { toast } from "sonner";

export function CartSheet() {
  const dispatch = useDispatch();
  const { items, open } = useSelector((s: RootState) => s.cart);
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const delivery = items.length ? 2.99 : 0;
  const total = subtotal + delivery;

  const checkout = () => {
    toast.success("Order placed! ETA 25–35 min");
    dispatch(clear());
    dispatch(setOpen(false));
  };

  return (
    <Sheet open={open} onOpenChange={(v) => dispatch(setOpen(v))}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="text-xl">Your order</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-20 text-center">
              <p className="text-base font-medium">Your cart is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">Add something delicious from the menu.</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((i) => (
                <li key={i.id} className="flex gap-3 py-4">
                  <img src={i.image} alt={i.name} className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <span className="font-medium">{i.name}</span>
                      <span className="font-semibold">${(i.price * i.qty).toFixed(2)}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">${i.price.toFixed(2)} each</span>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-border">
                        <button onClick={() => dispatch(decrement(i.id))} className="grid h-7 w-7 place-items-center rounded-full hover:bg-muted">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{i.qty}</span>
                        <button onClick={() => dispatch(addItem(i))} className="grid h-7 w-7 place-items-center rounded-full hover:bg-muted">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button onClick={() => dispatch(removeItem(i.id))} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-border px-6 py-5">
            <div className="w-full space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Delivery</span><span>${delivery.toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-semibold text-foreground"><span>Total</span><span>${total.toFixed(2)}</span></div>
              <Button onClick={checkout} className="mt-3 w-full rounded-full" size="lg">Checkout</Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
