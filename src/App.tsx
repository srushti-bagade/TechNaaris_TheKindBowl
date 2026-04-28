import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { PostForm } from "@/components/PostForm";
import { Explore } from "@/components/Explore";
import { Impact } from "@/components/Impact";
import { Community } from "@/components/Community";
import { PetAdoption } from "@/components/PetAdoption";
import { Auth } from "@/components/Auth";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Heart, ShieldCheck, TrendingUp, ArrowUpRight, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import * as React from "react";

import { Mascot } from "@/components/Mascot";

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
          <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10 w-full max-w-7xl">
              <div className="flex flex-col lg:flex-row gap-16 lg:items-center mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1"
                >
                  <div className="flex items-center gap-6 mb-12">
                     <div className="w-16 h-1 bg-emerald-500 rounded-full" />
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 italic">Our Mission</span>
                  </div>
                  <h2 className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-[-0.07em] leading-[0.85]">
                    We build trust<br />
                    <span className="text-slate-400">for a world where</span><br />
                    everyone is fed.
                  </h2>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="flex-1 flex justify-center lg:justify-end shrink-0"
                >
                  <Mascot />
                </motion.div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-24 items-start pb-20 border-b border-white/5">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="text-2xl text-slate-400 font-medium leading-relaxed tracking-tight"
                >
                  TheKindBowl is designed to make donating extra food and finding resources simple, fast, and local.
                </motion.p>
                <div className="space-y-12">
