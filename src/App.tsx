import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { PostForm } from "@/components/PostForm";
import { Explore } from "@/components/Explore";
import { Impact } from "@/components/Impact";
import { PetAdoption } from "@/components/PetAdoption";
import { Auth } from "@/components/Auth";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Heart, ShieldCheck, TrendingUp, ArrowUpRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import * as React from "react";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="bg-white">
        <Hero />
        
        {/* Cinematic Vision Section */}
        <section className="py-40 md:py-60 relative overflow-hidden bg-slate-950 text-white">
          <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
            <div className="max-w-5xl">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-6 mb-12">
                   <div className="w-16 h-1 bg-emerald-500 rounded-full" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 italic">Core Mission Directive</span>
                </div>
                <h2 className="text-6xl md:text-8xl lg:text-[120px] font-black tracking-[-0.07em] mb-16 leading-[0.85]">
                  We build networks<br />
                  <span className="text-slate-400">for a world where</span><br />
                  no soul hunger.
                </h2>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-24 items-start pb-20 border-b border-white/5">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="text-2xl text-slate-400 font-medium leading-relaxed tracking-tight"
                >
                  TheKindBowl is not a charity. It is a high-precision logistics layer designed to eliminate inefficiencies in global resource distribution.
                </motion.p>
                <div className="space-y-12">
                   <div className="flex items-start gap-8">
                      <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                         <ShieldCheck size={28} />
                      </div>
                      <div>
                         <h4 className="text-2xl font-black mb-3 italic tracking-tight">Trust Protocol</h4>
                         <p className="text-slate-500 font-medium leading-relaxed">Secured by decentralized verification nodes ensuring 100% transparency.</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-8">
                      <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 flex-shrink-0">
                         <TrendingUp size={28} />
                      </div>
                      <div>
                         <h4 className="text-2xl font-black mb-3 italic tracking-tight">Impact Velocity</h4>
                         <p className="text-slate-500 font-medium leading-relaxed">Scaling resource flow at the speed of logic, not bureaucracy.</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ambient background light */}
          <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[180px] pointer-events-none" />
        </section>

        {/* Operations Matrix Section */}
        <section className="py-40 md:py-60 bg-white">
          <div className="container mx-auto px-8 md:px-16 lg:px-24">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-32 pb-12 border-b border-slate-100">
               <div className="max-w-2xl">
                  <div className="badge-premium bg-slate-950 text-white mb-8 py-3 px-8">Process Architecture</div>
                  <h2 className="text-6xl md:text-8xl font-black tracking-[-0.07em] leading-[0.85] text-slate-950">How the protocol<br/>achieves scale.</h2>
               </div>
               <p className="max-w-md text-xl text-slate-500 font-medium mb-2 tracking-tight">
                 Our zero-friction integration layer allows nodes to deploy assets to the network in under 60 seconds.
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-16">
              {[
                { 
                  step: "01", 
                  title: "Asset Deployment", 
                  desc: "Donors list excess nutrition or resources via our high-speed mobile interface.",
                  icon: <ArrowUpRight className="text-emerald-500" />
                },
                { 
                  step: "02", 
                  title: "Network Routing", 
                  desc: "NGOs and certified nodes receive real-time alerts based on geographic proximity and urgency filters.",
                  icon: <Search className="text-indigo-500" />
                },
                { 
                  step: "03", 
                  title: "Final Handoff", 
                  desc: "Volunteers facilitate the secure physical transfer of assets, verified by our proof-of-impact protocol.",
                  icon: <ShieldCheck className="text-emerald-500" />
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="group p-12 rounded-[56px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-deep transition-all duration-700 hover:-translate-y-4"
                >
                  <div className="flex justify-between items-start mb-16">
                     <span className="text-6xl font-black text-slate-950/5 group-hover:text-emerald-500/10 transition-colors duration-700">{item.step}</span>
                     <div className="w-16 h-16 bg-white rounded-[24px] shadow-premium flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        {item.icon}
                     </div>
                  </div>
                  <h4 className="text-4xl font-black text-slate-950 leading-none tracking-tighter mb-6">{item.title}</h4>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed tracking-tight">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Massive Call to Action */}
        <section className="py-40 md:py-60 px-8 relative overflow-hidden">
           <div className="container mx-auto max-w-7xl relative z-10">
              <div className="glass-dark bg-slate-950 p-20 md:p-32 rounded-[80px] text-center shadow-deep relative overflow-hidden group">
                 {/* Internal Glow Lights */}
                 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_60%)] pointer-events-none" />
                 <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(79,70,229,0.1),transparent_60%)] pointer-events-none" />
                 
                 <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                 >
                    <div className="badge-premium bg-white/10 text-emerald-400 border-white/10 mb-14 mx-auto py-3 px-8 uppercase tracking-[0.4em] text-[10px]">Ready to Expand?</div>
                    <h2 className="text-7xl md:text-9xl font-black text-white tracking-[-0.08em] leading-[0.85] mb-16">
                      Join the Elite<br />
                      <span className="gradient-text">Impact Network.</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-10 justify-center">
                      <Button 
                        size="lg" 
                        onClick={() => navigate('/post')}
                        className="bg-emerald-500 hover:bg-emerald-400 text-white font-black px-16 py-10 rounded-[32px] shadow-deep transition-all duration-700 btn-premium border-none uppercase tracking-[0.2em] text-xs"
                      >
                        Initialize Account
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="bg-transparent border-white/20 text-white font-black px-16 py-10 rounded-[32px] hover:bg-white/5 transition-all duration-700 uppercase tracking-[0.2em] text-xs"
                      >
                        Read Manifesto
                      </Button>
                    </div>
                 </motion.div>
              </div>
           </div>
           
           {/* Background Orbits */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[radial-gradient(circle,rgba(16,185,129,0.03),transparent_70%)] rounded-full -z-10 animate-pulse" />
        </section>
      </div>
    </PageWrapper>
  );
};

export default function App() {
  const navigate = () => {}; // Mock for type safety if needed, but the real ones use useNavigate in components

  return (
    <TooltipProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
          <Navbar />
          <ScrollToTop />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
              <Route path="/explore" element={<PageWrapper><Explore /></PageWrapper>} />
              <Route path="/impact" element={<PageWrapper><Impact /></PageWrapper>} />
              <Route path="/post" element={<PageWrapper><PostForm /></PageWrapper>} />
              <Route path="/pets" element={<PageWrapper><PetAdoption /></PageWrapper>} />
              <Route path="/auth" element={<PageWrapper><Auth /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
          <Footer />
          <Toaster position="top-right" richColors />
        </div>
      </Router>
    </TooltipProvider>
  );
}
