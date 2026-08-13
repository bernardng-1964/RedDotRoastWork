import React, { useState } from 'react';
import { Coffee, Phone, MapPin, Mail, Instagram, Facebook, Linkedin, ShieldCheck, QrCode, CreditCard, Send, CheckCircle2, FileText } from 'lucide-react';

interface FooterProps {
  setIsWholesaleModalOpen: (open: boolean) => void;
  setIsBlueprintModalOpen: (open: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ setIsWholesaleModalOpen, setIsBlueprintModalOpen }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#1F1513] text-[#FAF7F2] border-t border-[#3D2C28] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Newsletter & Coupon Drop Row */}
        <div className="bg-[#2A1E1B] rounded-2xl p-6 sm:p-8 border border-[#3D2C28] flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="font-serif text-2xl font-bold text-white">
              Subscribe for Micro-Lot Drops & Barista Recipes
            </h3>
            <p className="text-xs text-[#CBB9A3]">
              Get early access to rare anaerobic microlots and receive a <span className="text-[#F5C28B] font-bold">$10 Voucher Code</span> on your first order.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {newsletterSubscribed ? (
              <div className="bg-[#1D1412] p-3 px-5 rounded-xl border border-[#C85A32] flex items-center space-x-2 text-xs text-[#F5C28B]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Subscribed! Use code <code className="font-mono font-bold text-white bg-[#C85A32] px-1.5 py-0.5 rounded">REDDOT10</code> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full sm:w-96">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-[#181110] border border-[#4A3530] text-xs text-white px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-[#C85A32] flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C85A32] hover:bg-[#B04B26] text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-1 cursor-pointer shrink-0 shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Get $10 Off</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Column Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-xs text-[#CBB9A3]">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#C85A32] flex items-center justify-center text-white font-bold">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold text-white">Red Dot Roastworks</span>
            </div>

            <p className="text-[#A6917A] leading-relaxed">
              From Local Roasts to Café Customization. Singapore's premier specialty coffee platform for local roasts, B2B cafe wholesale, machine rentals, and custom gift sets.
            </p>

            <div className="space-y-1.5 text-xs text-[#E8DCCB]">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>12 Kallang Way, #02-01 Red Dot Building, Singapore 349144</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>+65 6742 8888 (Hotline & WhatsApp Business)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>roastery@reddotroastworks.sg</span>
              </div>
            </div>
          </div>

          {/* Quick Links B2B */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">B2B Solutions</h4>
            <ul className="space-y-2">
              <li><a href="#inventory" className="hover:text-white transition-colors">Wholesale Beans (20kg+)</a></li>
              <li><a href="#b2b-commercial" className="hover:text-white transition-colors">Commercial Machine Lease</a></li>
              <li><a href="#b2b-commercial" className="hover:text-white transition-colors">Private Labeling Program</a></li>
              <li>
                <button onClick={() => setIsWholesaleModalOpen(true)} className="hover:text-[#F5C28B] text-[#C85A32] font-semibold text-left">
                  Request Sample Kit
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links B2C */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">For Home Enthusiasts</h4>
            <ul className="space-y-2">
              <li><a href="#inventory" className="hover:text-white transition-colors">Fresh 250g Roasts</a></li>
              <li><a href="#gift-builder" className="hover:text-white transition-colors">Custom Gift Set Builder</a></li>
              <li><a href="#coffee-quiz" className="hover:text-white transition-colors">Find Your Brew Quiz</a></li>
              <li><a href="#logistics" className="hover:text-white transition-colors">Singapore Delivery Matrix</a></li>
            </ul>
          </div>

          {/* Compliance & Architectural Blueprint */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Standards & Specifications</h4>
            <div className="bg-[#2A1E1B] p-4 rounded-xl border border-[#3D2C28] space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-[#F5C28B]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SFA Grade A Hygiene License #S349144</span>
              </div>
              <p className="text-[11px] text-[#A6917A]">
                Nitrogen-flushed packaging with batch traceability QR codes.
              </p>
              <button
                onClick={() => setIsBlueprintModalOpen(true)}
                className="w-full mt-2 py-2 bg-[#3D2C28] hover:bg-[#4D3833] text-[#F5C28B] rounded-lg text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Architecture & Conversion Sheet</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Payment Partner Badges & Copyright */}
        <div className="pt-8 border-t border-[#3D2C28] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7A75]">
          <div>
            © 2026 Red Dot Roastworks Pte. Ltd. All rights reserved. Built for Singapore Specialty Coffee.
          </div>

          {/* Payment Partner Icons */}
          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-bold text-[#A6917A] uppercase">Payment Partners:</span>
            <div className="flex items-center space-x-2 text-[#CBB9A3]">
              <span className="px-2 py-1 rounded bg-[#2A1E1B] border border-[#3D2C28] font-bold text-[10px] text-emerald-400">
                PayNow SG
              </span>
              <span className="px-2 py-1 rounded bg-[#2A1E1B] border border-[#3D2C28] font-bold text-[10px]">
                Stripe
              </span>
              <span className="px-2 py-1 rounded bg-[#2A1E1B] border border-[#3D2C28] font-bold text-[10px]">
                GrabPay
              </span>
              <span className="px-2 py-1 rounded bg-[#2A1E1B] border border-[#3D2C28] font-bold text-[10px]">
                Visa / MC
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
