import React, { useEffect, useState } from 'react';
import { MessageSquare, Coffee, Users, AlertCircle, RefreshCw } from 'lucide-react';

export const DisqusForum: React.FC = () => {
  const [forumError, setForumError] = useState<boolean>(false);
  const [shortname, setShortname] = useState<string>('red-dot-roastwork');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const loadDisqus = (shortNameVal: string) => {
    setForumError(false);
    setIsLoaded(false);

    try {
      const pageUrl = window.location.href;
      const pageIdentifier = 'red-dot-roastworks-main';

      // Global disqus_config declaration
      (window as any).disqus_config = function (this: any) {
        this.page.url = pageUrl;
        this.page.identifier = pageIdentifier;
        this.page.title = 'Red Dot Roastworks Coffee Community';
      };

      // Remove existing Disqus scripts if reloading with a new shortname
      const oldEmbed = document.getElementById('disqus-embed-script');
      if (oldEmbed) oldEmbed.remove();
      const oldCount = document.getElementById('dsq-count-scr');
      if (oldCount) oldCount.remove();

      // Clear disqus_thread DOM
      const threadContainer = document.getElementById('disqus_thread');
      if (threadContainer) threadContainer.innerHTML = '';

      // Load Disqus Embed script
      const d = document;
      const s = d.createElement('script');
      s.id = 'disqus-embed-script';
      s.src = `https://${shortNameVal}.disqus.com/embed.js`;
      s.setAttribute('data-timestamp', (+new Date()).toString());
      s.async = true;

      s.onload = () => {
        setIsLoaded(true);
        setForumError(false);
      };

      s.onerror = (e) => {
        console.warn('Disqus script failed to load:', e);
        setForumError(true);
      };

      (d.head || d.body).appendChild(s);

      // Load Disqus Count script
      const countScript = d.createElement('script');
      countScript.id = 'dsq-count-scr';
      countScript.src = `https://${shortNameVal}.disqus.com/count.js`;
      countScript.async = true;
      countScript.onerror = () => {
        // count.js error handled silently
      };
      (d.head || d.body).appendChild(countScript);

    } catch (err) {
      console.error('Error initializing Disqus:', err);
      setForumError(true);
    }
  };

  useEffect(() => {
    loadDisqus(shortname);
  }, []);

  const handleRetry = (e: React.FormEvent) => {
    e.preventDefault();
    loadDisqus(shortname);
  };

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
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] shadow-sm min-h-[320px] relative">
          <div id="disqus_thread"></div>

          {forumError && (
            <div className="p-6 bg-[#FAF2E6] rounded-xl border border-[#E8DFC8] space-y-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-[#C85A32]">
                <AlertCircle className="w-5 h-5" />
                <span className="font-serif font-bold text-sm">Disqus Forum Not Found or Blocked</span>
              </div>
              <p className="text-xs text-[#6E5C57] max-w-md mx-auto">
                Unable to load Disqus forum for shortname <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-[#2A1E1B]">{shortname}</code>. This may occur if the shortname is not registered on Disqus.com, or if an ad blocker is restricting third-party tracking scripts.
              </p>
              <form onSubmit={handleRetry} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto pt-2">
                <input
                  type="text"
                  value={shortname}
                  onChange={(e) => setShortname(e.target.value.toLowerCase().trim())}
                  placeholder="Enter Disqus Forum Shortname"
                  className="bg-white border border-[#E8DFC8] px-3 py-2 text-xs rounded-lg w-full sm:w-64 focus:outline-none focus:border-[#C85A32] font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C85A32] hover:bg-[#B04B26] text-white text-xs font-bold rounded-lg transition-colors flex items-center space-x-1 cursor-pointer shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reload Forum</span>
                </button>
              </form>
            </div>
          )}

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

