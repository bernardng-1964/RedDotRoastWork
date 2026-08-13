import React from 'react';
import { UserMode, CartItem } from '../types';
import { ShoppingBag, Coffee, Building2, UserCheck, ShieldCheck, Phone, FileText, Menu, X, Sparkles, MapPin } from 'lucide-react';

interface HeaderProps {
  mode: UserMode;
  setMode: (mode: UserMode) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  setIsWholesaleModalOpen: (open: boolean) => void;
  setIsBlueprintModalOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  setMode,
  cart,
  setIsCartOpen,
  setIsWholesaleModalOpen,
  setIsBlueprintModalOpen
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartValue = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#2A1E1B] text-[#FAF7F2] shadow-xl border-b border-[#3D2C28]">
      {/* Top Banner Notice */}
      <div className="bg-[#3B2824] px-4 py-1.5 text-xs text-[#E8DCCB] border-b border-[#4A3530]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#C85A32] text-white">
              SFA CERTIFIED
            </span>
            <span className="hidden sm:inline">Kallang Roastery Fresh Batch:</span>
            <span className="text-[#F5C28B] font-semibold">Same-Day Temperature-Controlled Delivery across Singapore for orders before 12 PM</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <a href="tel:+6567428888" className="hover:text-white flex items-center space-x-1 transition-colors">
              <Phone className="w-3 h-3 text-[#C85A32]" />
              <span>+65 6742 8888</span>
            </a>
            <span className="text-[#6E544D]">|</span>
            <div className="flex items-center space-x-1 text-[#E8DCCB]">
              <MapPin className="w-3 h-3 text-[#C85A32]" />
              <span className="hidden md:inline">12 Kallang Way, Singapore 349144</span>
            </div>
            <span className="text-[#6E544D]">|</span>
            <button
              onClick={() => setIsBlueprintModalOpen(true)}
              className="text-[#F5C28B] hover:underline flex items-center space-x-1 font-medium cursor-pointer"
            >
              <FileText className="w-3 h-3" />
              <span>Architecture & Copy Sheet</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <a href="#" className="group flex items-center space-x-2.5">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#C85A32] to-[#8C3414] p-2 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Coffee className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#E53E3E] border-2 border-[#2A1E1B] animate-pulse" title="Red Dot Singapore Heritage" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#F5C28B] transition-colors">
                  Red Dot
                </span>
                <span className="w-2 h-2 rounded-full bg-[#C85A32]"></span>
              </div>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#CBB9A3] block -mt-1">
                Roastworks Singapore
              </span>
            </div>
          </a>
        </div>

        {/* B2B / B2C Dual Segment Toggle Button */}
        <div className="hidden lg:flex items-center bg-[#1F1513] p-1 rounded-full border border-[#4A3530]">
          <button
            onClick={() => setMode('B2B')}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              mode === 'B2B'
                ? 'bg-[#C85A32] text-white shadow-md'
                : 'text-[#CBB9A3] hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>For Cafes & Businesses (B2B)</span>
          </button>
          <button
            onClick={() => setMode('B2C')}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              mode === 'B2C'
                ? 'bg-[#C85A32] text-white shadow-md'
                : 'text-[#CBB9A3] hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>For Home Coffee Enthusiasts (B2C)</span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-medium text-[#E8DCCB]">
          <a href="#inventory" className="hover:text-[#F5C28B] transition-colors">
            {mode === 'B2B' ? 'Wholesale Beans' : 'Specialty Beans'}
          </a>
          <a href="#b2b-commercial" className="hover:text-[#F5C28B] transition-colors">
            {mode === 'B2B' ? 'Machine Rentals' : 'Equipment Lease'}
          </a>
          <a href="#gift-builder" className="hover:text-[#F5C28B] transition-colors">
            Custom Gift Builder
          </a>
          <a href="#coffee-quiz" className="hover:text-[#F5C28B] transition-colors flex items-center space-x-1 text-[#F5C28B]">
            <Sparkles className="w-3 h-3" />
            <span>Find Your Brew</span>
          </a>
          <a href="#logistics" className="hover:text-[#F5C28B] transition-colors">
            Logistics & SFA
          </a>
        </nav>

        {/* Actions (Wholesale Inquiry & Cart Button) */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsWholesaleModalOpen(true)}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#3D2C28] hover:bg-[#4D3833] text-[#F5C28B] text-xs font-semibold border border-[#5C433E] transition-all cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Wholesale Quote</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[#C85A32] hover:bg-[#B04B26] text-white text-xs font-semibold transition-all shadow-md hover:scale-105 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalCartCount > 0 && (
              <span className="inline-flex items-center justify-center bg-white text-[#2A1E1B] font-bold rounded-full w-5 h-5 text-[11px] ml-1">
                {totalCartCount}
              </span>
            )}
            {totalCartValue > 0 && (
              <span className="hidden md:inline font-bold text-[#FDFBF7] ml-1">
                ${totalCartValue.toFixed(2)}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#CBB9A3] hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1F1513] border-t border-[#3D2C28] px-4 py-4 space-y-4">
          <div className="flex bg-[#2A1E1B] p-1 rounded-lg border border-[#4A3530]">
            <button
              onClick={() => { setMode('B2B'); setMobileMenuOpen(false); }}
              className={`flex-1 py-2 text-center text-xs font-semibold rounded-md ${
                mode === 'B2B' ? 'bg-[#C85A32] text-white' : 'text-[#CBB9A3]'
              }`}
            >
              B2B Cafe & Business
            </button>
            <button
              onClick={() => { setMode('B2C'); setMobileMenuOpen(false); }}
              className={`flex-1 py-2 text-center text-xs font-semibold rounded-md ${
                mode === 'B2C' ? 'bg-[#C85A32] text-white' : 'text-[#CBB9A3]'
              }`}
            >
              B2C Home Coffee
            </button>
          </div>

          <div className="flex flex-col space-y-3 text-sm font-medium text-[#E8DCCB] pt-2">
            <a href="#inventory" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#F5C28B]">
              Bean Inventory & Flavor Matrix
            </a>
            <a href="#b2b-commercial" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#F5C28B]">
              Machine Rentals & Private Labeling
            </a>
            <a href="#gift-builder" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#F5C28B]">
              Custom Gift Set Builder
            </a>
            <a href="#coffee-quiz" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#F5C28B] text-[#F5C28B]">
              Find Your Brew (Taste Quiz)
            </a>
            <a href="#logistics" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#F5C28B]">
              Singapore Logistics & SFA Safety
            </a>
            <button
              onClick={() => { setIsBlueprintModalOpen(true); setMobileMenuOpen(false); }}
              className="text-left text-[#F5C28B] flex items-center space-x-2 py-1 font-semibold"
            >
              <FileText className="w-4 h-4" />
              <span>Architectural Blueprint Sheet</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
