import React, { useState } from 'react';
import { SAMPLE_ORDER_TRACKING, SG_POSTAL_DATABASE } from '../data/coffeeData';
import { Truck, ShieldCheck, Clock, Search, MapPin, CheckCircle2, ChevronRight, AlertCircle, Package } from 'lucide-react';

export const LogisticsBar: React.FC = () => {
  const [trackingInput, setTrackingInput] = useState<string>('RDR-SG-8842');
  const [activeTracking, setActiveTracking] = useState<typeof SAMPLE_ORDER_TRACKING | null>(SAMPLE_ORDER_TRACKING);
  const [postalInput, setPostalInput] = useState<string>('');
  const [postalLookupResult, setPostalLookupResult] = useState<{ address: string; district: string } | null>(null);

  const handleTrackingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInput.toUpperCase().trim() === 'RDR-SG-8842') {
      setActiveTracking(SAMPLE_ORDER_TRACKING);
    } else {
      setActiveTracking({
        ...SAMPLE_ORDER_TRACKING,
        orderId: trackingInput.toUpperCase(),
        customerName: 'Singapore Specialty Customer',
        status: 'SFA Food-Safe Roasting'
      });
    }
  };

  const handlePostalLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = postalInput.trim();
    if (SG_POSTAL_DATABASE[cleanCode]) {
      setPostalLookupResult(SG_POSTAL_DATABASE[cleanCode]);
    } else if (cleanCode.length === 6) {
      setPostalLookupResult({
        address: `Block ${cleanCode.slice(0, 3)} Singapore Postal Zone #${cleanCode.slice(3)}`,
        district: 'Singapore Central Cold-Chain Delivery Zone'
      });
    } else {
      setPostalLookupResult(null);
    }
  };

  return (
    <section id="logistics" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#2A1E1B] text-white">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#3D2C28] border border-[#5C433E] text-[#F5C28B] text-xs font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Singapore Islandwide Cold-Chain Logistics & SFA Standard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Food-Safe Delivery.{' '}
            <span className="italic text-[#F5C28B]">Precision Traceability.</span>
          </h2>
          <p className="text-base text-[#CBB9A3] leading-relaxed">
            Every batch roasted at our Kallang facility is packaged under SFA Grade A hygiene conditions and dispatched via temperature-monitored vans.
          </p>
        </div>

        {/* LOGISTICS TIMELINE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1F1513] p-6 rounded-2xl border border-[#3D2C28] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#3D2C28] text-[#C85A32] flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Same-Day 12 PM Cutoff</h3>
            <p className="text-xs text-[#A6917A] leading-relaxed">
              Place your wholesale or retail roast order before 12 PM for same-day afternoon dispatch across Singapore. Orders after 12 PM dispatched next morning.
            </p>
          </div>

          <div className="bg-[#1F1513] p-6 rounded-2xl border border-[#3D2C28] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#3D2C28] text-[#C85A32] flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-serif text-xl font-bold text-white">SFA Grade A Food Hygiene</h3>
            <p className="text-xs text-[#A6917A] leading-relaxed">
              Certified by the Singapore Food Agency (SFA). Nitrogen-flushed valve bags prevent oxidation, locking in peak aromatics for up to 90 days.
            </p>
          </div>

          <div className="bg-[#1F1513] p-6 rounded-2xl border border-[#3D2C28] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#3D2C28] text-[#C85A32] flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-serif text-xl font-bold text-white">Temperature-Controlled Fleet</h3>
            <p className="text-xs text-[#A6917A] leading-relaxed">
              Our dedicated van fleet maintains 18°C–22°C ambient temperatures during transport to prevent thermal breakdown of aromatic coffee oils.
            </p>
          </div>
        </div>

        {/* LIVE ORDER TRACKING & POSTAL LOOKUP SIMULATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Tracking Simulator Box */}
          <div className="lg:col-span-8 bg-[#1F1513] rounded-2xl p-6 sm:p-8 border border-[#3D2C28] space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#3D2C28] pb-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white flex items-center space-x-2">
                  <Package className="w-5 h-5 text-[#C85A32]" />
                  <span>Live Order Tracking Simulator</span>
                </h3>
                <p className="text-xs text-[#A6917A]">
                  Test tracking code <code className="bg-[#2A1E1B] text-[#F5C28B] px-1.5 py-0.5 rounded">RDR-SG-8842</code> to view real-time Kallang roastery dispatch updates.
                </p>
              </div>

              <form onSubmit={handleTrackingSearch} className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  placeholder="e.g. RDR-SG-8842"
                  className="bg-[#2A1E1B] border border-[#4A3530] text-xs text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#C85A32] w-full sm:w-40 uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C85A32] hover:bg-[#B04B26] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Track Order
                </button>
              </form>
            </div>

            {activeTracking && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-[#2A1E1B] p-4 rounded-xl border border-[#3D2C28] flex flex-col sm:flex-row justify-between gap-4 text-xs">
                  <div>
                    <div className="text-[10px] text-[#A6917A] uppercase font-bold">ORDER ID & RECIPIENT</div>
                    <div className="font-bold text-white text-sm">{activeTracking.orderId}</div>
                    <div className="text-[#CBB9A3]">{activeTracking.customerName}</div>
                  </div>

                  <div>
                    <div className="text-[10px] text-[#A6917A] uppercase font-bold">ESTIMATED ARRIVAL</div>
                    <div className="font-bold text-[#F5C28B] text-sm">{activeTracking.estimatedDelivery}</div>
                    <div className="text-[#A6917A]">{activeTracking.driverName}</div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#3D2C28]">
                  {activeTracking.timeline.map((step, idx) => (
                    <div key={idx} className="relative flex items-start space-x-4 pl-8">
                      <div
                        className={`absolute left-1.5 top-1 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          step.completed
                            ? 'bg-[#C85A32] text-white'
                            : step.current
                            ? 'bg-[#F5C28B] text-[#2A1E1B] animate-pulse'
                            : 'bg-[#3D2C28] text-[#8C7A75]'
                        }`}
                      >
                        {step.completed && '✓'}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${step.completed || step.current ? 'text-white' : 'text-[#8C7A75]'}`}>
                          {step.title}
                        </div>
                        <div className="text-[10px] text-[#A6917A]">{step.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Postal Code Address Auto-Fill Lookup Column */}
          <div className="lg:col-span-4 bg-[#1F1513] rounded-2xl p-6 sm:p-8 border border-[#3D2C28] space-y-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-white flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-[#C85A32]" />
                <span>Singapore Postal Code Lookup</span>
              </h3>
              <p className="text-xs text-[#A6917A] mt-1">
                Verify delivery zone eligibility and same-day van slot availability for your 6-digit SG postal code.
              </p>
            </div>

            <form onSubmit={handlePostalLookup} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#CBB9A3] mb-1">Enter 6-Digit SG Postal Code:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 048582 or 349144"
                    value={postalInput}
                    onChange={(e) => setPostalInput(e.target.value)}
                    className="flex-1 bg-[#2A1E1B] border border-[#4A3530] text-xs font-mono text-white p-2.5 rounded-lg focus:outline-none focus:border-[#C85A32]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#C85A32] text-white text-xs font-bold rounded-lg hover:bg-[#B04B26] transition-colors cursor-pointer"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </form>

            {postalLookupResult && (
              <div className="bg-[#2A1E1B] p-4 rounded-xl border border-[#C85A32]/40 space-y-2 animate-fadeIn">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#F5C28B]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>ZONE ELIGIBLE FOR SAME-DAY DISPATCH</span>
                </div>
                <div className="text-xs text-white font-semibold">{postalLookupResult.address}</div>
                <div className="text-[11px] text-[#A6917A]">{postalLookupResult.district}</div>
              </div>
            )}

            <div className="text-xs text-[#A6917A] space-y-2 pt-2 border-t border-[#3D2C28]">
              <div className="font-bold text-[#CBB9A3]">Delivery Fee Matrix:</div>
              <div className="flex justify-between">
                <span>B2C Orders over $150:</span>
                <span className="text-emerald-400 font-bold">FREE Islandwide</span>
              </div>
              <div className="flex justify-between">
                <span>B2B Wholesale Orders over $300:</span>
                <span className="text-emerald-400 font-bold">FREE Priority Fleet</span>
              </div>
              <div className="flex justify-between">
                <span>Standard Delivery (&lt;$150):</span>
                <span>$8.00 Flat Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
