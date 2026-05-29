import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSelection";
import { StoryStrip } from "@/components/StoryStripe";
import { Footer } from "@/components/Footer";
import { CartSheet } from "@/components/CartSheet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ember & Crumb — Cloud Kitchen" },
      { name: "description", content: "Chef-crafted comfort food, delivered hot in 25 minutes from our cloud kitchen." },
      { property: "og:title", content: "Ember & Crumb — Cloud Kitchen" },
      { property: "og:description", content: "Chef-crafted comfort food, delivered hot in 25 minutes." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <StoryStrip />
        <MenuSection />
      </main>
      <Footer />
      <CartSheet />
    </div>
  );
}
