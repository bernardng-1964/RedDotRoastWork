import React, { useEffect } from 'react';
import { MessageSquare, Coffee, Users } from 'lucide-react';

export const DisqusForum: React.FC = () => {
  useEffect(() => {
    // Page URL & identifier setup
    const pageUrl = window.location.href;
    const pageIdentifier = 'red-dot-roastworks-main';

    // Global disqus_config declaration
    (window as any).disqus_config = function (this: any) {
      this.page.url = pageUrl;
      this.page.identifier = pageIdentifier;
      this.page.title = 'Red Dot Roastworks Coffee Community';
    };

    // Load Disqus Embed script
    const embedScriptId = 'disqus-embed-script';
    if (!document.getElementById(embedScriptId)) {
      const d = document;
      const s = d.createElement('script');
      s.id = embedScriptId;
      s.src = 'https://red-dot-roastwork.disqus.com/embed.js';
      s.setAttribute('data-timestamp', (+new Date()).toString());
      (d.head || d.body).appendChild(s);
    } else if ((window as any).DISQUS) {
      (window as any).DISQUS.reset({
        reload: true,
        config: (window as any).disqus_config
      });
    }

    // Load Disqus Count script
    const countScriptId = 'dsq-count-scr';
    if (!document.getElementById(countScriptId)) {
      const d = document;
      const s = d.createElement('script');
      s.id = countScriptId;
      s.src = 'https://red-dot-roastwork.disqus.com/count.js';
      s.async = true;
      (d.head || d.body).appendChild(s);
    }
  }, []);

  return (
    <section id="community-forum" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2] border-t border-[#E8DFC8]">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FAF2E6] border border-[#E8DFC8] text-[#C85A32] text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Singapore Coffee Lovers & Barista Community</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A1E1B]">
            Join the Discussion
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5C57] leading-relaxed">
            Share your extraction recipes, ask Kallang master roasters about bean origins, or discuss B2B cafe partnership reviews below.
          </p>
        </div>

        {/* Disqus Embed Container */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] shadow-sm min-h-[320px]">
          <div id="disqus_thread"></div>
          <noscript>
            Please enable JavaScript to view the{' '}
            <a href="https://disqus.com/?ref_noscript" className="text-[#C85A32] underline">
              comments powered by Disqus.
            </a>
          </noscript>
        </div>
      </div>
    </section>
  );
};
