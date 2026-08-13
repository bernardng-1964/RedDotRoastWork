import React, { useState } from 'react';
import { Building2, X, Send, CheckCircle2, Coffee, ShieldCheck } from 'lucide-react';

interface WholesaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WholesaleModal: React.FC<WholesaleModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [monthlyKg, setMonthlyKg] = useState('20-50 kg');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] rounded-2xl max-w-lg w-full border border-[#E8DFC8] shadow-2xl overflow-hidden relative my-8">
        <div className="bg-[#2A1E1B] text-white p-5 flex items-center justify-between border-b border-[#3D2C28]">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-[#C85A32]" />
            <h3 className="font-serif text-lg font-bold">Request B2B Wholesale Quote & Free Sample Kit</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#CBB9A3] hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#C85A32] mx-auto" />
              <h4 className="font-serif text-2xl font-bold text-[#2A1E1B]">Wholesale Sample Kit Dispatched!</h4>
              <p className="text-xs text-[#6E5C57]">
                Thank you <span className="font-bold text-[#2A1E1B]">{contactPerson}</span> from <span className="font-bold text-[#2A1E1B]">{businessName}</span>. Your free 3x 100g specialty sample kit will be delivered via temperature-controlled van within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="mt-2 px-5 py-2 bg-[#C85A32] text-white text-xs font-bold rounded-xl hover:bg-[#B04B26] transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs text-[#6E5C57] leading-relaxed">
                Receive 3x 100g roasted bean samples (Red Dot House Blend, Ethiopia Aricha, Sumatra Gayo) and custom tiered pricing for your F&B establishment.
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A1E1B] mb-1">Company / Cafe Name *</label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Kallang Specialty Coffee"
                  className="w-full bg-white border border-[#E8DFC8] rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2A1E1B] mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Alex Lim"
                    className="w-full bg-white border border-[#E8DFC8] rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2A1E1B] mb-1">SG Phone (+65) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+65 9123 4567"
                    className="w-full bg-white border border-[#E8DFC8] rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A1E1B] mb-1">Business Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@kallangcoffee.sg"
                  className="w-full bg-white border border-[#E8DFC8] rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A1E1B] mb-1">Estimated Monthly Volume Requirement</label>
                <select
                  value={monthlyKg}
                  onChange={(e) => setMonthlyKg(e.target.value)}
                  className="w-full bg-white border border-[#E8DFC8] rounded-lg p-2.5 text-xs font-bold focus:outline-none focus:border-[#C85A32]"
                >
                  <option value="5-10 kg">5 - 10 kg / month</option>
                  <option value="20-50 kg">20 - 50 kg / month (Cafe Rate)</option>
                  <option value="50-100 kg">50 - 100 kg / month (Bulk Wholesale)</option>
                  <option value="100+ kg">100+ kg / month (Commercial Chain)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C85A32] hover:bg-[#B04B26] text-white font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Request Free Sample Kit & Wholesale Quote</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
