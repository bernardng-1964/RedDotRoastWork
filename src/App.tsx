import React, { useState } from 'react';
import { UserMode, CartItem } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BeanInventory } from './components/BeanInventory';
import { B2BCommercial } from './components/B2BCommercial';
import { GiftBuilder } from './components/GiftBuilder';
import { CoffeeQuiz } from './components/CoffeeQuiz';
import { LogisticsBar } from './components/LogisticsBar';
import { CartDrawer } from './components/CartDrawer';
import { WholesaleModal } from './components/WholesaleModal';
import { BlueprintModal } from './components/BlueprintModal';
import { Footer } from './components/Footer';

export default function App() {
  const [mode, setMode] = useState<UserMode>('B2B');
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'initial-sample',
      title: 'Red Dot House Blend (1kg Wholesale Bag)',
      subtitle: 'Kallang Roastery Signature - $58/kg',
      unitPrice: 58.00,
      quantity: 1,
      unitLabel: '1kg Vacuum Bag',
      type: 'BEAN',
      mode: 'B2B',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWholesaleModalOpen, setIsWholesaleModalOpen] = useState<boolean>(false);
  const [isBlueprintModalOpen, setIsBlueprintModalOpen] = useState<boolean>(false);

  // Cart operations
  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A1E1B] flex flex-col font-sans selection:bg-[#C85A32] selection:text-white">
      {/* HEADER */}
      <Header
        mode={mode}
        setMode={setMode}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        setIsWholesaleModalOpen={setIsWholesaleModalOpen}
        setIsBlueprintModalOpen={setIsBlueprintModalOpen}
      />

      {/* MAIN BODY CONTENT */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <HeroSection
          mode={mode}
          setMode={setMode}
          setIsWholesaleModalOpen={setIsWholesaleModalOpen}
        />

        {/* BEAN INVENTORY & FLAVOR MATRIX */}
        <BeanInventory
          mode={mode}
          addToCart={addToCart}
          setIsWholesaleModalOpen={setIsWholesaleModalOpen}
        />

        {/* B2B COMMERCIAL SOLUTIONS & MACHINE LEASING */}
        <B2BCommercial
          addToCart={addToCart}
          setIsWholesaleModalOpen={setIsWholesaleModalOpen}
        />

        {/* B2C CUSTOM GIFT SET BUILDER */}
        <GiftBuilder
          addToCart={addToCart}
        />

        {/* INTERACTIVE COFFEE QUIZ */}
        <CoffeeQuiz
          addToCart={addToCart}
        />

        {/* SINGAPORE LOGISTICS & SFA TRANSPARENCY BAR */}
        <LogisticsBar />
      </main>

      {/* FOOTER */}
      <Footer
        setIsWholesaleModalOpen={setIsWholesaleModalOpen}
        setIsBlueprintModalOpen={setIsBlueprintModalOpen}
      />

      {/* MODALS & DRAWERS */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        clearCart={clearCart}
        mode={mode}
      />

      <WholesaleModal
        isOpen={isWholesaleModalOpen}
        onClose={() => setIsWholesaleModalOpen(false)}
      />

      <BlueprintModal
        isOpen={isBlueprintModalOpen}
        onClose={() => setIsBlueprintModalOpen(false)}
      />
    </div>
  );
}
