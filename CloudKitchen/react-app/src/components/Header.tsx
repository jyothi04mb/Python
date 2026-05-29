import { useSelector, useDispatch } from "react-redux";
import { ShoppingBag, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setOpen } from "@/store/cartSlice";
import type { RootState } from "@/store";

export function Header() {
  const dispatch = useDispatch();
  const count = useSelector((s: RootState) => s.cart.items.reduce((a, i) => a + i.qty, 0));

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground">
            <ChefHat className="h-5 w-5" />
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ember & Crumb
          </span>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#menu" className="hover:text-foreground transition">Menu</a>
          <a href="#story" className="hover:text-foreground transition">Our Story</a>
          <a href="#hours" className="hover:text-foreground transition">Hours</a>
        </nav>
        <Button onClick={() => dispatch(setOpen(true))} variant="default" className="relative gap-2 rounded-full">
          <ShoppingBag className="h-4 w-4" />
          <span>Cart</span>
          {count > 0 && (
            <span className="ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1.5 text-xs font-semibold text-accent-foreground">
              {count}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}
