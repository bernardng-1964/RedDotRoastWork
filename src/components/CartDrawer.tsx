import React, { useState } from 'react';
import { CartItem, UserMode } from '../types';
import { ShoppingBag, X, Trash2, Plus, Minus, CreditCard, Building2, QrCode, CheckCircle2, ArrowRight, MapPin } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  mode: UserMode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeItem,
  clearCart,
  mode
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'CART' | 'CHECKOUT' | 'PAYNOW_QR' | 'CONFIRMED'>('CART');
  const [paymentMethod, setPaymentMethod] = useState<'PAYNOW' | 'STRIPE' | 'B2B_INVOICE'>('PAYNOW');
  const [postalCode, setPostalCode] = useState<string>('048582');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal >= 150 ? 0 : 8.00;
  const grandTotal = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'PAYNOW') {
      setCheckoutStep('PAYNOW_QR');
    } else {
      setCheckoutStep('CONFIRMED');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col justify-between border-l border-[#E8DFC8] animate-slideLeft relative">
        {/* Header */}
        <div className="bg-[#2A1E1B] text-white p-4 flex items-center justify-between border-b border-[#3D2C28]">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#C85A32]" />
            <h3 className="font-serif text-lg font-bold">Your Coffee Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#CBB9A3] hover:text-white rounded-lg hover:bg-[#3D2C28] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {checkoutStep === 'CART' && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-[#C85A32] mx-auto opacity-40" />
                  <p className="text-sm font-serif font-bold text-[#2A1E1B]">Your cart is currently empty.</p>
                  <p className="text-xs text-[#6E5C57]">Explore our Kallang fresh roasts or B2B machine rentals to add items.</p>
                  <button
                    onClick={onClose}
                    className="mt-2 px-4 py-2 bg-[#C85A32] text-white text-xs font-bold rounded-xl hover:bg-[#B04B26] transition-colors cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div
                      key={item.id}
                      className="bg-white p-3.5 rounded-xl border border-[#E8DFC8] shadow-sm flex items-center space-x-3"
                    >
                      <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-lg shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs font-bold text-[#2A1E1B] truncate">{item.title}</h4>
                        <p className="text-[10px] text-[#6E5C57]">{item.subtitle}</p>
                        <div className="text-xs font-serif font-bold text-[#C85A32] mt-1">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center space-x-1.5 bg-[#FAF7F2] p-1 rounded-lg border border-[#E8DFC8]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-[#6E5C57] hover:text-[#2A1E1B] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#2A1E1B] px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-[#6E5C57] hover:text-[#2A1E1B] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'CHECKOUT' && (
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-serif text-base font-bold text-[#2A1E1B]">Customer & Delivery Information</h4>
                <div>
                  <label className="block text-xs font-bold text-[#6E5C57]">Full Name / Company Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Tan Ah Hock / Katong Bistro"
                    className="w-full bg-white border border-[#E8DFC8] rounded-lg p-2 text-xs font-semibold focus:outline-none focus:border-[#C85A32]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-[#6E5C57]">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="tan@domain.sg"
                      className="w-full bg-white border border-[#E8DFC8] rounded-lg p-2 text-xs focus:outline-none focus:border-[#C85A32]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6E5C57]">SG Phone (+65) *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+65 9123 4567"
                      className="w-full bg-white border border-[#E8DFC8] rounded-lg p-2 text-xs focus:outline-none focus:border-[#C85A32]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6E5C57]">Singapore Postal Code (6 Digits) *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-white border border-[#E8DFC8] rounded-lg p-2 text-xs font-mono font-bold focus:outline-none focus:border-[#C85A32]"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2 pt-2 border-t border-[#E8DFC8]">
                <h4 className="font-serif text-base font-bold text-[#2A1E1B]">Select Payment Option</h4>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('PAYNOW')}
                    className={`w-full text-left p-3 rounded-xl border flex items-center justify-between text-xs cursor-pointer ${
                      paymentMethod === 'PAYNOW'
                        ? 'bg-[#FAF2E6] border-[#C85A32] ring-2 ring-[#C85A32]/20 font-bold'
                        : 'bg-white border-[#E8DFC8]'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <QrCode className="w-4 h-4 text-[#C85A32]" />
                      <span>PayNow SG Instant QR Code</span>
                    </div>
                    <span className="text-[10px] bg-[#C85A32] text-white px-2 py-0.5 rounded font-bold">0% FEE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('STRIPE')}
                    className={`w-full text-left p-3 rounded-xl border flex items-center justify-between text-xs cursor-pointer ${
                      paymentMethod === 'STRIPE'
                        ? 'bg-[#FAF2E6] border-[#C85A32] ring-2 ring-[#C85A32]/20 font-bold'
                        : 'bg-white border-[#E8DFC8]'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-[#C85A32]" />
                      <span>Credit / Debit Card (Stripe)</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('B2B_INVOICE')}
                    className={`w-full text-left p-3 rounded-xl border flex items-center justify-between text-xs cursor-pointer ${
                      paymentMethod === 'B2B_INVOICE'
                        ? 'bg-[#FAF2E6] border-[#C85A32] ring-2 ring-[#C85A32]/20 font-bold'
                        : 'bg-white border-[#E8DFC8]'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-[#C85A32]" />
                      <span>B2B 30-Day Corporate Invoice</span>
                    </div>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C85A32] hover:bg-[#B04B26] text-white font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer mt-4"
              >
                <span>Proceed to Confirmation (${grandTotal.toFixed(2)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {checkoutStep === 'PAYNOW_QR' && (
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] text-center space-y-4">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#2A1E1B] text-[#F5C28B] rounded-full text-xs font-bold uppercase">
                <QrCode className="w-3.5 h-3.5" />
                <span>PayNow SG QR Generated</span>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFC8] inline-block mx-auto">
                {/* Simulated PayNow QR Graphic */}
                <div className="w-44 h-44 bg-white border-2 border-[#2A1E1B] rounded-lg p-2 flex flex-col items-center justify-between mx-auto shadow-inner">
                  <div className="bg-[#A64B29] text-white text-[10px] font-bold w-full py-0.5 rounded">
                    PayNow SG UEN: 202612345R
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 p-2 bg-[#FAF7F2] w-full h-28 rounded">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className={`rounded-sm ${i % 3 === 0 ? 'bg-[#2A1E1B]' : 'bg-[#C85A32]'}`} />
                    ))}
                  </div>
                  <div className="text-[9px] font-mono text-[#2A1E1B] font-bold">RED DOT ROASTWORKS SG</div>
                </div>
              </div>

              <div className="text-xs space-y-1">
                <div className="font-bold text-[#2A1E1B]">Total Payable: <span className="text-[#C85A32] text-lg font-serif">${grandTotal.toFixed(2)}</span></div>
                <p className="text-[11px] text-[#6E5C57]">Scan using DBS PayLah!, OCBC Digital, UOB TMRW, or GrabPay app.</p>
              </div>

              <button
                onClick={() => setCheckoutStep('CONFIRMED')}
                className="w-full py-3 bg-[#2A1E1B] hover:bg-[#3D2C28] text-[#F5C28B] font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Simulate Payment Verification Success ✓
              </button>
            </div>
          )}

          {checkoutStep === 'CONFIRMED' && (
            <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#C85A32] mx-auto" />
              <h4 className="font-serif text-2xl font-bold text-[#2A1E1B]">Order Confirmed!</h4>
              <p className="text-xs text-[#6E5C57]">
                Thank you <span className="font-bold text-[#2A1E1B]">{customerName || 'Valued Customer'}</span>. Order <code className="bg-[#FAF2E6] text-[#C85A32] font-bold px-1.5 py-0.5 rounded">RDR-SG-8842</code> is queued for Kallang SFA food-safe roasting and cold-chain dispatch to postal code <span className="font-mono font-bold text-[#2A1E1B]">{postalCode}</span>.
              </p>
              <button
                onClick={() => {
                  clearCart();
                  setCheckoutStep('CART');
                  onClose();
                }}
                className="w-full py-2.5 bg-[#C85A32] text-white font-bold text-xs rounded-xl hover:bg-[#B04B26] transition-colors cursor-pointer"
              >
                Return to Storefront
              </button>
            </div>
          )}
        </div>

        {/* Footer Subtotal */}
        {cart.length > 0 && checkoutStep === 'CART' && (
          <div className="p-4 bg-white border-t border-[#E8DFC8] space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#6E5C57]">
                <span>Subtotal:</span>
                <span className="font-bold text-[#2A1E1B]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6E5C57]">
                <span>Singapore Delivery Fee:</span>
                <span className="font-bold text-[#2A1E1B]">
                  {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE ($150+ Threshold)</span> : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-serif font-bold text-[#2A1E1B] border-t border-[#E8DFC8] pt-2">
                <span>Grand Total:</span>
                <span className="text-[#C85A32] text-lg">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutStep('CHECKOUT')}
              className="w-full py-3 bg-[#C85A32] hover:bg-[#B04B26] text-white font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
