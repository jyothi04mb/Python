import React from 'react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from './store'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MenuSection } from './components/MenuSelection'
import { StoryStrip } from './components/StoryStripe'
import { Footer } from './components/Footer'
import { CartSheet } from './components/CartSheet'
import { Toaster } from './components/ui/sonner'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Hero />
            <StoryStrip />
            <MenuSection />
          </main>
          <Footer />
          <CartSheet />
          <Toaster richColors position="top-center" />
        </div>
      </Provider>
    </QueryClientProvider>
  )
}
