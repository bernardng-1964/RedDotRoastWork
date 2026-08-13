import React from 'react';
import { ARCHITECTURAL_SPECS } from '../data/coffeeData';
import { FileText, X, Layers, LayoutGrid, Type, Target, CheckCircle2 } from 'lucide-react';

interface BlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlueprintModal: React.FC<BlueprintModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<'SITEMAP' | 'HIERARCHY' | 'COPY_MATRIX' | 'BMC'>('SITEMAP');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] rounded-2xl max-w-4xl w-full border border-[#E8DFC8] shadow-2xl overflow-hidden relative my-8 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#2A1E1B] text-white p-5 flex items-center justify-between border-b border-[#3D2C28]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C85A32] flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Red Dot Roastworks — Architectural & Conversion Specs</h3>
              <p className="text-[10px] text-[#F5C28B]">Deliverable #1 & #3 Technical Roadmap & Copy Matrix</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#CBB9A3] hover:text-white rounded-lg hover:bg-[#3D2C28]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Bar */}
        <div className="bg-[#1F1513] px-4 py-2 flex space-x-2 border-b border-[#3D2C28] text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('SITEMAP')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'SITEMAP' ? 'bg-[#C85A32] text-white' : 'text-[#CBB9A3] hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>1. Sitemap & Architecture</span>
          </button>
          <button
            onClick={() => setActiveTab('HIERARCHY')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'HIERARCHY' ? 'bg-[#C85A32] text-white' : 'text-[#CBB9A3] hover:text-white'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>2. Visual Hierarchy</span>
          </button>
          <button
            onClick={() => setActiveTab('COPY_MATRIX')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'COPY_MATRIX' ? 'bg-[#C85A32] text-white' : 'text-[#CBB9A3] hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>3. Conversion Copywriting</span>
          </button>
          <button
            onClick={() => setActiveTab('BMC')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'BMC' ? 'bg-[#C85A32] text-white' : 'text-[#CBB9A3] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4. BMC Context</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* TAB 1: SITEMAP & ARCHITECTURE */}
          {activeTab === 'SITEMAP' && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#2A1E1B]">High-Level Sitemap & UI Component Roadmap</h4>
              <div className="border border-[#E8DFC8] rounded-xl overflow-hidden bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#FAF2E6] text-[#2A1E1B] font-serif font-bold border-b border-[#E8DFC8]">
                      <th className="p-3">Section / Module</th>
                      <th className="p-3">Route Hash</th>
                      <th className="p-3">Functional Description</th>
                      <th className="p-3">Target Audience</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FAF2E6]">
                    {ARCHITECTURAL_SPECS.sitemap.map((item, i) => (
                      <tr key={i} className="hover:bg-[#FAF7F2]">
                        <td className="p-3 font-bold text-[#2A1E1B]">{item.page}</td>
                        <td className="p-3 font-mono text-[#C85A32]">{item.route}</td>
                        <td className="p-3 text-[#5C4D49]">{item.description}</td>
                        <td className="p-3 font-semibold text-[#8C4A29]">{item.targetAudience}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: VISUAL HIERARCHY */}
          {activeTab === 'HIERARCHY' && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#2A1E1B]">Visual Hierarchy & Typographic Palette</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ARCHITECTURAL_SPECS.visualHierarchy.map((h, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-[#E8DFC8] space-y-1.5">
                    <div className="font-serif font-bold text-sm text-[#C85A32]">{h.level}</div>
                    <div className="font-mono text-[11px] text-[#2A1E1B] font-semibold">{h.font}</div>
                    <div className="text-[#6E5C57]">{h.color}</div>
                    <div className="text-[#8C7A75] italic pt-1 border-t border-[#FAF2E6]">Usage: {h.usage}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CONVERSION COPYWRITING MATRIX */}
          {activeTab === 'COPY_MATRIX' && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#2A1E1B]">Conversion Copywriting Sheet</h4>
              <div className="space-y-4">
                {ARCHITECTURAL_SPECS.conversionCopyMatrix.map((c, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl border border-[#E8DFC8] space-y-3">
                    <div className="flex justify-between items-center border-b border-[#FAF2E6] pb-2">
                      <span className="font-serif font-bold text-base text-[#2A1E1B]">{c.component}</span>
                      <span className="bg-[#FAF2E6] text-[#C85A32] px-2.5 py-0.5 rounded font-mono font-bold text-[10px]">
                        CTA: {c.ctaText}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#8C7A75] uppercase">Main Headline</span>
                      <p className="font-serif font-bold text-sm text-[#C85A32]">"{c.headline}"</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E8DFC8]">
                        <span className="font-bold text-[#2A1E1B]">B2B Wholesale Pitch:</span>
                        <p className="text-[#5C4D49] mt-0.5">{c.b2bCopy}</p>
                      </div>
                      <div className="bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E8DFC8]">
                        <span className="font-bold text-[#2A1E1B]">B2C Consumer Pitch:</span>
                        <p className="text-[#5C4D49] mt-0.5">{c.b2cCopy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BMC CONTEXT */}
          {activeTab === 'BMC' && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#2A1E1B]">Business Model Canvas (BMC) Alignment Summary</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#E8DFC8] space-y-2">
                  <h5 className="font-serif font-bold text-sm text-[#C85A32]">B2B Customer Segment</h5>
                  <p className="text-[#5C4D49]">Cafes, chains, commercial partners requiring specialty beans, machine rentals, and custom roasted recipes with 30-day payment terms.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#E8DFC8] space-y-2">
                  <h5 className="font-serif font-bold text-sm text-[#C85A32]">B2C Customer Segment</h5>
                  <p className="text-[#5C4D49]">Home coffee enthusiasts seeking fresh weekly in-house Kallang roasts, custom gift sets with SG artwork, and personalized brew guides.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#E8DFC8] space-y-2">
                  <h5 className="font-serif font-bold text-sm text-[#C85A32]">Singapore Logistics & SFA</h5>
                  <p className="text-[#5C4D49]">SFA Grade A Hygiene Certified roastery in Kallang. Temperature-monitored islandwide delivery before 12 PM cutoff.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-[#E8DFC8] space-y-2">
                  <h5 className="font-serif font-bold text-sm text-[#C85A32]">Core Value Propositions</h5>
                  <p className="text-[#5C4D49]">Transparent bean sourcing, Q-score cupping notes, bulk tiered wholesale discounts, and bespoke private label creation.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
