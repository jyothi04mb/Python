import { Button } from "@/components/ui/button";

const heroImageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImageUrl}
          alt="A spread of vibrant gourmet bowls"
          className="h-full w-full object-cover"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      </div>
      <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-24 sm:px-6 sm:pb-24">
        <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-white backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Cloud Kitchen · Open now
        </span>
        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] text-white sm:text-7xl">
          Crafted dishes, <em className="italic text-accent">delivered hot</em> to your door.
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
          Six chefs. One kitchen. A menu of carefully built comfort food made the moment you tap order.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full px-6">
            <a href="#menu">Order now</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-white/10 px-6 text-white backdrop-blur hover:bg-white/20 hover:text-white">
            <a href="#story">Our story</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
