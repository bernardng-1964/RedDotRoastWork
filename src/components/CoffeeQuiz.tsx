import React, { useState } from 'react';
import { QuizState, CartItem, CoffeeBean } from '../types';
import { SPECIALTY_BEANS } from '../data/coffeeData';
import { Sparkles, RotateCcw, CheckCircle2, Play, Pause, ShoppingBag, Coffee, ArrowRight, Timer } from 'lucide-react';

interface CoffeeQuizProps {
  addToCart: (item: CartItem) => void;
}

export const CoffeeQuiz: React.FC<CoffeeQuizProps> = ({ addToCart }) => {
  const [quizState, setQuizState] = useState<QuizState>({
    step: 1,
    brewMethod: 'Pourover Drip',
    flavorPreference: 'Bright, Floral & Wild Berry',
    milkPreference: 'Pure Black',
    experienceLevel: 'Enthusiast'
  });

  const [matchedBean, setMatchedBean] = useState<CoffeeBean | null>(null);

  // Timer state for interactive brew guide
  const [timerSeconds, setTimerSeconds] = useState<number>(150); // 2m 30s default
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  React.useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleCalculateMatch = () => {
    // Match logic
    if (quizState.flavorPreference.includes('Floral') || quizState.brewMethod.includes('Pourover')) {
      setMatchedBean(SPECIALTY_BEANS.find(b => b.id === 'rd-ethiopia-aricha') || SPECIALTY_BEANS[1]);
    } else if (quizState.flavorPreference.includes('Deep') || quizState.brewMethod.includes('Traditional')) {
      setMatchedBean(SPECIALTY_BEANS.find(b => b.id === 'rd-nanyang-artisan-roast') || SPECIALTY_BEANS[4]);
    } else {
      setMatchedBean(SPECIALTY_BEANS.find(b => b.id === 'rd-red-dot-house') || SPECIALTY_BEANS[0]);
    }
    setQuizState(prev => ({ ...prev, step: 4 }));
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <section id="coffee-quiz" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#F4EFE6] to-[#FAF7F2]">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#F2EBDC] border border-[#E2D5C3] text-[#A64B29] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Interactive Taste & Brew Matching Guide</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A1E1B]">
            Find Your <span className="italic text-[#C85A32]">Perfect Brew Match.</span>
          </h2>
          <p className="text-sm text-[#5C4D49]">
            Answer 3 quick questions about your home brewing setup and flavor preferences to receive your bespoke recommendation.
          </p>
        </div>

        {/* QUIZ CONTAINER CARD */}
        <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-10 shadow-xl space-y-8">
          {quizState.step < 4 && (
            <div className="space-y-6">
              {/* Step Indicators */}
              <div className="flex justify-between items-center text-xs text-[#8C7A75] font-bold pb-2 border-b border-[#FAF2E6]">
                <span>QUESTION {quizState.step} OF 3</span>
                <span className="text-[#C85A32]">Step {quizState.step}/3</span>
              </div>

              {/* QUESTION 1 */}
              {quizState.step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="font-serif text-2xl font-bold text-[#2A1E1B]">
                    1. How do you usually brew your coffee at home?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { name: 'Pourover Drip (V60 / Chemex)', desc: 'Clean, tea-like clarity & bright floral notes' },
                      { name: 'Espresso Machine / Moka Pot', desc: 'Concentrated shot with rich crema' },
                      { name: 'Traditional Kopi Cloth Filter', desc: 'Bold caramel body with condensed milk' },
                      { name: 'French Press / Aeropress / Cold Brew', desc: 'Syrupy body and deep smooth finish' }
                    ].map(opt => (
                      <button
                        type="button"
                        key={opt.name}
                        onClick={() => setQuizState(prev => ({ ...prev, brewMethod: opt.name }))}
                        className={`text-left p-4 rounded-xl border transition-all cursor-pointer space-y-1 ${
                          quizState.brewMethod === opt.name
                            ? 'bg-[#FAF2E6] border-[#C85A32] ring-2 ring-[#C85A32]/20 shadow-sm'
                            : 'bg-[#FAF7F2] border-[#E8DFC8] hover:border-[#C85A32]/50'
                        }`}
                      >
                        <div className="font-serif font-bold text-[#2A1E1B] text-sm">{opt.name}</div>
                        <div className="text-xs text-[#6E5C57]">{opt.desc}</div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setQuizState(prev => ({ ...prev, step: 2 }))}
                      className="px-6 py-2.5 bg-[#C85A32] hover:bg-[#B04B26] text-white font-bold text-xs rounded-xl transition-all flex items-center space-x-2 cursor-pointer shadow"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* QUESTION 2 */}
              {quizState.step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="font-serif text-2xl font-bold text-[#2A1E1B]">
                    2. What flavor profiles excite your palate?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { name: 'Bright, Floral & Wild Berry', notes: 'Jasmine, Blueberry, Citrus Acidity' },
                      { name: 'Balanced, Chocolate & Nutty', notes: 'Dark Chocolate, Toasted Almond, Caramel' },
                      { name: 'Deep, Smoky & Earthy Treacle', notes: 'Cedar, Dark Sugar, Pipe Tobacco' }
                    ].map(opt => (
                      <button
                        type="button"
                        key={opt.name}
                        onClick={() => setQuizState(prev => ({ ...prev, flavorPreference: opt.name }))}
                        className={`text-left p-4 rounded-xl border transition-all cursor-pointer space-y-1 ${
                          quizState.flavorPreference === opt.name
                            ? 'bg-[#FAF2E6] border-[#C85A32] ring-2 ring-[#C85A32]/20 shadow-sm'
                            : 'bg-[#FAF7F2] border-[#E8DFC8] hover:border-[#C85A32]/50'
                        }`}
                      >
                        <div className="font-serif font-bold text-[#2A1E1B] text-sm">{opt.name}</div>
                        <div className="text-xs text-[#6E5C57]">{opt.notes}</div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setQuizState(prev => ({ ...prev, step: 1 }))}
                      className="px-4 py-2 bg-[#FAF7F2] text-[#2A1E1B] font-bold text-xs rounded-xl hover:bg-[#F2EBDC] transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setQuizState(prev => ({ ...prev, step: 3 }))}
                      className="px-6 py-2.5 bg-[#C85A32] hover:bg-[#B04B26] text-white font-bold text-xs rounded-xl transition-all flex items-center space-x-2 cursor-pointer shadow"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* QUESTION 3 */}
              {quizState.step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="font-serif text-2xl font-bold text-[#2A1E1B]">
                    3. How do you enjoy drinking your coffee?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { name: 'Pure Black (Filter / Espresso)', desc: 'Clean origin flavor notes' },
                      { name: 'Creamy Milk Latte / Flat White', desc: 'Silky microfoam harmony' },
                      { name: 'Condensed Milk / Iced Sweetened', desc: 'Traditional rich Singapore Kopi' }
                    ].map(opt => (
                      <button
                        type="button"
                        key={opt.name}
                        onClick={() => setQuizState(prev => ({ ...prev, milkPreference: opt.name }))}
                        className={`text-left p-4 rounded-xl border transition-all cursor-pointer space-y-1 ${
                          quizState.milkPreference === opt.name
                            ? 'bg-[#FAF2E6] border-[#C85A32] ring-2 ring-[#C85A32]/20 shadow-sm'
                            : 'bg-[#FAF7F2] border-[#E8DFC8] hover:border-[#C85A32]/50'
                        }`}
                      >
                        <div className="font-serif font-bold text-[#2A1E1B] text-sm">{opt.name}</div>
                        <div className="text-xs text-[#6E5C57]">{opt.desc}</div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setQuizState(prev => ({ ...prev, step: 2 }))}
                      className="px-4 py-2 bg-[#FAF7F2] text-[#2A1E1B] font-bold text-xs rounded-xl hover:bg-[#F2EBDC] transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleCalculateMatch}
                      className="px-7 py-3 bg-[#C85A32] hover:bg-[#B04B26] text-white font-bold text-xs rounded-xl transition-all flex items-center space-x-2 cursor-pointer shadow-lg"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Calculate My Brew Match</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: RESULT MATCH DISPLAY */}
          {quizState.step === 4 && matchedBean && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-[#FAF2E6] p-6 rounded-2xl border border-[#C85A32]/30 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center space-x-2 bg-[#C85A32] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>98.4% PERFECT BREW MATCH</span>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-[#2A1E1B]">{matchedBean.name}</h3>
                  <p className="text-xs text-[#6E5C57] max-w-lg">{matchedBean.description}</p>
                </div>

                <div className="text-center bg-white p-4 rounded-xl border border-[#E8DFC8] shrink-0 shadow-sm">
                  <div className="text-[10px] font-bold text-[#8C7A75] uppercase">250g Retail Bag</div>
                  <div className="text-2xl font-serif font-bold text-[#2A1E1B]">${matchedBean.price250g.toFixed(2)}</div>
                  <button
                    onClick={() => {
                      addToCart({
                        id: `quiz-match-${matchedBean.id}`,
                        title: `${matchedBean.name} (Quiz Match)`,
                        subtitle: `${matchedBean.roastLevel} - ${matchedBean.origin}`,
                        unitPrice: matchedBean.price250g,
                        quantity: 1,
                        unitLabel: '250g Bag',
                        type: 'BEAN',
                        mode: 'B2C',
                        image: matchedBean.image
                      });
                    }}
                    className="mt-2 px-4 py-2 bg-[#C85A32] hover:bg-[#B04B26] text-white text-xs font-bold rounded-lg transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              {/* BREW RECIPE & INTERACTIVE TIMER */}
              <div className="bg-[#2A1E1B] text-white p-6 rounded-xl border border-[#3D2C28] space-y-6">
                <div className="flex justify-between items-center border-b border-[#3D2C28] pb-3">
                  <h4 className="font-serif text-xl font-bold text-[#F5C28B] flex items-center space-x-2">
                    <Coffee className="w-5 h-5 text-[#C85A32]" />
                    <span>Recommended Kallang Roastery Extraction Parameters</span>
                  </h4>
                  <span className="text-xs text-[#A6917A]">{quizState.brewMethod}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-center">
                  <div className="bg-[#1F1513] p-3 rounded-lg border border-[#3D2C28]">
                    <div className="text-[#A6917A] text-[10px] uppercase font-bold">Coffee Dose</div>
                    <div className="text-base font-bold text-white mt-1">15.0g</div>
                  </div>
                  <div className="bg-[#1F1513] p-3 rounded-lg border border-[#3D2C28]">
                    <div className="text-[#A6917A] text-[10px] uppercase font-bold">Water Temp</div>
                    <div className="text-base font-bold text-white mt-1">92.5 °C</div>
                  </div>
                  <div className="bg-[#1F1513] p-3 rounded-lg border border-[#3D2C28]">
                    <div className="text-[#A6917A] text-[10px] uppercase font-bold">Water Output</div>
                    <div className="text-base font-bold text-white mt-1">225.0g (1:15)</div>
                  </div>
                  <div className="bg-[#1F1513] p-3 rounded-lg border border-[#3D2C28]">
                    <div className="text-[#A6917A] text-[10px] uppercase font-bold">Target Brew Time</div>
                    <div className="text-base font-bold text-[#F5C28B] mt-1">2m 30s</div>
                  </div>
                </div>

                {/* Interactive Brew Timer Bar */}
                <div className="bg-[#1D1412] p-4 rounded-xl border border-[#4A3530] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#C85A32]/20 text-[#C85A32] flex items-center justify-center">
                      <Timer className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#A6917A] font-bold">INTERACTIVE BREW TIMER</div>
                      <div className="font-mono text-3xl font-bold text-[#F5C28B]">{formatTimer(timerSeconds)}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="px-5 py-2.5 bg-[#C85A32] hover:bg-[#B04B26] text-white rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{isTimerRunning ? 'Pause Timer' : 'Start Extraction Timer'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsTimerRunning(false);
                        setTimerSeconds(150);
                      }}
                      className="p-2.5 bg-[#3D2C28] text-[#CBB9A3] hover:text-white rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setQuizState({ step: 1, brewMethod: 'Pourover Drip', flavorPreference: 'Bright', milkPreference: 'Black', experienceLevel: 'Enthusiast' })}
                  className="text-xs text-[#C85A32] font-semibold hover:underline cursor-pointer"
                >
                  Retake Taste Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
