import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-[var(--shadow-soft)]">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-4 text-muted-foreground">The page you were looking for could not be found.</p>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="rounded-3xl border border-destructive bg-card p-10 text-center shadow-[var(--shadow-soft)]">
        <h1 className="text-3xl font-semibold text-destructive">Something went wrong</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-full bg-primary px-6 py-3 text-primary-foreground">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { title: "Ember & Crumb — Cloud Kitchen" },
      { name: "description", content: "Chef-crafted comfort food, delivered hot in 25 minutes from our cloud kitchen." },
      { property: "og:title", content: "Ember & Crumb — Cloud Kitchen" },
      { property: "og:description", content: "Chef-crafted comfort food, delivered hot in 25 minutes." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap" />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Outlet />
        <Toaster richColors position="top-center" />
      </Provider>
    </QueryClientProvider>
  );
}
