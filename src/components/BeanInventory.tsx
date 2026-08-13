import React, { useState, useMemo } from 'react';
import { CoffeeBean, UserMode, CartItem } from '../types';
import { SPECIALTY_BEANS } from '../data/coffeeData';
import { Filter, Search, ShoppingBag, Eye, Award, Sparkles, SlidersHorizontal, Layers, CheckCircle2, X, ChevronRight } from 'lucide-react';

interface BeanInventoryProps {
  mode: UserMode;
  addToCart: (item: CartItem) => void;
  setIsWholesaleModalOpen: (open: boolean) => void;
}

export const BeanInventory: React.FC<BeanInventoryProps> = ({ mode, addToCart, setIsWholesaleModalOpen }) => {
  const [selectedOrigin, setSelectedOrigin] = useState<string>('ALL');
  const [selectedRoast, setSelectedRoast] = useState<string>('ALL');
  const [selectedProcess, setSelectedProcess] = useState<string>('ALL');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // B2B Wholesale Tier Calculator state
  const [calculatorKg, setCalculatorKg] = useState<number>(20);
  const [selectedCalcBeanId, setSelectedCalcBeanId] = useState<string>('rd-red-dot-house');

  // Quick view modal bean state
  const [quickViewBean, setQuickViewBean] = useState<CoffeeBean | null>(null);

  // Extract unique filter options
  const origins = useMemo(() => ['ALL', ...Array.from(new Set(SPECIALTY_BEANS.map(b => b.origin)))], []);
  const roastLevels = useMemo(() => ['ALL', 'Light', 'Medium-Light', 'Medium', 'Medium-Dark', 'Dark', 'Omni-Roast'], []);
  const processingMethods = useMemo(() => ['ALL', 'Washed', 'Natural', 'Honey', 'Anaerobic Fermentation', 'Traditional Nanyang Roast'], []);
  const flavorNotesList = useMemo(() => {
    const set = new Set<string>();
    SPECIALTY_BEANS.forEach(b => b.flavorNotes.forEach(f => set.add(f)));
    return ['ALL', ...Array.from(set)];
  }, []);

  // Filter beans logic
  const filteredBeans = useMemo(() => {
    return SPECIALTY_BEANS.filter(bean => {
      if (selectedOrigin !== 'ALL' && bean.origin !== selectedOrigin) return false;
      if (selectedRoast !== 'ALL' && bean.roastLevel !== selectedRoast) return false;
      if (selectedProcess !== 'ALL' && bean.processingMethod !== selectedProcess) return false;
      if (selectedFlavor !== 'ALL' && !bean.flavorNotes.includes(selectedFlavor)) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = bean.name.toLowerCase().includes(query);
        const matchesOrigin = bean.origin.toLowerCase().includes(query);
        const matchesFlavors = bean.flavorNotes.some(f => f.toLowerCase().includes(query));
        if (!matchesName && !matchesOrigin && !matchesFlavors) return false;
      }
      return true;
    });
  }, [selectedOrigin, selectedRoast, selectedProcess, selectedFlavor, searchQuery]);

  // Calculator selected bean object
  const calcBean = SPECIALTY_BEANS.find(b => b.id === selectedCalcBeanId) || SPECIALTY_BEANS[0];

  // Dynamic pricing calculation for B2B Wholesale Calculator
  const calcPricePerKg = useMemo(() => {
    if (calculatorKg < 5) return calcBean.price1kg;
    if (calculatorKg < 20) return calcBean.price5kg / 5;
    return calcBean.price20kg;
  }, [calculatorKg, calcBean]);

  const calcTotalPrice = calcPricePerKg * calculatorKg;
  const calcBaseRetailValue = calcBean.price250g * 4 * calculatorKg;
  const calcSavingsAmount = calcBaseRetailValue - calcTotalPrice;
  const calcSavingsPercent = Math.round((calcSavingsAmount / calcBaseRetailValue) * 100);

  return (
    <section id="inventory" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#F2EBDC] border border-[#E2D5C3] text-[#A64B29] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Bean Inventory & Flavor Matrix</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1E1B]">
            Transparent Sourcing.{' '}
            <span className="italic text-[#C85A32]">Uncompromising Flavor.</span>
          </h2>
          <p className="text-base text-[#5C4D49] leading-relaxed">
            Every batch roasted at our Kallang roastery comes with verified altitude, cupping score, and custom flavor profile matrix data.
          </p>
        </div>

        {/* B2B TIERED WHOLESALE PRICING CALCULATOR BANNER */}
        <div className="bg-gradient-to-r from-[#2A1E1B] via-[#352622] to-[#2A1E1B] rounded-2xl p-6 sm:p-8 text-white border border-[#4A3530] shadow-2xl space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#4A3530]">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#F5C28B] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#C85A32]" />
                <span>B2B Bulk Wholesale Tier Calculator</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Calculate Commercial Savings for Your Cafe
              </h3>
              <p className="text-xs sm:text-sm text-[#CBB9A3] max-w-xl">
                Select your monthly coffee volume requirement to unlock direct roastery bulk wholesale pricing with free Singapore cold-chain dispatch.
              </p>
            </div>

            {/* Select Bean dropdown for Calculator */}
            <div className="w-full sm:w-auto">
              <label className="block text-xs font-semibold text-[#CBB9A3] mb-1.5">Select Specialty Blend/Origin:</label>
              <select
                value={selectedCalcBeanId}
                onChange={(e) => setSelectedCalcBeanId(e.target.value)}
                className="w-full sm:w-64 bg-[#1A1210] text-white border border-[#4A3530] rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#C85A32] cursor-pointer"
              >
                {SPECIALTY_BEANS.map(bean => (
                  <option key={bean.id} value={bean.id}>
                    {bean.name} ({bean.roastLevel})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Weight Slider & Tier Toggles */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex justify-between items-center text-xs font-bold text-[#E8DCCB]">
                <span>Monthly Volume Requirement:</span>
                <span className="text-[#F5C28B] text-base font-serif font-bold">{calculatorKg} kg / month</span>
              </div>

              {/* Slider Control */}
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={calculatorKg}
                onChange={(e) => setCalculatorKg(parseInt(e.target.value))}
                className="w-full h-2.5 bg-[#181110] rounded-lg appearance-none cursor-pointer accent-[#C85A32]"
              />

              {/* Tier Pills */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
                <button
                  onClick={() => setCalculatorKg(1)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    calculatorKg < 5
                      ? 'bg-[#C85A32] border-[#C85A32] text-white shadow-md'
                      : 'bg-[#1F1513] border-[#3D2C28] text-[#CBB9A3] hover:text-white'
                  }`}
                >
                  <div className="font-serif">Standard Bag</div>
                  <div className="text-[10px] opacity-80">1kg - $58/kg</div>
                </button>
                <button
                  onClick={() => setCalculatorKg(5)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    calculatorKg >= 5 && calculatorKg < 20
                      ? 'bg-[#C85A32] border-[#C85A32] text-white shadow-md'
                      : 'bg-[#1F1513] border-[#3D2C28] text-[#CBB9A3] hover:text-white'
                  }`}
                >
                  <div className="font-serif">Cafe Tier</div>
                  <div className="text-[10px] opacity-80">5kg+ - $48/kg</div>
                </button>
                <button
                  onClick={() => setCalculatorKg(20)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    calculatorKg >= 20
                      ? 'bg-[#C85A32] border-[#C85A32] text-white shadow-md'
                      : 'bg-[#1F1513] border-[#3D2C28] text-[#CBB9A3] hover:text-white'
                  }`}
                >
                  <div className="font-serif">Bulk Wholesale</div>
                  <div className="text-[10px] opacity-80">20kg+ - $38/kg</div>
                </button>
              </div>
            </div>

            {/* Calculated Output Display Box */}
            <div className="lg:col-span-5 bg-[#1A1210] rounded-xl p-5 border border-[#3D2C28] space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[#A6917A]">Effective Rate:</span>
                <div className="text-right">
                  <span className="text-2xl font-serif font-bold text-[#F5C28B]">${calcPricePerKg.toFixed(2)}</span>
                  <span className="text-xs text-[#A6917A]"> / kg</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline border-t border-[#2A1E1B] pt-3">
                <span className="text-xs text-[#E8DCCB] font-semibold">Total Monthly Investment ({calculatorKg}kg):</span>
                <span className="text-xl font-serif font-bold text-white">${calcTotalPrice.toFixed(2)}</span>
              </div>

              {calcSavingsPercent > 0 && (
                <div className="bg-[#2D1B17] p-2.5 rounded-lg border border-[#C85A32]/30 flex items-center justify-between text-xs text-[#F5C28B]">
                  <span>Wholesale Volume Savings:</span>
                  <span className="font-bold text-emerald-400">Save ${calcSavingsAmount.toFixed(2)} ({calcSavingsPercent}% OFF)</span>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    addToCart({
                      id: `bulk-${calcBean.id}-${calculatorKg}kg`,
                      title: `${calcBean.name} (${calculatorKg}kg Bulk Order)`,
                      subtitle: `Wholesale Tier - $${calcPricePerKg}/kg`,
                      unitPrice: calcTotalPrice,
                      quantity: 1,
                      unitLabel: `${calculatorKg}kg Wholesale Order`,
                      type: 'BEAN',
                      mode: 'B2B',
                      image: calcBean.image
                    });
                  }}
                  className="flex-1 bg-[#C85A32] hover:bg-[#B04B26] text-white py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add Wholesale Order</span>
                </button>
                <button
                  onClick={() => setIsWholesaleModalOpen(true)}
                  className="px-4 bg-[#3D2C28] hover:bg-[#4D3833] text-[#F5C28B] border border-[#5C433E] rounded-lg text-xs font-bold transition-all cursor-pointer"
                >
                  Sample Kit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER CONTROLS BAR */}
        <div className="bg-white rounded-2xl p-5 border border-[#E8DFC8] shadow-md space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#8C7A75]" />
              <input
                type="text"
                placeholder="Search beans, origin, notes (e.g. Ethiopia)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E2D5C3] rounded-xl pl-10 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-[#C85A32]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-[#8C7A75] hover:text-[#2A1E1B]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Count Indicator */}
            <div className="text-xs text-[#6E5C57] font-semibold">
              Showing <span className="text-[#C85A32] font-bold">{filteredBeans.length}</span> of {SPECIALTY_BEANS.length} Specialty Beans
            </div>
          </div>

          {/* Filter Select Dropdowns Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#FAF2E6]">
            {/* Origin Filter */}
            <div>
              <label className="block text-[11px] font-bold text-[#6E5C57] mb-1 uppercase tracking-wider">Origin</label>
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E2D5C3] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#2A1E1B] focus:outline-none focus:border-[#C85A32] cursor-pointer"
              >
                {origins.map(o => (
                  <option key={o} value={o}>{o === 'ALL' ? 'All Origins' : o}</option>
                ))}
              </select>
            </div>

            {/* Roast Level Filter */}
            <div>
              <label className="block text-[11px] font-bold text-[#6E5C57] mb-1 uppercase tracking-wider">Roast Level</label>
              <select
                value={selectedRoast}
                onChange={(e) => setSelectedRoast(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E2D5C3] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#2A1E1B] focus:outline-none focus:border-[#C85A32] cursor-pointer"
              >
                {roastLevels.map(r => (
                  <option key={r} value={r}>{r === 'ALL' ? 'All Roast Levels' : r}</option>
                ))}
              </select>
            </div>

            {/* Processing Method Filter */}
            <div>
              <label className="block text-[11px] font-bold text-[#6E5C57] mb-1 uppercase tracking-wider">Process</label>
              <select
                value={selectedProcess}
                onChange={(e) => setSelectedProcess(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E2D5C3] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#2A1E1B] focus:outline-none focus:border-[#C85A32] cursor-pointer"
              >
                {processingMethods.map(p => (
                  <option key={p} value={p}>{p === 'ALL' ? 'All Processing' : p}</option>
                ))}
              </select>
            </div>

            {/* Flavor Notes Filter */}
            <div>
              <label className="block text-[11px] font-bold text-[#6E5C57] mb-1 uppercase tracking-wider">Flavor Note</label>
              <select
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E2D5C3] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#2A1E1B] focus:outline-none focus:border-[#C85A32] cursor-pointer"
              >
                {flavorNotesList.map(f => (
                  <option key={f} value={f}>{f === 'ALL' ? 'All Flavor Notes' : f}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* BEAN CARDS GRID */}
        {filteredBeans.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E8DFC8] space-y-3">
            <Filter className="w-10 h-10 text-[#C85A32] mx-auto opacity-50" />
            <h3 className="font-serif text-xl font-bold text-[#2A1E1B]">No Specialty Beans Match Your Search</h3>
            <p className="text-xs text-[#6E5C57]">Try clearing your search filters or selecting different flavor note combinations.</p>
            <button
              onClick={() => {
                setSelectedOrigin('ALL');
                setSelectedRoast('ALL');
                setSelectedProcess('ALL');
                setSelectedFlavor('ALL');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#C85A32] text-white text-xs font-bold rounded-lg hover:bg-[#B04B26] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBeans.map(bean => (
              <div
                key={bean.id}
                className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Bean Image Header */}
                  <div className="relative h-52 overflow-hidden bg-[#2A1E1B]">
                    <img
                      src={bean.image}
                      alt={bean.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-xs">
                      <span className="bg-[#2A1E1B]/90 backdrop-blur-md text-[#F5C28B] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#4A3530]">
                        {bean.origin}
                      </span>
                      <div className="flex items-center space-x-1 bg-[#C85A32] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                        <Award className="w-3 h-3" />
                        <span>Q Score {bean.cuppingScore}</span>
                      </div>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[10px] text-[#F5C28B] font-bold uppercase tracking-wider">{bean.subtitle}</div>
                      <h3 className="font-serif text-xl font-bold leading-snug">{bean.name}</h3>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 space-y-4">
                    {/* Meta Info Row */}
                    <div className="flex justify-between items-center text-xs text-[#6E5C57] pb-2 border-b border-[#FAF2E6]">
                      <div>
                        <span className="font-semibold text-[#2A1E1B]">Roast:</span> {bean.roastLevel}
                      </div>
                      <div>
                        <span className="font-semibold text-[#2A1E1B]">Process:</span> {bean.processingMethod}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#5C4D49] leading-relaxed line-clamp-2">
                      {bean.description}
                    </p>

                    {/* Flavor Notes Tags */}
                    <div>
                      <div className="text-[10px] font-bold text-[#8C7A75] uppercase tracking-wider mb-1.5">Flavor Profile Notes</div>
                      <div className="flex flex-wrap gap-1.5">
                        {bean.flavorNotes.map(note => (
                          <span
                            key={note}
                            className="text-[11px] font-semibold bg-[#FAF2E6] text-[#60382B] px-2.5 py-0.5 rounded-full border border-[#EADCC8]"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Flavor Profile Visual Metrics Bars */}
                    <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DFC8] space-y-1.5">
                      <div className="text-[10px] font-bold text-[#8C7A75] uppercase tracking-wider">Flavor Pentagon Rating</div>
                      <div className="grid grid-cols-5 gap-1 text-[9px] text-center font-bold text-[#5C4D49]">
                        <div>
                          <div>Acidity</div>
                          <div className="text-[#C85A32] font-extrabold">{bean.flavorProfile.acidity}/5</div>
                        </div>
                        <div>
                          <div>Body</div>
                          <div className="text-[#C85A32] font-extrabold">{bean.flavorProfile.body}/5</div>
                        </div>
                        <div>
                          <div>Sweet</div>
                          <div className="text-[#C85A32] font-extrabold">{bean.flavorProfile.sweetness}/5</div>
                        </div>
                        <div>
                          <div>Bitter</div>
                          <div className="text-[#C85A32] font-extrabold">{bean.flavorProfile.bitterness}/5</div>
                        </div>
                        <div>
                          <div>Aroma</div>
                          <div className="text-[#C85A32] font-extrabold">{bean.flavorProfile.aroma}/5</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Pricing & Purchase CTAs */}
                <div className="p-5 pt-0 space-y-3">
                  <div className="flex justify-between items-end border-t border-[#FAF2E6] pt-3">
                    <div>
                      <div className="text-[10px] text-[#8C7A75] font-bold uppercase">
                        {mode === 'B2B' ? 'Wholesale Tier (20kg+)' : 'Retail 250g Bag'}
                      </div>
                      <div className="text-xl font-serif font-bold text-[#2A1E1B]">
                        {mode === 'B2B' ? (
                          <>
                            ${bean.price20kg.toFixed(2)} <span className="text-xs font-sans text-[#6E5C57]">/ kg</span>
                          </>
                        ) : (
                          <>
                            ${bean.price250g.toFixed(2)} <span className="text-xs font-sans text-[#6E5C57]">/ 250g</span>
                          </>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setQuickViewBean(bean)}
                      className="text-xs text-[#C85A32] hover:text-[#9E3E1C] font-semibold flex items-center space-x-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Cupping Details</span>
                    </button>
                  </div>

                  {/* Add Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        addToCart({
                          id: `250g-${bean.id}`,
                          title: `${bean.name} (250g Bag)`,
                          subtitle: `${bean.roastLevel} - ${bean.processingMethod}`,
                          unitPrice: bean.price250g,
                          quantity: 1,
                          unitLabel: '250g Whole Bean',
                          type: 'BEAN',
                          mode: 'B2C',
                          image: bean.image
                        });
                      }}
                      className="px-3 py-2 bg-[#FAF2E6] hover:bg-[#F2E3CD] text-[#2A1E1B] border border-[#E0D0B8] rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>+ 250g Bag</span>
                    </button>

                    <button
                      onClick={() => {
                        addToCart({
                          id: `1kg-${bean.id}`,
                          title: `${bean.name} (1kg Wholesale Bag)`,
                          subtitle: `Commercial Grade - $${bean.price1kg}/kg`,
                          unitPrice: bean.price1kg,
                          quantity: 1,
                          unitLabel: '1kg Vacuum Sealed',
                          type: 'BEAN',
                          mode: mode,
                          image: bean.image
                        });
                      }}
                      className="px-3 py-2 bg-[#C85A32] hover:bg-[#B04B26] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 cursor-pointer shadow"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>+ 1kg (${bean.price1kg})</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK VIEW CUPPING DETAIL MODAL */}
      {quickViewBean && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF7F2] rounded-2xl max-w-2xl w-full border border-[#E8DFC8] shadow-2xl overflow-hidden relative my-8">
            <button
              onClick={() => setQuickViewBean(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 text-white rounded-full hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-5 relative h-64 md:h-auto bg-[#2A1E1B]">
                <img src={quickViewBean.image} alt={quickViewBean.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-xs text-[#F5C28B] font-bold">{quickViewBean.origin}</div>
                  <div className="font-serif text-xl font-bold">{quickViewBean.name}</div>
                  <div className="text-xs opacity-80">Cupping Score: {quickViewBean.cuppingScore}</div>
                </div>
              </div>

              <div className="md:col-span-7 p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#C85A32] uppercase tracking-wider">Roastery Specification Sheet</span>
                  <h3 className="font-serif text-2xl font-bold text-[#2A1E1B]">{quickViewBean.name}</h3>
                  <p className="text-xs text-[#6E5C57]">{quickViewBean.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-white p-3 rounded-xl border border-[#E8DFC8]">
                  <div><span className="font-bold text-[#2A1E1B]">Region:</span> {quickViewBean.region}</div>
                  <div><span className="font-bold text-[#2A1E1B]">Altitude:</span> {quickViewBean.altitude}</div>
                  <div><span className="font-bold text-[#2A1E1B]">Roast Level:</span> {quickViewBean.roastLevel}</div>
                  <div><span className="font-bold text-[#2A1E1B]">Processing:</span> {quickViewBean.processingMethod}</div>
                </div>

                <div>
                  <div className="text-xs font-bold text-[#2A1E1B] mb-1">Recommended Brewing Methods:</div>
                  <div className="flex flex-wrap gap-1">
                    {quickViewBean.recommendedBrew.map(m => (
                      <span key={m} className="text-xs bg-[#FAF2E6] text-[#C85A32] font-semibold px-2.5 py-1 rounded-lg border border-[#EADCC8]">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#E8DFC8]">
                  <div>
                    <div className="text-[10px] text-[#8C7A75] font-bold">WHOLESALE 1KG RATE</div>
                    <div className="text-xl font-serif font-bold text-[#2A1E1B]">${quickViewBean.price1kg.toFixed(2)}</div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart({
                        id: `1kg-${quickViewBean.id}`,
                        title: `${quickViewBean.name} (1kg Bag)`,
                        subtitle: `${quickViewBean.roastLevel} - Wholesale`,
                        unitPrice: quickViewBean.price1kg,
                        quantity: 1,
                        unitLabel: '1kg Vacuum Bag',
                        type: 'BEAN',
                        mode: mode,
                        image: quickViewBean.image
                      });
                      setQuickViewBean(null);
                    }}
                    className="px-5 py-2.5 bg-[#C85A32] hover:bg-[#B04B26] text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add 1kg to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
