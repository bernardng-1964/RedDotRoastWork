import React, { useState } from 'react';
import { GiftPackagingOption, GiftCardDesign, CartItem, CoffeeBean } from '../types';
import { GIFT_PACKAGING_OPTIONS, GIFT_CARD_DESIGNS, SPECIALTY_BEANS } from '../data/coffeeData';
import { Gift, Package, Heart, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, ShoppingBag, Send } from 'lucide-react';

interface GiftBuilderProps {
  addToCart: (item: CartItem) => void;
}

export const GiftBuilder: React.FC<GiftBuilderProps> = ({ addToCart }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Gift Set Selections
  const [selectedBeanId, setSelectedBeanId] = useState<string>('rd-red-dot-house');
  const [beanQuantityFormat, setBeanQuantityFormat] = useState<string>('2x 250g Whole Bean Bags');
  const [selectedPackagingId, setSelectedPackagingId] = useState<string>('pack-shophouse-canvas');
  const [selectedCardId, setSelectedCardId] = useState<string>('card-kallang-sunset');
  
  // Card Text
  const [recipientName, setRecipientName] = useState<string>('Mei Ling');
  const [senderName, setSenderName] = useState<string>('Bernard & Family');
  const [personalMessage, setPersonalMessage] = useState<string>('May your mornings be filled with the rich warmth of fresh Singapore Kallang roasts! Happy Birthday!');

  const selectedBean = SPECIALTY_BEANS.find(b => b.id === selectedBeanId) || SPECIALTY_BEANS[0];
  const selectedPackaging = GIFT_PACKAGING_OPTIONS.find(p => p.id === selectedPackagingId) || GIFT_PACKAGING_OPTIONS[0];
  const selectedCard = GIFT_CARD_DESIGNS.find(c => c.id === selectedCardId) || GIFT_CARD_DESIGNS[0];

  // Calculate gift set total
  const baseBeanPrice = selectedBean.price250g * 2;
  const giftSetTotal = baseBeanPrice + selectedPackaging.price + 5.00; // $5 card & gift assembly fee

  const handleAddGiftToCart = () => {
    addToCart({
      id: `gift-${Date.now()}`,
      title: `Artisanal Gift Set: ${selectedBean.name}`,
      subtitle: `${selectedPackaging.name} + Card for ${recipientName}`,
      unitPrice: giftSetTotal,
      quantity: 1,
      unitLabel: 'Custom Bespoke Gift Box',
      type: 'CUSTOM_GIFT',
      mode: 'B2C',
      image: selectedPackaging.image,
      details: {
        'Recipient': recipientName,
        'Sender': senderName,
        'Bean Selection': `${selectedBean.name} (${beanQuantityFormat})`,
        'Packaging': selectedPackaging.name,
        'Card Design': selectedCard.title,
        'Personal Note': personalMessage
      }
    });
  };

  return (
    <section id="gift-builder" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#F2EBDC] border border-[#E2D5C3] text-[#A64B29] text-xs font-bold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Interactive Bespoke Gift Set Builder</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1E1B]">
            Gift the Art of <span className="italic text-[#C85A32]">Singapore Specialty Coffee.</span>
          </h2>
          <p className="text-base text-[#5C4D49] leading-relaxed">
            Create a memorable experience for friends, corporate partners, or family. Choose fresh roasts, hand-drawn Singapore heritage packaging, and a personal card.
          </p>
        </div>

        {/* STEP PROGRESS INDICATOR */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-[#E8DFC8] -z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#C85A32] transition-all duration-500 -z-0"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            />

            {[
              { num: 1, label: 'Select Beans' },
              { num: 2, label: 'Choose Packaging' },
              { num: 3, label: 'Personalize Card' },
              { num: 4, label: 'Gift Preview' }
            ].map(step => (
              <button
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className={`relative z-10 flex flex-col items-center group cursor-pointer`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-md ${
                    currentStep === step.num
                      ? 'bg-[#C85A32] text-white ring-4 ring-[#FAF7F2]'
                      : currentStep > step.num
                      ? 'bg-[#2A1E1B] text-[#F5C28B]'
                      : 'bg-white text-[#8C7A75] border border-[#E8DFC8]'
                  }`}
                >
                  {currentStep > step.num ? <CheckCircle2 className="w-5 h-5" /> : step.num}
                </div>
                <span className="text-[11px] font-bold text-[#2A1E1B] mt-1.5 hidden sm:block">
                  {step.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* BUILDER WORKSPACE CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Builder Form Steps */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFC8] shadow-lg space-y-6">
            {/* STEP 1: SELECT BEANS */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-[#FAF2E6] pb-4">
                  <h3 className="font-serif text-2xl font-bold text-[#2A1E1B] flex items-center space-x-2">
                    <span>Step 1: Choose Your Specialty Coffee</span>
                  </h3>
                  <p className="text-xs text-[#6E5C57]">Select the freshly roasted beans to include in your gift box.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SPECIALTY_BEANS.map(bean => (
                    <button
                      type="button"
                      key={bean.id}
                      onClick={() => setSelectedBeanId(bean.id)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex space-x-3 ${
                        selectedBeanId === bean.id
                          ? 'bg-[#FAF2E6] border-[#C85A32] ring-2 ring-[#C85A32]/20 shadow-md'
                          : 'bg-[#FAF7F2] border-[#E8DFC8] hover:border-[#C85A32]/50'
                      }`}
                    >
                      <img src={bean.image} alt={bean.name} className="w-14 h-14 object-cover rounded-lg shrink-0" />
                      <div>
                        <div className="text-[10px] text-[#C85A32] font-bold uppercase">{bean.origin}</div>
                        <h4 className="font-serif text-sm font-bold text-[#2A1E1B]">{bean.name}</h4>
                        <p className="text-[11px] text-[#6E5C57] line-clamp-1">{bean.flavorNotes.join(', ')}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-[#2A1E1B] mb-2">Quantity & Format:</label>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {['2x 250g Whole Bean Bags', '1x 250g + 10x Drip Bag Box'].map(fmt => (
                      <button
                        type="button"
                        key={fmt}
                        onClick={() => setBeanQuantityFormat(fmt)}
                        className={`p-3 rounded-xl border font-semibold text-center cursor-pointer ${
                          beanQuantityFormat === fmt
                            ? 'bg-[#C85A32] text-white border-[#C85A32]'
                            : 'bg-[#FAF7F2] text-[#2A1E1B] border-[#E8DFC8]'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-2.5 bg-[#C85A32] text-white font-bold text-xs rounded-xl hover:bg-[#B04B26] transition-all flex items-center space-x-2 cursor-pointer shadow"
                  >
                    <span>Next: Choose Packaging</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE PACKAGING */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-[#FAF2E6] pb-4">
                  <h3 className="font-serif text-2xl font-bold text-[#2A1E1B]">
                    Step 2: Artisanal Singapore Packaging
                  </h3>
                  <p className="text-xs text-[#6E5C57]">Choose a sustainable keepsake container for your gift.</p>
                </div>

                <div className="space-y-4">
                  {GIFT_PACKAGING_OPTIONS.map(pack => (
                    <button
                      type="button"
                      key={pack.id}
                      onClick={() => setSelectedPackagingId(pack.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-center gap-4 ${
                        selectedPackagingId === pack.id
                          ? 'bg-[#FAF2E6] border-[#C85A32] ring-2 ring-[#C85A32]/20 shadow-md'
                          : 'bg-[#FAF7F2] border-[#E8DFC8] hover:border-[#C85A32]/50'
                      }`}
                    >
                      <img src={pack.image} alt={pack.name} className="w-full sm:w-24 h-24 object-cover rounded-lg shrink-0" />
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between items-baseline">
                          <span className="text-[10px] font-bold text-[#C85A32] uppercase">{pack.tag}</span>
                          <span className="font-serif font-bold text-[#2A1E1B]">${pack.price.toFixed(2)}</span>
                        </div>
                        <h4 className="font-serif text-base font-bold text-[#2A1E1B]">{pack.name}</h4>
                        <p className="text-xs text-[#6E5C57] leading-relaxed">{pack.description}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-2 bg-[#FAF7F2] text-[#2A1E1B] font-bold text-xs rounded-xl hover:bg-[#F2EBDC] transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 bg-[#C85A32] text-white font-bold text-xs rounded-xl hover:bg-[#B04B26] transition-all flex items-center space-x-2 cursor-pointer shadow"
                  >
                    <span>Next: Personalize Card</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PERSONALIZE CARD */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-[#FAF2E6] pb-4">
                  <h3 className="font-serif text-2xl font-bold text-[#2A1E1B]">
                    Step 3: Personalize Gift Card
                  </h3>
                  <p className="text-xs text-[#6E5C57]">Select artwork and write your heartfelt message.</p>
                </div>

                {/* Card Artwork Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#2A1E1B] mb-2">Select Card Artwork:</label>
                  <div className="grid grid-cols-3 gap-3">
                    {GIFT_CARD_DESIGNS.map(card => (
                      <button
                        type="button"
                        key={card.id}
                        onClick={() => setSelectedCardId(card.id)}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer space-y-1 ${
                          selectedCardId === card.id
                            ? 'bg-[#FAF2E6] border-[#C85A32] ring-2 ring-[#C85A32]/20'
                            : 'bg-[#FAF7F2] border-[#E8DFC8]'
                        }`}
                      >
                        <img src={card.previewUrl} alt={card.title} className="w-full h-16 object-cover rounded-lg" />
                        <div className="text-[10px] font-bold text-[#2A1E1B] truncate">{card.title}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Inputs */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2A1E1B] mb-1">Recipient Name:</label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E8DFC8] rounded-lg p-2 text-xs font-semibold focus:outline-none focus:border-[#C85A32]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2A1E1B] mb-1">Sender Name:</label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E8DFC8] rounded-lg p-2 text-xs font-semibold focus:outline-none focus:border-[#C85A32]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2A1E1B] mb-1">Personal Message:</label>
                    <textarea
                      rows={3}
                      value={personalMessage}
                      onChange={(e) => setPersonalMessage(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E8DFC8] rounded-lg p-2 text-xs focus:outline-none focus:border-[#C85A32]"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-2 bg-[#FAF7F2] text-[#2A1E1B] font-bold text-xs rounded-xl hover:bg-[#F2EBDC] transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="px-6 py-2.5 bg-[#C85A32] text-white font-bold text-xs rounded-xl hover:bg-[#B04B26] transition-all flex items-center space-x-2 cursor-pointer shadow"
                  >
                    <span>Next: Final Preview</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: FINAL SUMMARY & ADD TO CART */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-[#FAF2E6] pb-4">
                  <h3 className="font-serif text-2xl font-bold text-[#2A1E1B]">
                    Step 4: Confirm Your Gift Set
                  </h3>
                  <p className="text-xs text-[#6E5C57]">Review your customized Singapore coffee gift box.</p>
                </div>

                <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#E8DFC8] space-y-3 text-xs">
                  <div className="flex justify-between border-b border-[#E8DFC8] pb-2">
                    <span className="font-bold text-[#2A1E1B]">Coffee Bean:</span>
                    <span className="text-[#C85A32] font-semibold">{selectedBean.name} ({beanQuantityFormat})</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E8DFC8] pb-2">
                    <span className="font-bold text-[#2A1E1B]">Packaging:</span>
                    <span className="text-[#2A1E1B]">{selectedPackaging.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E8DFC8] pb-2">
                    <span className="font-bold text-[#2A1E1B]">Gift Card Design:</span>
                    <span className="text-[#2A1E1B]">{selectedCard.title}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E8DFC8] pb-2">
                    <span className="font-bold text-[#2A1E1B]">Recipient & Sender:</span>
                    <span className="text-[#2A1E1B]">For {recipientName} from {senderName}</span>
                  </div>
                  <div className="pt-1 text-[#6E5C57] italic">
                    "{personalMessage}"
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div>
                    <div className="text-[10px] text-[#8C7A75] font-bold uppercase">TOTAL GIFT PRICE</div>
                    <div className="text-2xl font-serif font-bold text-[#2A1E1B]">${giftSetTotal.toFixed(2)}</div>
                  </div>

                  <button
                    onClick={handleAddGiftToCart}
                    className="px-6 py-3 bg-[#C85A32] hover:bg-[#B04B26] text-white font-bold text-xs rounded-xl transition-all shadow-xl flex items-center space-x-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add Customized Gift Set to Cart</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Live 3D-Like Gift Preview Card Column */}
          <div className="lg:col-span-5 bg-[#2A1E1B] rounded-2xl p-6 text-white border border-[#3D2C28] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#3D2C28] pb-3">
              <span className="text-xs font-bold text-[#F5C28B] flex items-center space-x-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>Real-Time Gift Box Preview</span>
              </span>
              <span className="text-[10px] bg-[#3D2C28] text-[#E8DCCB] px-2 py-0.5 rounded font-mono">
                Red Dot Studio
              </span>
            </div>

            {/* Visual Box Rendering */}
            <div className="relative rounded-xl overflow-hidden bg-[#1D1412] p-4 border border-[#4A3530] space-y-4">
              <div className="relative h-40 rounded-lg overflow-hidden">
                <img src={selectedCard.previewUrl} alt={selectedCard.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[10px] font-bold text-[#F5C28B] uppercase">{selectedCard.theme}</div>
                  <div className="font-serif text-lg font-bold">{selectedCard.title}</div>
                </div>
              </div>

              {/* Card Message Text Simulation */}
              <div className="bg-[#FAF7F2] text-[#2A1E1B] p-4 rounded-lg space-y-2 border border-[#E8DFC8]">
                <div className="text-xs font-serif font-bold text-[#C85A32]">To: {recipientName}</div>
                <p className="text-xs italic leading-relaxed text-[#5C4D49]">{personalMessage}</p>
                <div className="text-xs font-serif font-bold text-right text-[#2A1E1B]">With Love, {senderName}</div>
              </div>

              <div className="text-[11px] text-[#CBB9A3] space-y-1">
                <div className="flex items-center space-x-1.5">
                  <Package className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>Packaging: {selectedPackaging.name}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>Bean: {selectedBean.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
