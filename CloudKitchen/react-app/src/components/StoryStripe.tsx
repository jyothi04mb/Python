import { Clock, Truck, Sparkles } from "lucide-react";

const items = [
  { icon: Clock, title: "25-min delivery", body: "From our kitchen to your door, fast." },
  { icon: Sparkles, title: "Chef-led menu", body: "Designed weekly by our head chefs." },
  { icon: Truck, title: "Free over $30", body: "Complimentary delivery in zone." },
];

export function StoryStrip() {
  return (
    <section id="story" className="border-y border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-3 sm:px-6">
        {items.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