<motion.div 
                       initial={{ opacity: 0, x: -20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       whileHover={{ x: 10 }}
                       transition={{ duration: 0.5 }}
                       className="flex items-start gap-8 group"
                    >
                       <div className="w-16 h-16 rounded-[24px] bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-inner group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                          <ShieldCheck size={28} />
                       </div>
                       <div>
                          <h4 className="text-2xl font-extrabold text-slate-950 mb-3 tracking-tighter">Verified Neighbors</h4>
                          <p className="text-slate-600 font-medium leading-relaxed">Our community members are verified so you can share and help with confidence.</p>
                       </div>
                    </motion.div>
<motion.div 
                       initial={{ opacity: 0, x: -20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       whileHover={{ x: 10 }}
                       transition={{ delay: 0.2, duration: 0.5 }}
                       className="flex items-start gap-8 group"
                    >
                       <div className="w-16 h-16 rounded-[24px] bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                          <TrendingUp size={28} />
                       </div>
                       <div>
                          <h4 className="text-2xl font-extrabold text-slate-950 mb-3 tracking-tighter">Fast Response</h4>
                          <p className="text-slate-600 font-medium leading-relaxed">Connect with nearby needs instantly and make a difference right where you are.</p>
                       </div>
                    </motion.div>
                </div>
              </div>
          </div>
          
          {/* Ambient background light */}
          <div className="absolute top-1/2 left-3/4 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[180px] pointer-events-none" />
        </section>

        {/* Operations Matrix Section */}
        <section className="py-40 md:py-60 relative overflow-hidden bg-slate-50">
          {/* Animated Mesh Background */}
          <motion.div
            className="absolute inset-0 z-0 opacity-[0.45] blur-[120px] mix-blend-multiply"
            animate={{
              backgroundImage: [
                "radial-gradient(circle at 10% 10%, #34d399 0%, transparent 60%), radial-gradient(circle at 90% 10%, #60a5fa 0%, transparent 60%), radial-gradient(circle at 90% 90%, #c084fc 0%, transparent 60%), radial-gradient(circle at 10% 90%, #fb7185 0%, transparent 60%), radial-gradient(circle at 50% 50%, #f97316 0%, transparent 60%)",
                "radial-gradient(circle at 90% 10%, #34d399 0%, transparent 60%), radial-gradient(circle at 90% 90%, #60a5fa 0%, transparent 60%), radial-gradient(circle at 10% 90%, #c084fc 0%, transparent 60%), radial-gradient(circle at 10% 10%, #fb7185 0%, transparent 60%), radial-gradient(circle at 50% 50%, #2dd4bf 0%, transparent 60%)",
                "radial-gradient(circle at 90% 90%, #34d399 0%, transparent 60%), radial-gradient(circle at 10% 90%, #60a5fa 0%, transparent 60%), radial-gradient(circle at 10% 10%, #c084fc 0%, transparent 60%), radial-gradient(circle at 90% 10%, #fb7185 0%, transparent 60%), radial-gradient(circle at 50% 50%, #f97316 0%, transparent 60%)",
                "radial-gradient(circle at 10% 10%, #34d399 0%, transparent 60%), radial-gradient(circle at 90% 10%, #60a5fa 0%, transparent 60%), radial-gradient(circle at 90% 90%, #c084fc 0%, transparent 60%), radial-gradient(circle at 10% 90%, #fb7185 0%, transparent 60%), radial-gradient(circle at 50% 50%, #f97316 0%, transparent 60%)",
              ],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />

          <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-32 pb-12 border-b border-slate-200">
               <div className="max-w-2xl">
                  <div className="inline-block badge-premium bg-slate-950 text-white mb-8 py-2 px-6 rounded-full font-bold text-xs uppercase tracking-widest">Simple Steps</div>
                  <h2 className="text-6xl md:text-8xl font-black tracking-[-0.07em] leading-[0.85] text-slate-950">
                    Helping is <span className="text-emerald-500">simple</span>.
                  </h2>
               </div>
               <p className="max-w-md text-xl text-slate-500 font-medium mb-2 tracking-tight">
                 It takes less than a minute to share food or request help.
               </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { 
                  step: "01", 
                  title: "Post Food or Pet", 
                  desc: "List the food or pet help you have available on our simple mobile interface.",
                  icon: <ArrowUpRight className="text-emerald-500" />
                },
                { 
                  step: "02", 
                  title: "Get a Match", 
                  desc: "We connect you instantly with neighbors who need what you have.",
                  icon: <Search className="text-indigo-500" />
                },
                { 
                  step: "03", 
                  title: "Make an Impact", 
                  desc: "Complete the donation to help your community thrive.",
                  icon: <ShieldCheck className="text-emerald-500" />
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -15, scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                  className="group relative p-10 rounded-[36px] bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-500 flex flex-col items-start overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-white/80 to-emerald-50/50 opacity-50 transition-opacity duration-500" />
                  <div className="flex justify-between items-start mb-10 w-full relative z-10">
                     <span className="text-6xl font-black text-emerald-200/60">{item.step}</span>
                     <div className="w-16 h-16 bg-white rounded-3xl shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                        {React.cloneElement(item.icon as React.ReactElement, { className: "w-8 h-8 group-hover:text-white transition-colors" })}
                     </div>
                  </div>
                  <h4 className="text-3xl font-extrabold text-slate-950 leading-tight tracking-[-0.02em] mb-4 relative z-10">{item.title}</h4>
                  <p className="text-lg text-slate-600 font-medium leading-relaxed tracking-tight relative z-10">
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
                    <div className="badge-premium bg-white/10 text-emerald-400 border-white/10 mb-14 mx-auto py-3 px-8 uppercase tracking-[0.4em] text-[10px]">Ready to Start?</div>
                    <h2 className="text-7xl md:text-9xl font-black text-white tracking-[-0.08em] leading-[0.85] mb-16">
                      Join TheKindBowl<br />
                      <span className="gradient-text">Community.</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-10 justify-center">
                      <Button 
                        size="lg" 
                        onClick={() => navigate('/auth')}
                        className="bg-emerald-500 hover:bg-emerald-400 text-white font-black px-16 py-10 rounded-[32px] shadow-deep transition-all duration-700 btn-premium border-none uppercase tracking-[0.2em] text-xs"
                      >
                        Sign Up
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        onClick={() => navigate('/explore')}
                        className="bg-transparent border-white/20 text-white font-black px-16 py-10 rounded-[32px] hover:bg-white/5 transition-all duration-700 uppercase tracking-[0.2em] text-xs"
                      >
                        Learn More
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
              <Route path="/community" element={<PageWrapper><Community /></PageWrapper>} />
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
