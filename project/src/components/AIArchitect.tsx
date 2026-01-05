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
              content: `You are a Sustainability Assessment AI at Flownetics Engineering (www.flownetics-engg.com), specializing in evaluating chemical processes for environmental impact and sustainability in flow chemistry applications.

FLOW CHEMISTRY SUSTAINABILITY RULES & PRECAUTIONS:

1. WASTE MINIMIZATION (Critical):
   - Flow chemistry typically reduces waste by 60-80% compared to batch processes
   - Evaluate: Solvent usage, byproduct formation, purification requirements
   - Score higher for processes with minimal solvent requirements or solvent-free options
   - Consider: In-line separation, continuous purification, reduced workup steps

2. ENERGY EFFICIENCY:
   - Flow reactors provide superior heat transfer (up to 60% higher capacity in 1/10th space)
   - Evaluate: Reaction temperature, heating/cooling requirements, exothermicity management
   - Score higher for processes that benefit from precise thermal control
   - Consider: Heat integration, reduced energy per unit product, smaller reactor footprint

3. SAFETY & HAZARD REDUCTION:
   - Flow chemistry enables safer handling of hazardous materials
   - Evaluate: Toxicity of reagents, stability of intermediates, reaction hazards
   - Score higher for processes involving pyrophoric, explosive, or highly toxic materials
   - Precautions: Small reactor volumes reduce inventory risk, continuous processing avoids accumulation

4. RESOURCE EFFICIENCY:
   - Flow processes typically use 30-50% less raw materials
   - Evaluate: Atom economy, catalyst loading, reagent stoichiometry
   - Score higher for high-yield processes with efficient resource utilization
   - Consider: Reduced catalyst requirements, better selectivity, minimized over-reaction

5. EMISSIONS & CARBON FOOTPRINT:
   - Flow chemistry reduces emissions through process intensification
   - Evaluate: CO2 equivalent, VOC emissions, waste treatment requirements
   - Score higher for processes with lower carbon footprint
   - Consider: Reduced transportation, local production capability, lower energy consumption

6. SCALABILITY & CONSISTENCY:
   - Flow chemistry provides consistent quality at scale
   - Evaluate: Process robustness, reproducibility, scale-up challenges
   - Score higher for processes that scale efficiently without quality degradation

SUSTAINABILITY SCORING CRITERIA (0-10):
- 9-10: Excellent - Highly suitable for flow chemistry, minimal environmental impact
- 7-8: Good - Well-suited with some optimization opportunities
- 5-6: Moderate - Suitable with process modifications
- 3-4: Challenging - Requires significant optimization
- 0-2: Poor - Not recommended for flow chemistry without major redesign

Always provide specific, actionable sustainability insights. Reference Flownetics' validated processes when relevant. Format responses as HTML without markdown or html/body tags.`
            }, {
              role: "user",
              content: `User input: "${input}"

FIRST: Extract the chemical reaction or process name from the input. The input may be:
- A direct reaction name: "Grignard Reaction", "Hydrogenation"
- A question about a reaction: "What about exothermic nitration of toluene?", "Tell me about Grignard Reaction"
- A descriptive statement: "I need to know about exothermic nitration of toluene", "How sustainable is hydrogenation?"
- A specific reaction description: "Exothermic nitration of toluene", "Diazotization of aniline"

Extract the core reaction/process name from any of these formats. Accept ANY chemical reaction or process, including:
- Named reactions: "Grignard Reaction", "Diels-Alder Reaction", "Friedel-Crafts Alkylation", "Suzuki Coupling", "Heck Reaction", "Sonogashira Coupling", "Stille Coupling", "Negishi Coupling", "Buchwald-Hartwig Amination", "Wittig Reaction", "Aldol Condensation", "Michael Addition", "Mannich Reaction", "Claisen Rearrangement", "Cope Rearrangement", "Beckmann Rearrangement", "Hofmann Rearrangement", "Curtius Rearrangement", "Schmidt Reaction", "Baeyer-Villiger Oxidation", "Sharpless Epoxidation", "Swern Oxidation", "Jones Oxidation", "PCC Oxidation", "Dess-Martin Oxidation", "Oppenauer Oxidation", "Corey-Kim Oxidation", "Pinnick Oxidation", "Tamao-Fleming Oxidation", "Lemieux-Johnson Oxidation", "Upjohn Dihydroxylation", "Sharpless Dihydroxylation", "Jacobsen Epoxidation", "Katsuki Epoxidation", "Shi Epoxidation", "Mukaiyama Aldol", "Evans Aldol", "Brown Allylation", "Roush Allylation", "Keck Allylation", "Crimmins Aldol", "Paterson Aldol", "Vinylogous Mukaiyama Aldol", "Sakurai Allylation", "Hosomi-Sakurai Reaction", "Tamao-Kumada Coupling", "Hiyama Coupling", "Kumada Coupling", "Fukuyama Coupling", "Liebeskind-Srogl Coupling", "Cadiot-Chodkiewicz Coupling", "Glaser Coupling", "Hay Coupling", "Eglinton Coupling", "Ullmann Coupling", "Goldberg Reaction", "Chan-Lam Coupling", "Buchwald-Hartwig Coupling", "Miyaura Borylation", "Suzuki-Miyaura Coupling", "Negishi Coupling", "Stille Coupling", "Sonogashira Coupling", "Heck Reaction", "Tsuji-Trost Reaction", "Overman Rearrangement", "Mislow-Evans Rearrangement", "Wolff Rearrangement", "Arndt-Eistert Synthesis", "Favorskii Rearrangement", "Stevens Rearrangement", "Sommelet-Hauser Rearrangement", "Meisenheimer Rearrangement", "Neber Rearrangement", "Lossen Rearrangement", "Schmidt Reaction", "Curtius Rearrangement", "Hofmann Rearrangement", "Beckmann Rearrangement", "Baeyer-Villiger Oxidation", "Dakin Reaction", "Elbs Persulfate Oxidation", "Kornblum Oxidation", "Swern Oxidation", "Moffatt Oxidation", "Parikh-Doering Oxidation", "Albright-Goldman Oxidation", "Collins Oxidation", "Sarett Oxidation", "Fétizon Oxidation", "Tamao Oxidation", "Fleming Oxidation", "Rubottom Oxidation", "Davis Oxidation", "Sharpless Asymmetric Epoxidation", "Jacobsen Epoxidation", "Katsuki Epoxidation", "Shi Epoxidation", "Mukaiyama Epoxidation", "Payne Rearrangement", "Pummerer Rearrangement", "Meerwein-Ponndorf-Verley Reduction", "Oppenauer Oxidation", "Luche Reduction", "Birch Reduction", "Clemmensen Reduction", "Wolff-Kishner Reduction", "Huang-Minlon Reduction", "Bouveault-Blanc Reduction", "Rosemund Reduction", "Lindlar Reduction", "Rosenmund Reduction", "Stephen Aldehyde Synthesis", "McFadyen-Stevens Reduction", "Huang-Minlon Reduction", "Clemmensen Reduction", "Wolff-Kishner Reduction", "Birch Reduction", "Luche Reduction", "Meerwein-Ponndorf-Verley Reduction", "Oppenauer Oxidation", "Swern Oxidation", "Dess-Martin Oxidation", "PCC Oxidation", "Jones Oxidation", "Collins Oxidation", "Sarett Oxidation", "Fétizon Oxidation", "Tamao Oxidation", "Fleming Oxidation", "Rubottom Oxidation", "Davis Oxidation", "Sharpless Asymmetric Epoxidation", "Jacobsen Epoxidation", "Katsuki Epoxidation", "Shi Epoxidation", "Mukaiyama Epoxidation", "Payne Rearrangement", "Pummerer Rearrangement", "Meerwein-Ponndorf-Verley Reduction", "Oppenauer Oxidation", "Luche Reduction", "Birch Reduction", "Clemmensen Reduction", "Wolff-Kishner Reduction", "Huang-Minlon Reduction", "Bouveault-Blanc Reduction", "Rosemund Reduction", "Lindlar Reduction", "Rosenmund Reduction", "Stephen Aldehyde Synthesis", "McFadyen-Stevens Reduction"
- Process types: "Hydrogenation", "Oxidation", "Reduction", "Nitration", "Halogenation", "Sulfonation", "Alkylation", "Acylation", "Esterification", "Amidation", "Hydrolysis", "Dehydration", "Hydration", "Dehydrogenation", "Cyclization", "Ring Opening", "Ring Closing", "Decarboxylation", "Decarboxylative Coupling", "C-H Activation", "C-H Functionalization", "Cross-Coupling", "Metathesis", "Olefin Metathesis", "Ring-Closing Metathesis", "Ring-Opening Metathesis", "Enyne Metathesis", "Cross Metathesis", "Asymmetric Hydrogenation", "Transfer Hydrogenation", "Selective Hydrogenation", "Partial Hydrogenation", "Complete Hydrogenation", "Catalytic Hydrogenation", "Non-Catalytic Hydrogenation", "Homogeneous Hydrogenation", "Heterogeneous Hydrogenation", "Enantioselective Hydrogenation", "Diastereoselective Hydrogenation", "Regioselective Hydrogenation", "Chemoselective Hydrogenation", "Stereoselective Hydrogenation", "Asymmetric Hydrogenation", "Transfer Hydrogenation", "Selective Hydrogenation", "Partial Hydrogenation", "Complete Hydrogenation", "Catalytic Hydrogenation", "Non-Catalytic Hydrogenation", "Homogeneous Hydrogenation", "Heterogeneous Hydrogenation", "Enantioselective Hydrogenation", "Diastereoselective Hydrogenation", "Regioselective Hydrogenation", "Chemoselective Hydrogenation", "Stereoselective Hydrogenation"
- Specific reactions: "Exothermic Nitration of Toluene", "Diazotization of Aniline", "Bromination of Phenol", "Chlorination of Benzene", "Sulfonation of Naphthalene", "Friedel-Crafts Acylation of Benzene", "Grignard Addition to Carbonyl", "Wittig Olefination", "Aldol Condensation", "Michael Addition", "Diels-Alder Cycloaddition", "1,3-Dipolar Cycloaddition", "Pauson-Khand Reaction", "Pictet-Spengler Reaction", "Bischler-Napieralski Reaction", "Mannich Reaction", "Strecker Synthesis", "Ugi Reaction", "Passerini Reaction", "Biginelli Reaction", "Hantzsch Synthesis", "Knorr Pyrazole Synthesis", "Paal-Knorr Synthesis", "Fischer Indole Synthesis", "Buchwald-Hartwig Amination", "Chan-Lam Coupling", "Ullmann Coupling", "Goldberg Reaction", "Cadiot-Chodkiewicz Coupling", "Glaser Coupling", "Hay Coupling", "Eglinton Coupling", "Sonogashira Coupling", "Heck Reaction", "Suzuki Coupling", "Negishi Coupling", "Stille Coupling", "Kumada Coupling", "Hiyama Coupling", "Fukuyama Coupling", "Liebeskind-Srogl Coupling", "Miyaura Borylation", "Chan-Lam Coupling", "Buchwald-Hartwig Coupling", "Tsuji-Trost Reaction", "Overman Rearrangement", "Mislow-Evans Rearrangement", "Wolff Rearrangement", "Arndt-Eistert Synthesis", "Favorskii Rearrangement", "Stevens Rearrangement", "Sommelet-Hauser Rearrangement", "Meisenheimer Rearrangement", "Neber Rearrangement", "Lossen Rearrangement", "Schmidt Reaction", "Curtius Rearrangement", "Hofmann Rearrangement", "Beckmann Rearrangement", "Baeyer-Villiger Oxidation", "Dakin Reaction", "Elbs Persulfate Oxidation", "Kornblum Oxidation", "Swern Oxidation", "Moffatt Oxidation", "Parikh-Doering Oxidation", "Albright-Goldman Oxidation", "Collins Oxidation", "Sarett Oxidation", "Fétizon Oxidation", "Tamao Oxidation", "Fleming Oxidation", "Rubottom Oxidation", "Davis Oxidation", "Sharpless Asymmetric Epoxidation", "Jacobsen Epoxidation", "Katsuki Epoxidation", "Shi Epoxidation", "Mukaiyama Epoxidation", "Payne Rearrangement", "Pummerer Rearrangement", "Meerwein-Ponndorf-Verley Reduction", "Oppenauer Oxidation", "Luche Reduction", "Birch Reduction", "Clemmensen Reduction", "Wolff-Kishner Reduction", "Huang-Minlon Reduction", "Bouveault-Blanc Reduction", "Rosemund Reduction", "Lindlar Reduction", "Rosenmund Reduction", "Stephen Aldehyde Synthesis", "McFadyen-Stevens Reduction"
- Multi-step processes: "Multistep Synthesis", "Tandem Reaction", "Cascade Reaction", "Domino Reaction", "One-Pot Synthesis", "Sequential Reaction", "Convergent Synthesis", "Linear Synthesis", "Divergent Synthesis", "Parallel Synthesis", "Combinatorial Synthesis", "Solid-Phase Synthesis", "Solution-Phase Synthesis", "Microwave-Assisted Synthesis", "Ultrasound-Assisted Synthesis", "Photochemical Synthesis", "Electrochemical Synthesis", "Flow Synthesis", "Continuous Flow Synthesis", "Microreactor Synthesis", "Tubular Reactor Synthesis", "CSTR Synthesis", "Plate Reactor Synthesis", "Packed Bed Reactor Synthesis", "Fluidized Bed Reactor Synthesis", "Trickle Bed Reactor Synthesis", "Slurry Reactor Synthesis", "Bubble Column Reactor Synthesis", "Stirred Tank Reactor Synthesis", "Plug Flow Reactor Synthesis", "Mixed Flow Reactor Synthesis", "Laminar Flow Reactor Synthesis", "Turbulent Flow Reactor Synthesis", "Taylor Flow Reactor Synthesis", "Segmented Flow Reactor Synthesis", "Droplet Flow Reactor Synthesis", "Slug Flow Reactor Synthesis", "Annular Flow Reactor Synthesis", "Coiled Flow Reactor Synthesis", "Spiral Flow Reactor Synthesis", "Meandering Flow Reactor Synthesis", "Serpentine Flow Reactor Synthesis", "Zigzag Flow Reactor Synthesis", "Wavy Flow Reactor Synthesis", "Corrugated Flow Reactor Synthesis", "Helical Flow Reactor Synthesis", "Twisted Flow Reactor Synthesis", "Oscillatory Flow Reactor Synthesis", "Pulsating Flow Reactor Synthesis", "Recirculating Flow Reactor Synthesis", "Recycling Flow Reactor Synthesis", "Cascade Flow Reactor Synthesis", "Tandem Flow Reactor Synthesis", "Sequential Flow Reactor Synthesis", "Parallel Flow Reactor Synthesis", "Series Flow Reactor Synthesis", "Parallel-Series Flow Reactor Synthesis", "Series-Parallel Flow Reactor Synthesis", "Hybrid Flow Reactor Synthesis", "Integrated Flow Reactor Synthesis", "Modular Flow Reactor Synthesis", "Scalable Flow Reactor Synthesis", "Flexible Flow Reactor Synthesis", "Adaptive Flow Reactor Synthesis", "Intelligent Flow Reactor Synthesis", "Smart Flow Reactor Synthesis", "Automated Flow Reactor Synthesis", "Robotic Flow Reactor Synthesis", "AI-Assisted Flow Reactor Synthesis", "Machine Learning Flow Reactor Synthesis", "Deep Learning Flow Reactor Synthesis", "Neural Network Flow Reactor Synthesis", "Predictive Flow Reactor Synthesis", "Optimized Flow Reactor Synthesis", "Efficient Flow Reactor Synthesis", "Sustainable Flow Reactor Synthesis", "Green Flow Reactor Synthesis", "Eco-Friendly Flow Reactor Synthesis", "Environmentally Friendly Flow Reactor Synthesis", "Clean Flow Reactor Synthesis", "Safe Flow Reactor Synthesis", "Hazardous Flow Reactor Synthesis", "Explosive Flow Reactor Synthesis", "Pyrophoric Flow Reactor Synthesis", "Toxic Flow Reactor Synthesis", "Corrosive Flow Reactor Synthesis", "Reactive Flow Reactor Synthesis", "Unstable Flow Reactor Synthesis", "Sensitive Flow Reactor Synthesis", "Delicate Flow Reactor Synthesis", "Complex Flow Reactor Synthesis", "Challenging Flow Reactor Synthesis", "Difficult Flow Reactor Synthesis", "Advanced Flow Reactor Synthesis", "Sophisticated Flow Reactor Synthesis", "State-of-the-Art Flow Reactor Synthesis", "Cutting-Edge Flow Reactor Synthesis", "Next-Generation Flow Reactor Synthesis", "Future Flow Reactor Synthesis", "Innovative Flow Reactor Synthesis", "Revolutionary Flow Reactor Synthesis", "Breakthrough Flow Reactor Synthesis", "Game-Changing Flow Reactor Synthesis", "Transformative Flow Reactor Synthesis", "Disruptive Flow Reactor Synthesis", "Pioneering Flow Reactor Synthesis", "Trailblazing Flow Reactor Synthesis", "Groundbreaking Flow Reactor Synthesis", "Seminal Flow Reactor Synthesis", "Landmark Flow Reactor Synthesis", "Milestone Flow Reactor Synthesis", "Historic Flow Reactor Synthesis", "Classic Flow Reactor Synthesis", "Traditional Flow Reactor Synthesis", "Conventional Flow Reactor Synthesis", "Standard Flow Reactor Synthesis", "Established Flow Reactor Synthesis", "Proven Flow Reactor Synthesis", "Validated Flow Reactor Synthesis", "Tested Flow Reactor Synthesis", "Verified Flow Reactor Synthesis", "Certified Flow Reactor Synthesis", "Approved Flow Reactor Synthesis", "Authorized Flow Reactor Synthesis", "Licensed Flow Reactor Synthesis", "Registered Flow Reactor Synthesis", "Patented Flow Reactor Synthesis", "Proprietary Flow Reactor Synthesis", "Exclusive Flow Reactor Synthesis", "Unique Flow Reactor Synthesis", "Novel Flow Reactor Synthesis", "Original Flow Reactor Synthesis", "New Flow Reactor Synthesis", "Fresh Flow Reactor Synthesis", "Modern Flow Reactor Synthesis", "Contemporary Flow Reactor Synthesis", "Current Flow Reactor Synthesis", "Latest Flow Reactor Synthesis", "Recent Flow Reactor Synthesis", "Up-to-Date Flow Reactor Synthesis", "State-of-the-Art Flow Reactor Synthesis", "Cutting-Edge Flow Reactor Synthesis", "Next-Generation Flow Reactor Synthesis", "Future Flow Reactor Synthesis", "Innovative Flow Reactor Synthesis", "Revolutionary Flow Reactor Synthesis", "Breakthrough Flow Reactor Synthesis", "Game-Changing Flow Reactor Synthesis", "Transformative Flow Reactor Synthesis", "Disruptive Flow Reactor Synthesis", "Pioneering Flow Reactor Synthesis", "Trailblazing Flow Reactor Synthesis", "Groundbreaking Flow Reactor Synthesis", "Seminal Flow Reactor Synthesis", "Landmark Flow Reactor Synthesis", "Milestone Flow Reactor Synthesis", "Historic Flow Reactor Synthesis", "Classic Flow Reactor Synthesis", "Traditional Flow Reactor Synthesis", "Conventional Flow Reactor Synthesis", "Standard Flow Reactor Synthesis", "Established Flow Reactor Synthesis", "Proven Flow Reactor Synthesis", "Validated Flow Reactor Synthesis", "Tested Flow Reactor Synthesis", "Verified Flow Reactor Synthesis", "Certified Flow Reactor Synthesis", "Approved Flow Reactor Synthesis", "Authorized Flow Reactor Synthesis", "Licensed Flow Reactor Synthesis", "Registered Flow Reactor Synthesis", "Patented Flow Reactor Synthesis", "Proprietary Flow Reactor Synthesis", "Exclusive Flow Reactor Synthesis", "Unique Flow Reactor Synthesis", "Novel Flow Reactor Synthesis", "Original Flow Reactor Synthesis", "New Flow Reactor Synthesis", "Fresh Flow Reactor Synthesis", "Modern Flow Reactor Synthesis", "Contemporary Flow Reactor Synthesis", "Current Flow Reactor Synthesis", "Latest Flow Reactor Synthesis", "Recent Flow Reactor Synthesis", "Up-to-Date Flow Reactor Synthesis"

IF you cannot identify ANY chemical reaction or process in the input (e.g., pure greetings without reaction context, completely unrelated text, personal names only), respond with ONLY this brief message in HTML format:

<p style="color: #6b7280; line-height: 1.6; text-align: center; padding: 1rem; font-family: 'FF Nort', sans-serif;">Please enter a chemical reaction or process name (e.g., "Grignard Reaction" or "Exothermic Nitration of Toluene").</p>

OTHERWISE, if you can identify ANY chemical reaction or process (even if mentioned in a question or description), proceed with the analysis below.

IF the input IS a valid reaction/process name, provide ONLY these three sections in HTML format (no markdown, no html/body tags). Keep content brief and concise. Use inline styles.

<h3 style="font-size: 1.75rem; font-weight: 600; color: #057210; margin-bottom: 1.5rem; font-family: 'FF Nort', sans-serif;">Sustainability Score: [X]/10</h3>

<div style="margin-bottom: 1.5rem;">
  <h4 style="font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.75rem; font-family: 'FF Nort', sans-serif;">Reaction Overview</h4>
  <p style="color: #4b5563; margin-bottom: 0; line-height: 1.7; font-size: 0.95rem; font-family: 'FF Nort', sans-serif;">[Brief 2-3 sentence description of the reaction and its key characteristics]</p>
</div>

<div style="margin-bottom: 1.5rem;">
  <h4 style="font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.75rem; font-family: 'FF Nort', sans-serif;">Flow Chemistry Advantage</h4>
  <p style="color: #4b5563; margin-bottom: 0; line-height: 1.7; font-size: 0.95rem; font-family: 'FF Nort', sans-serif;">[One concise paragraph explaining the main advantage of using flow chemistry for this reaction - focus on waste reduction, safety, energy efficiency, or scalability]</p>
</div>

<div style="margin-bottom: 1.5rem;">
  <h4 style="font-size: 1.125rem; font-weight: 600; color: #1f2937; margin-bottom: 0.75rem; font-family: 'FF Nort', sans-serif;">How Flownetics Helps</h4>
  <p style="color: #4b5563; margin-bottom: 0; line-height: 1.7; font-size: 0.95rem; font-family: 'FF Nort', sans-serif;">[One concise paragraph explaining how Flownetics can assist with this reaction - mention their expertise, validated processes, custom reactor design, or process optimization capabilities]</p>
</div>

<div style="background-color: #f0fdf4; padding: 1.25rem; border-radius: 0.75rem; border-left: 4px solid #057210; margin-top: 1.5rem;">
  <p style="color: #166534; margin: 0; line-height: 1.6; font-size: 0.95rem; font-family: 'FF Nort', sans-serif;"><strong style="color: #166534; font-weight: 600;">Contact Flownetics</strong> for sustainable flow chemistry process development and optimization services <span style="color: #166534;">→</span></p>
</div>

IMPORTANT: Always provide complete, full answers. Do not truncate or cut off responses. Ensure all sections are fully written with complete sentences and all information is included. Each section should be comprehensive (2-4 sentences minimum, more if needed for clarity).`
            }],
            temperature: 0.7,
            max_tokens: 2000
          })
        }
      );

      if (!response.ok) {
        // Don't show technical error, just throw to be caught by friendly error handler
        throw new Error('API Error');
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

      // Extract sustainability score from HTML (format: "Sustainability Score: X/10")
      let feasibilityScore: number | null = null;
      const scoreMatch = cleanHtml.match(/Sustainability Score:\s*(\d+)\/10/i);
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
      // Show user-friendly message instead of technical error
      setResult(`<div style="text-align: center; padding: 2rem;">
        <p style="color: #6b7280; line-height: 1.6; font-size: 0.95rem; font-family: 'FF Nort', sans-serif; margin-bottom: 1rem;">
          AI is taking time to process your request.
        </p>
        <p style="color: #6b7280; line-height: 1.6; font-size: 0.95rem; font-family: 'FF Nort', sans-serif;">
          Please retry again or check your input and try again.
        </p>
      </div>`);
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
    <section id="ai-architect" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50/30 relative overflow-hidden border-t border-gray-200">
      <div className="absolute top-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-brand-green/5 rounded-full mix-blend-multiply filter blur-[100px] sm:blur-[120px] opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-brand-green/5 rounded-full mix-blend-multiply filter blur-[100px] sm:blur-[120px] opacity-30"></div>
      
      <div ref={ref} className="max-w-7xl mx-auto relative z-10 reveal-on-scroll">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-gray-900" style={{ fontFamily: "'FF Nort', sans-serif" }}>
                AI Process Architect.
              </h2>
          </div>
          <p className="text-gray-600 text-lg font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>Validate your molecule for flow chemistry in seconds.</p>
        </div>

        <div className="w-full">
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border border-gray-200">
            <label className="block text-xs font-medium uppercase tracking-widest mb-3 text-gray-600" style={{ fontFamily: "'FF Nort', sans-serif" }}>Reaction / Process Name</label>
            <div className="flex flex-col md:flex-row gap-4 mb-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g. Exothermic Nitration of Toluene"
                className="flex-1 bg-brand-light border-2 border-gray-200 rounded-xl p-4 text-brand-black placeholder-gray-400 focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none transition-all hover:border-brand-purple/50"
                style={{ fontFamily: "'FF Nort', sans-serif" }}
              />
              <button
                onClick={analyzeReaction}
                disabled={loading}
                className="bg-brand-black text-white text-xs font-medium px-4 lg:px-6 py-2 lg:py-3 rounded-2xl hover:bg-gradient-purple transition-all shadow-lg flex items-center justify-center gap-2 min-w-[200px] disabled:opacity-50"
                style={{ fontFamily: "'FF Nort', sans-serif" }}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <span>Check Sustainability Score</span>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-3 font-light" style={{ fontFamily: "'FF Nort', sans-serif" }}>Try inputting complex synthesis steps like "Grignard Reaction" or "Hydrogenation".</p>
          </div>

          {showResult && (
            <div className="mt-6 bg-white rounded-2xl p-6 md:p-10 animate-fade-in border-2 border-gray-200 shadow-xl">
              <div 
                className="ai-content" 
                dangerouslySetInnerHTML={{ __html: result }}
                onClick={(e) => {
                  // Make "Contact Flownetics" section clickable
                  const target = e.target as HTMLElement;
                  const contactBox = target.closest('div[style*="background-color: #f0fdf4"]');
                  if (contactBox) {
                    setShowCalModal(true);
                  }
                }}
              />
              <style>{`
                .ai-content div[style*="background-color: #f0fdf4"] {
                  cursor: pointer;
                  transition: all 0.3s ease;
                }
                .ai-content div[style*="background-color: #f0fdf4"]:hover {
                  background-color: #dcfce7 !important;
                  transform: translateY(-2px);
                  box-shadow: 0 4px 12px rgba(5, 114, 16, 0.15);
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
