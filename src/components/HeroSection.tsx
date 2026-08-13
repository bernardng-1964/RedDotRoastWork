import React from 'react';
import { UserMode } from '../types';
import { Building2, UserCheck, ShieldCheck, Truck, Clock, Sparkles, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  mode: UserMode;
  setMode: (mode: UserMode) => void;
  setIsWholesaleModalOpen: (open: boolean) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ mode, setMode, setIsWholesaleModalOpen }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#2A1E1B] via-[#352622] to-[#FAF7F2] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Subtle Background Coffee Artwork */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C85A32_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Dynamic Dual CTA Segment Selector Banner */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#1D1412] border border-[#4A3530] shadow-2xl">
            <button
              onClick={() => setMode('B2B')}
              className={`flex items-center space-x-2.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                mode === 'B2B'
                  ? 'bg-gradient-to-r from-[#C85A32] to-[#B04B26] text-white shadow-lg scale-102'
                  : 'text-[#CBB9A3] hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>For Cafes & Businesses (B2B)</span>
            </button>
            <button
              onClick={() => setMode('B2C')}
              className={`flex items-center space-x-2.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                mode === 'B2C'
                  ? 'bg-gradient-to-r from-[#C85A32] to-[#B04B26] text-white shadow-lg scale-102'
                  : 'text-[#CBB9A3] hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>For Home Enthusiasts (B2C)</span>
            </button>
          </div>
        </div>

        {/* Hero Main Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Context Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#3D2B26] border border-[#5C423B] text-[#F5C28B] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>
                {mode === 'B2B'
                  ? 'Singapore Wholesale & F&B Roastery Partner'
                  : 'Artisanal Kallang In-House Roasts'}
              </span>
            </div>

            {/* Core Hook & Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              From Local Roasts to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C28B] via-[#E2885C] to-[#C85A32]">
                Café Customization.
              </span>
            </h1>

            {/* Value Statement Paragraph */}
            <p className="text-base sm:text-lg text-[#E0D3C3] max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {mode === 'B2B'
                ? 'Empowering 120+ Singapore cafes, boutique bistros, and offices with transparent specialty bean supply, bulk wholesale discounts, commercial machine rentals, and SFA-grade food safety compliance.'
                : 'Experience fresh in-house Kallang roasts delivered to your door. Savor transparently sourced single origins, bespoke gift sets, and personalized taste matching.'}
            </p>

            {/* Dynamic Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              {mode === 'B2B' ? (
                <>
                  <a
                    href="#inventory"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#C85A32] hover:bg-[#B04B26] text-white font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
                  >
                    <span>View Wholesale Bulk Rates</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button
                    onClick={() => setIsWholesaleModalOpen(true)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#3D2C28] hover:bg-[#4D3833] text-[#F5C28B] border border-[#5C433E] font-bold text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Building2 className="w-4 h-4 text-[#C85A32]" />
                    <span>Request Free Sample Kit</span>
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="#inventory"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#C85A32] hover:bg-[#B04B26] text-white font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center space-x-2 group cursor-pointer"
                  >
                    <span>Explore Specialty Beans</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="#coffee-quiz"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#3D2C28] hover:bg-[#4D3833] text-[#F5C28B] border border-[#5C433E] font-bold text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C85A32]" />
                    <span>Take Taste Quiz</span>
                  </a>
                </>
              )}
            </div>

            {/* Quick Benefits Bullet List */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#CBB9A3] font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>30-Day Flexible Payment Terms (B2B)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>Zero Margin Markups</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>Cold-Chain Islandwide Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Hero Card Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-[#1F1513]/90 backdrop-blur-md rounded-2xl p-6 border border-[#4A3530] shadow-2xl">
              {/* Badge Overlay */}
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-[#C85A32] to-[#E2885C] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
                <Award className="w-3 h-3" />
                <span>SCA Certified Roaster</span>
              </div>

              {/* Main Image Banner */}
              <div className="relative h-48 rounded-xl overflow-hidden mb-5">
                <img
                  src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80"
                  alt="Specialty Coffee Roasting Kallang Singapore"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F1513] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs font-bold text-[#F5C28B] uppercase tracking-wider">Kallang Industrial Roastery #02-01</div>
                  <div className="font-serif text-lg font-bold">In-House Loring S35 Kestrel Roaster</div>
                </div>
              </div>

              {/* Dynamic Live Status Box */}
              <div className="bg-[#2A1E1B] rounded-xl p-4 border border-[#3D2C28] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#E8DCCB]">
                  <span className="flex items-center space-x-1.5 font-semibold">
                    <Clock className="w-4 h-4 text-[#C85A32]" />
                    <span>Today's Roasting Schedule</span>
                  </span>
                  <span className="bg-[#3D2A1D] text-[#F5C28B] px-2 py-0.5 rounded text-[10px] font-bold">
                    BATCH #8842 ACTIVE
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[#CBB9A3]">
                    <span>Red Dot House Blend (Degassing)</span>
                    <span className="text-emerald-400 font-bold">Ready for Dispatch</span>
                  </div>
                  <div className="w-full bg-[#181110] rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-[#C85A32] to-[#E2885C] h-full w-[85%]" />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#3D2C28] text-[11px] text-[#A6917A]">
                  <span className="flex items-center space-x-1">
                    <Truck className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>12 PM Cutoff for Same-Day Van Fleet</span>
                  </span>
                  <span className="text-[#F5C28B] font-semibold">Cutoff in 2h 15m</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TRUST BADGES BAR */}
        <div className="mt-14 pt-8 border-t border-[#3D2C28] grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#2A1E1B]/80 rounded-xl p-4 border border-[#3D2C28] flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#3D2B26] text-[#C85A32] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Food-Safe Delivery Guaranteed</h4>
              <p className="text-xs text-[#A6917A] leading-snug">SFA Grade A Hygiene Certified, nitrogen-flushed vacuum sealed batches.</p>
            </div>
          </div>

          <div className="bg-[#2A1E1B]/80 rounded-xl p-4 border border-[#3D2C28] flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#3D2B26] text-[#C85A32] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Fresh In-House Roast</h4>
              <p className="text-xs text-[#A6917A] leading-snug">Roasted weekly in Kallang. Delivered within 24-48 hours of optimal degassing.</p>
            </div>
          </div>

          <div className="bg-[#2A1E1B]/80 rounded-xl p-4 border border-[#3D2C28] flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#3D2B26] text-[#C85A32] flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Trusted by 120+ Local Cafes</h4>
              <p className="text-xs text-[#A6917A] leading-snug">Supplying top Singapore specialty coffee spots, bistros, and corporate pantries.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
