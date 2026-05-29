import { useMemo, useState } from "react";
import { menu, categories } from "@/data/menu";
import { MenuCard } from "./MenuCard";
import { cn } from "@/lib/utils";

export function MenuSection() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(
    () => (active === "All" ? menu : menu.filter((m) => m.category === active)),
    [active],
  );

  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">The Menu</p>
          <h2 className="mt-2 text-4xl font-semibold sm:text-5xl">Made fresh, batch by batch</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition",
                active === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
