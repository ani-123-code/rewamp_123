import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { saveAIAnalysis } from '../lib/api';
import CalBookingModal from './CalBookingModal';

export default function AIArchitect() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showCalModal, setShowCalModal] = useState(false);

  const analyzeReaction = async () => {
    if (!input.trim()) {
      return;
    }

    setLoading(true);
    setShowResult(false);

    // API configuration - using Groq API (gsk_ prefix indicates Groq)
    const apiKey = import.meta.env.VITE_GROQ_API_KEY || "";
    const model = "openai/gpt-oss-120b";
    // Groq uses OpenAI-compatible API endpoint
    const apiEndpoint = "https://api.groq.com/openai/v1/chat/completions";

    try {
      const response = await fetch(
        apiEndpoint,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: [{
              role: "system",
              content: `You are an AI Process Architect at Flownetics Engineering (www.flownetics-engg.com), a leading flow chemistry company specializing in continuous flow manufacturing and production services. Flownetics has validated over 100+ molecules and provides end-to-end flow chemistry solutions from process development to commercial production.

Flownetics' expertise and capabilities:
- Validated flow chemistry processes for 100+ molecules including:
  * Aryl amines: Nitration followed by reduction
  * PEG molecules: Protection, condensations, deprotections
  * Quinolines & Indoles: Multistep synthesis
  * Pyrimidines & Piperidines: Multistep synthesis
  * Amides and amines: High-pressure reactions
  * Protected amines & alcohols: Selectivity reactions
  * Esters: Substitution reactions
  * Saccharides: Multistep synthesis
  * Alkylation: Friedel-Crafts alkylation, Grignard reactions
  * Catalysis: Cyclopropylation and hydrogenation
  * Pyrophoric chemistry: Butyl lithium, Grignard, LDA, Ethyl diazoacetate, LAH
  * Carbon-carbon bond formation: Palladium-catalyzed reactions
  * Cyclization: Diels-Alder reactions

- Flownetics provides: Process development, scale-up services, custom reactor design, AI-supported process optimization, and commercial production
- Flow chemistry advantages: Enhanced safety, better heat/mass transfer, precise temperature control, scalability, reduced waste
- Reactor types: Microreactors, tubular reactors, continuous stirred tank reactors (CSTR), plate reactors
- Process optimization: Residence time distribution, mixing efficiency, thermal management, pressure control

Always reference Flownetics' experience and capabilities when relevant. Encourage users to contact Flownetics for production services. Provide concise, technical, and actionable analysis. Format responses as HTML without markdown or html/body tags.`
            }, {
              role: "user",
              content: `User input: "${input}"

FIRST: Determine if this is a valid chemical reaction or process name. Valid examples: "Grignard Reaction", "Hydrogenation", "Exothermic Nitration of Toluene", "Friedel-Crafts Alkylation", "Diels-Alder Reaction", "Palladium-catalyzed coupling", etc.

IF the input is NOT a reaction/process name (e.g., questions, greetings, general text, names, etc.), respond with ONLY this brief message in HTML format:

<p style="color: #86868b; line-height: 1.6; text-align: center; padding: 1rem;">This is not a reaction or process name. Please enter a chemical reaction or process name (e.g., "Grignard Reaction" or "Hydrogenation").</p>

IF the input IS a valid reaction/process name, provide ONLY these three sections in HTML format (no markdown, no html/body tags). Keep content concise and brief. Use inline styles for colors. Reference Flownetics' capabilities naturally:

<h3 style="font-size: 1.5rem; font-weight: 600; color: #702594; margin-bottom: 1rem;">Feasibility Score: [X]/10</h3>

<div style="margin-bottom: 1rem;">
  <h4 style="font-size: 1.125rem; font-weight: 600; color: #1406b3; margin-bottom: 0.75rem; margin-top: 1rem;">Reaction Analysis</h4>
  <p style="color: #86868b; margin-bottom: 1rem; line-height: 1.6;">[Brief 2-3 sentence assessment mentioning if Flownetics has experience with similar reactions or reaction types from their validated portfolio]</p>
</div>

<div style="margin-bottom: 1rem;">
  <h4 style="font-size: 1.125rem; font-weight: 600; color: #1406b3; margin-bottom: 0.75rem; margin-top: 1rem;">Flow Chemistry Suitability</h4>
  <p style="color: #86868b; margin-bottom: 0.5rem; line-height: 1.6;">[Key advantage 1 - one sentence, mention how Flownetics addresses this]</p>
  <p style="color: #86868b; margin-bottom: 0.5rem; line-height: 1.6;">[Key advantage 2 - one sentence, mention how Flownetics addresses this]</p>
  <p style="color: #86868b; margin-bottom: 1rem; line-height: 1.6;"><strong style="color: #000000; font-weight: 600;">Potential challenge:</strong> [One sentence describing main challenge and note that Flownetics can help address this]</p>
</div>

<div style="background-color: #f5f5f7; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #e07742; margin-top: 1rem;">
  <p style="color: #86868b; margin: 0; line-height: 1.6; font-size: 0.95rem;">💡 <strong style="color: #000000; font-weight: 600;">Contact Flownetics</strong> for process development and production services.</p>
</div>

Keep responses very concise.`
            }],
            temperature: 0.7,
            max_tokens: 600
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'API Error');
      }

      const data = await response.json();
      const aiText = data.choices[0]?.message?.content || '';
      
      // Clean up any markdown or code block markers
      const cleanHtml = aiText
        .replace(/```html/g, '')
        .replace(/```/g, '')
        .trim();

      setResult(cleanHtml);
      setShowResult(true);

      // Extract feasibility score from HTML (format: "Feasibility Score: X/10")
      let feasibilityScore: number | null = null;
      const scoreMatch = cleanHtml.match(/Feasibility Score:\s*(\d+)\/10/i);
      if (scoreMatch) {
        feasibilityScore = parseInt(scoreMatch[1], 10);
      }

      // Save analysis to backend (don't wait for it, fire and forget)
      saveAIAnalysis({
        reactionName: input.trim(),
        feasibilityScore,
        analysisHtml: cleanHtml,
      }).catch((error) => {
        console.error('Failed to save analysis:', error);
        // Don't show error to user, just log it
      });
    } catch (error: unknown) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Please try again later.';
      setResult(`<p class="text-red-500 text-sm">Analysis failed: ${errorMessage}</p>`);
      setShowResult(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      analyzeReaction();
    }
  };

  return (
    <section id="ai-architect" className="py-32 px-6 bg-gradient-to-b from-brand-light to-white relative overflow-hidden border-t border-gray-100">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-3xl"></div>
      
      <div ref={ref} className="max-w-7xl mx-auto relative z-10 reveal-on-scroll">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-orange blur-lg opacity-30"></div>
              <h2 className="relative text-4xl md:text-5xl font-semibold tracking-tighter bg-gradient-to-r from-brand-blue via-brand-purple to-brand-orange bg-clip-text text-transparent">
                AI Process Architect.
              </h2>
            </div>
          </div>
          <p className="text-brand-gray text-lg">Validate your molecule for flow chemistry in seconds.</p>
        </div>

        <div className="w-full">
          <div className="bg-white/90 backdrop-blur p-6 md:p-10">
            <label className="block text-xs font-semibold uppercase tracking-widest mb-3 text-brand-gray">Reaction / Process Name</label>
            <div className="flex flex-col md:flex-row gap-4 mb-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g. Exothermic Nitration of Toluene"
                className="flex-1 bg-brand-light border-2 border-gray-200 rounded-xl p-4 text-brand-black placeholder-gray-400 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none transition-all hover:border-brand-purple/50"
              />
              <button
                onClick={analyzeReaction}
                disabled={loading}
                className="bg-gradient-purple text-white px-8 py-4 rounded-2xl font-medium hover:opacity-90 transition-all shadow-lg shadow-brand-purple/30 flex items-center justify-center gap-2 min-w-[180px] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <span>Analyze Feasibility ✨</span>
                )}
              </button>
            </div>
            <p className="text-xs text-brand-gray mt-3">Try inputting complex synthesis steps like "Grignard Reaction" or "Hydrogenation".</p>
          </div>

          {showResult && (
            <div className="mt-2 bg-white p-6 md:p-10 animate-fade-in border-l-4 border-brand-orange">
              <div 
                className="ai-content" 
                dangerouslySetInnerHTML={{ __html: result }}
                onClick={(e) => {
                  // Make "Contact Flownetics" section clickable
                  const target = e.target as HTMLElement;
                  const contactBox = target.closest('div[style*="background-color: #f5f5f7"]');
                  if (contactBox) {
                    setShowCalModal(true);
                  }
                }}
              />
              <style>{`
                .ai-content div[style*="background-color: #f5f5f7"] {
                  cursor: pointer;
                  transition: all 0.2s ease;
                }
                .ai-content div[style*="background-color: #f5f5f7"]:hover {
                  background-color: #e8e8ea !important;
                  transform: translateY(-2px);
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }
              `}</style>
            </div>
          )}
        </div>
      </div>

      <CalBookingModal 
        isOpen={showCalModal} 
        onClose={() => setShowCalModal(false)}
        calLink={import.meta.env.VITE_CAL_LINK}
      />
    </section>
  );
}
