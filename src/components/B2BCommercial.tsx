import React, { useState } from 'react';
import { CoffeeMachine, CartItem, CustomRoastRequest } from '../types';
import { COMMERCIAL_MACHINES, SPECIALTY_BEANS } from '../data/coffeeData';
import { Building2, Wrench, Calendar, CheckCircle2, ShieldCheck, Sparkles, Plus, Send, ChevronRight, Award, Coffee } from 'lucide-react';

interface B2BCommercialProps {
  addToCart: (item: CartItem) => void;
  setIsWholesaleModalOpen: (open: boolean) => void;
}

export const B2BCommercial: React.FC<B2BCommercialProps> = ({ addToCart, setIsWholesaleModalOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Custom Roast Builder Form State
  const [blendPrimary, setBlendPrimary] = useState<string>('Colombia Huila Pink Bourbon');
  const [blendPrimaryRatio, setBlendPrimaryRatio] = useState<number>(60);
  const [blendSecondary, setBlendSecondary] = useState<string>('Ethiopia Yirgacheffe Aricha');
  const [targetRoast, setTargetRoast] = useState<string>('Medium Roast');
  const [businessName, setBusinessName] = useState<string>('');
  const [contactPerson, setContactPerson] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [estimatedKg, setEstimatedKg] = useState<number>(30);
  const [cuppingDate, setCuppingDate] = useState<string>('2026-08-20');
  const [customFormSubmitted, setCustomFormSubmitted] = useState<boolean>(false);

  const filteredMachines = COMMERCIAL_MACHINES.filter(m => {
    if (selectedCategory === 'ALL') return true;
    return m.category === selectedCategory;
  });

  const handleCustomRoastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomFormSubmitted(true);
  };

  return (
    <section id="b2b-commercial" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#2A1E1B] text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#3D2C28] border border-[#5C433E] text-[#F5C28B] text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Commercial Coffee Machines & Bespoke Roasts</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            B2B Commercial Solutions.{' '}
            <span className="italic text-[#F5C28B]">Zero Operational Friction.</span>
          </h2>
          <p className="text-base text-[#CBB9A3] leading-relaxed">
            From premier Italian espresso machines to bespoke private-label blends roasted at our Kallang facility, we power Singapore’s finest F&B operators.
          </p>
        </div>

        {/* 1. COFFEE MACHINE RENTAL & LEASE-TO-OWN PORTAL */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#3D2C28]">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white flex items-center space-x-2">
                <span>Commercial Machine Rental & Lease Portal</span>
              </h3>
              <p className="text-xs text-[#A6917A]">
                Includes complimentary monthly specialty bean credits & SFA water filtration maintenance.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              {['ALL', 'High-Volume Commercial', 'Office Executive', 'Prosumer Home'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#C85A32] border-[#C85A32] text-white'
                      : 'bg-[#1F1513] border-[#3D2C28] text-[#CBB9A3] hover:text-white'
                  }`}
                >
                  {cat === 'ALL' ? 'All Machines' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Machine Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredMachines.map(machine => (
              <div
                key={machine.id}
                className="bg-[#1F1513] rounded-2xl border border-[#3D2C28] overflow-hidden shadow-xl hover:border-[#5C433E] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image & Price Overlay */}
                  <div className="relative h-56 bg-[#181110]">
                    <img
                      src={machine.image}
                      alt={machine.name}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F1513] via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 bg-[#2A1E1B]/90 backdrop-blur-md text-[#F5C28B] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#4A3530]">
                      {machine.category}
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                      <div>
                        <div className="text-[10px] text-[#A6917A] uppercase font-bold">{machine.brand}</div>
                        <h4 className="font-serif text-xl font-bold text-white">{machine.name}</h4>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-[#A6917A]">MONTHLY LEASE</div>
                        <div className="text-2xl font-serif font-bold text-[#F5C28B]">${machine.monthlyRental}<span className="text-xs font-sans text-[#A6917A]">/mo</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Specs & Features */}
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-xs bg-[#2A1E1B] p-3 rounded-xl border border-[#3D2C28]">
                      <div><span className="text-[#A6917A]">Capacity:</span> <span className="font-bold text-white">{machine.dailyCapacity}</span></div>
                      <div><span className="text-[#A6917A]">Boilers:</span> <span className="font-bold text-white">{machine.boilerCount}</span></div>
                      <div><span className="text-[#A6917A]">Power:</span> <span className="font-bold text-white">{machine.powerRequirements}</span></div>
                      <div><span className="text-[#A6917A]">Free Beans:</span> <span className="font-bold text-[#F5C28B]">{machine.freeMonthlyBeansKg}kg / month</span></div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-[#CBB9A3] uppercase tracking-wider">Included Perks:</div>
                      <div className="space-y-1 text-xs text-[#A6917A]">
                        {machine.features.map(feat => (
                          <div key={feat} className="flex items-center space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Lease Action Button */}
                <div className="p-6 pt-0 flex gap-3">
                  <button
                    onClick={() => {
                      addToCart({
                        id: `lease-${machine.id}`,
                        title: `${machine.name} (Monthly Lease)`,
                        subtitle: `Includes ${machine.freeMonthlyBeansKg}kg Fresh Bean Credit`,
                        unitPrice: machine.monthlyRental,
                        quantity: 1,
                        unitLabel: '1 Month Equipment Lease',
                        type: 'MACHINE_RENTAL',
                        mode: 'B2B',
                        image: machine.image
                      });
                    }}
                    className="flex-1 bg-[#C85A32] hover:bg-[#B04B26] text-white py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                  >
                    <span>Lease Machine (${machine.monthlyRental}/mo)</span>
                  </button>

                  <button
                    onClick={() => setIsWholesaleModalOpen(true)}
                    className="px-4 bg-[#3D2C28] hover:bg-[#4D3833] text-[#F5C28B] border border-[#5C433E] rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Book Demo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. CUSTOM ROAST & PRIVATE LABEL RECIPE BUILDER */}
        <div className="bg-[#1F1513] rounded-2xl p-6 sm:p-8 border border-[#3D2C28] shadow-2xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#F5C28B] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C85A32]" />
              <span>Bespoke Private Label Program</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-white">
              Create Your Signature House Blend
            </h3>
            <p className="text-xs sm:text-sm text-[#CBB9A3]">
              Craft a unique flavor profile tailored to your cafe's brand. Design custom bag artwork, select bean origin percentages, and schedule a private cupping session at our Kallang roastery.
            </p>
          </div>

          {customFormSubmitted ? (
            <div className="bg-[#2A1E1B] p-8 rounded-xl border border-[#C85A32] text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#C85A32] mx-auto" />
              <h4 className="font-serif text-2xl font-bold text-white">Private Label Inquiry Received!</h4>
              <p className="text-xs text-[#CBB9A3] max-w-md mx-auto">
                Thank you <span className="text-[#F5C28B] font-bold">{contactPerson || 'Partner'}</span> from <span className="text-[#F5C28B] font-bold">{businessName || 'your business'}</span>. Our Head Roaster will review your blend composition ({blendPrimaryRatio}% / {100 - blendPrimaryRatio}%) and contact you for your cupping session on <span className="text-white font-bold">{cuppingDate}</span>.
              </p>
              <button
                onClick={() => setCustomFormSubmitted(false)}
                className="px-5 py-2 bg-[#3D2C28] text-[#F5C28B] rounded-lg text-xs font-bold hover:bg-[#4D3833] transition-colors cursor-pointer"
              >
                Build Another Blend Recipe
              </button>
            </div>
          ) : (
            <form onSubmit={handleCustomRoastSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Blend Composition Visualizer Column */}
              <div className="lg:col-span-6 bg-[#2A1E1B] p-6 rounded-xl border border-[#3D2C28] space-y-6">
                <h4 className="font-serif text-lg font-bold text-[#F5C28B] flex items-center space-x-2">
                  <Coffee className="w-5 h-5 text-[#C85A32]" />
                  <span>Blend Ratio Calculator</span>
                </h4>

                {/* Primary Bean Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#E8DCCB] font-semibold">
                    <span>Base Component ({blendPrimaryRatio}%):</span>
                    <span className="text-[#F5C28B]">{blendPrimary}</span>
                  </div>
                  <select
                    value={blendPrimary}
                    onChange={(e) => setBlendPrimary(e.target.value)}
                    className="w-full bg-[#181110] border border-[#4A3530] text-xs font-bold text-white rounded-lg p-2.5 focus:outline-none"
                  >
                    {SPECIALTY_BEANS.map(b => (
                      <option key={b.id} value={b.name}>{b.name} ({b.origin})</option>
                    ))}
                  </select>
                </div>

                {/* Ratio Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#A6917A]">
                    <span>Blend Balance: {blendPrimaryRatio}% / {100 - blendPrimaryRatio}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    step="5"
                    value={blendPrimaryRatio}
                    onChange={(e) => setBlendPrimaryRatio(parseInt(e.target.value))}
                    className="w-full h-2 bg-[#181110] rounded-lg appearance-none cursor-pointer accent-[#C85A32]"
                  />
                </div>

                {/* Secondary Bean Selector */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#E8DCCB] font-semibold">
                    <span>Accent Component ({100 - blendPrimaryRatio}%):</span>
                    <span className="text-[#F5C28B]">{blendSecondary}</span>
                  </div>
                  <select
                    value={blendSecondary}
                    onChange={(e) => setBlendSecondary(e.target.value)}
                    className="w-full bg-[#181110] border border-[#4A3530] text-xs font-bold text-white rounded-lg p-2.5 focus:outline-none"
                  >
                    {SPECIALTY_BEANS.map(b => (
                      <option key={b.id} value={b.name}>{b.name} ({b.origin})</option>
                    ))}
                  </select>
                </div>

                {/* Target Roast */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#E8DCCB]">Target Roast Profile:</label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {['Light Roast', 'Medium Roast', 'Dark Roast'].map(r => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setTargetRoast(r)}
                        className={`py-2 rounded-lg border text-[11px] font-bold cursor-pointer ${
                          targetRoast === r
                            ? 'bg-[#C85A32] border-[#C85A32] text-white'
                            : 'bg-[#181110] border-[#3D2C28] text-[#CBB9A3]'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact & Scheduling Details Column */}
              <div className="lg:col-span-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#CBB9A3] mb-1">Business/Cafe Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Katong Artisan Cafe"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-[#2A1E1B] border border-[#4A3530] text-xs text-white p-2.5 rounded-lg focus:outline-none focus:border-[#C85A32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#CBB9A3] mb-1">Contact Person *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rachel Tan"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full bg-[#2A1E1B] border border-[#4A3530] text-xs text-white p-2.5 rounded-lg focus:outline-none focus:border-[#C85A32]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#CBB9A3] mb-1">Business Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="rachel@artisancafe.sg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#2A1E1B] border border-[#4A3530] text-xs text-white p-2.5 rounded-lg focus:outline-none focus:border-[#C85A32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#CBB9A3] mb-1">Phone Number (SG +65) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+65 9123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#2A1E1B] border border-[#4A3530] text-xs text-white p-2.5 rounded-lg focus:outline-none focus:border-[#C85A32]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#CBB9A3] mb-1">Estimated Monthly Volume (kg)</label>
                    <input
                      type="number"
                      value={estimatedKg}
                      onChange={(e) => setEstimatedKg(parseInt(e.target.value) || 10)}
                      className="w-full bg-[#2A1E1B] border border-[#4A3530] text-xs text-white p-2.5 rounded-lg focus:outline-none focus:border-[#C85A32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#CBB9A3] mb-1">Preferred Cupping Date</label>
                    <input
                      type="date"
                      value={cuppingDate}
                      onChange={(e) => setCuppingDate(e.target.value)}
                      className="w-full bg-[#2A1E1B] border border-[#4A3530] text-xs text-white p-2.5 rounded-lg focus:outline-none focus:border-[#C85A32]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C85A32] hover:bg-[#B04B26] text-white py-3 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Recipe Proposal & Schedule Cupping</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 3. WHOLESALER BENEFITS BREAKDOWN */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-[#3D2C28]">
          <div className="bg-[#1F1513] p-5 rounded-xl border border-[#3D2C28] space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#3D2C28] text-[#F5C28B] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-white">30-Day Flexible Terms</h4>
            <p className="text-xs text-[#A6917A] leading-relaxed">Enjoy 30-day invoice credit terms via PayNow, GiRO, or direct corporate bank transfer.</p>
          </div>

          <div className="bg-[#1F1513] p-5 rounded-xl border border-[#3D2C28] space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#3D2C28] text-[#F5C28B] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-white">Dedicated Account Rep</h4>
            <p className="text-xs text-[#A6917A] leading-relaxed">Direct WhatsApp hotline with your dedicated Singapore roasting manager.</p>
          </div>

          <div className="bg-[#1F1513] p-5 rounded-xl border border-[#3D2C28] space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#3D2C28] text-[#F5C28B] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-white">Free Barista Training</h4>
            <p className="text-xs text-[#A6917A] leading-relaxed">Complimentary SCA-certified dial-in and extraction training for your staff.</p>
          </div>

          <div className="bg-[#1F1513] p-5 rounded-xl border border-[#3D2C28] space-y-2">
            <div className="w-9 h-9 rounded-lg bg-[#3D2C28] text-[#F5C28B] flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-base font-bold text-white">Maintenance Perks</h4>
            <p className="text-xs text-[#A6917A] leading-relaxed">Quarterly group head servicing, SFA water filter replacement, and emergency backup equipment.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
