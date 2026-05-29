import { useDispatch } from "react-redux";
import { Plus, Flame, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addItem, type MenuItem } from "@/store/cartSlice";
import { toast } from "sonner";

export function MenuCard({ item }: { item: MenuItem }) {
  const dispatch = useDispatch();

  const onAdd = () => {
    dispatch(addItem(item));
    toast.success(`${item.name} added to cart`);
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {item.spicy && (
            <span className="flex items-center gap-1 rounded-full bg-destructive/90 px-2 py-0.5 text-[10px] font-medium uppercase text-destructive-foreground">
              <Flame className="h-3 w-3" /> Spicy
            </span>
          )}
          {item.veg && (
            <span className="flex items-center gap-1 rounded-full bg-accent/90 px-2 py-0.5 text-[10px] font-medium uppercase text-accent-foreground">
              <Leaf className="h-3 w-3" /> Veg
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight">{item.name}</h3>
          <span className="shrink-0 text-base font-semibold text-primary">${item.price.toFixed(2)}</span>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        <Button onClick={onAdd} size="sm" className="mt-1 w-full gap-2 rounded-full">
          <Plus className="h-4 w-4" /> Add to cart
        </Button>
      </div>
    </article>
  );
}
