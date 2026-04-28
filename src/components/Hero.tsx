import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, Utensils, Heart, PawPrint, Sparkles, Search, BarChart3, Star, Zap, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import React, { useRef, MouseEvent } from "react";

const PhysicsCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      dragElastic={0.1}
      whileHover={{ scale: 1.05, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 10
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Hero = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const moveX = useTransform(springX, [0, 1000], [-30, 30]);
  const moveY = useTransform(springY, [0, 1000], [-30, 30]);

  const handleMouseMove = (e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100vh] flex items-center pt-64 pb-32 overflow-hidden bg-[#fcfcfd] selection:bg-emerald-100 selection:text-emerald-900"
    >
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 z-0 mesh-gradient opacity-20" />
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      {/* Physics Reactive Blobs */}
      <motion.div 
        style={{ x: moveX, y: moveY }}
        className="blob w-[80rem] h-[80rem] bg-emerald-500/5 -top-[40rem] -left-[40rem] blur-[180px] pointer-events-none" 
      />
      <motion.div 
        style={{ x: useTransform(springX, [0, 1000], [40, -40]), y: useTransform(springY, [0, 1000], [40, -40]) }}
        className="blob w-[70rem] h-[70rem] bg-blue-500/5 -bottom-[30rem] -right-[30rem] blur-[180px] pointer-events-none" 
      />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.2, duration: 1 }}
               className="inline-flex items-center gap-4 mb-10 p-1.5 pl-4 pr-1.5 bg-white border border-slate-100 rounded-full shadow-sm"
            >
               <span className="text-[9px] font-black uppercase tracking-[0.45em] text-slate-400">THEKINDBOWL V3.0</span>
               <div className="h-4 w-px bg-slate-200"></div>
               <div className="flex items-center gap-2 pr-1">
                  <Sparkles size={12} className="text-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600">NEXT-GEN LOGISTICS</span>
               </div>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[115px] font-black tracking-[-0.07em] leading-[0.85] text-slate-950 mb-10">
              <span className="block overflow-hidden pb-4">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >Redefine</motion.span>
              </span>
              <span className="block overflow-hidden pb-4">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block gradient-text"
                >Resource Orbit.</motion.span>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-lg mb-14 font-medium tracking-tight">
              An immersive mesh-network where surplus orbits necessity. Engineered for high-velocity redistribution and global impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg" 
                onClick={() => navigate('/explore')}
                className="bg-slate-950 hover:bg-emerald-600 text-white text-[11px] font-black px-12 py-7 rounded-[22px] shadow-deep transition-all duration-500 group border-none btn-premium h-auto uppercase tracking-widest"
              >
                Explore Protocol
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/post')}
                className="bg-white border-slate-200 text-slate-950 text-[11px] font-black px-12 py-7 rounded-[22px] hover:bg-slate-50 hover:border-slate-950 transition-all duration-500 shadow-premium h-auto uppercase tracking-widest"
              >
                Deploy Assets
              </Button>
            </div>

            <div className="mt-28 flex gap-12 items-center">
               <div className="space-y-1">
                 <p className="text-4xl font-black tracking-tighter text-slate-950">99.4%</p>
                 <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] italic">Network Integrity</p>
               </div>
               <div className="h-10 w-px bg-slate-200"></div>
               <div className="space-y-1">
                 <p className="text-4xl font-black tracking-tighter text-slate-950">420k</p>
                 <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] italic">Active Nodes</p>
               </div>
            </div>
          </motion.div>

          <div className="relative h-[650px] hidden lg:flex items-center justify-center">
             {/* Physics elements */}
             <div className="relative w-full h-full perspective-2000 preserve-3d">
                <PhysicsCard className="absolute top-[5%] left-[10%] z-20 pointer-events-auto" delay={0.4}>
                   <div className="glass rounded-[36px] p-8 shadow-deep border-white w-72">
                      <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-emerald-500 to-teal-400 flex items-center justify-center mb-6 shadow-xl text-white">
                         <Utensils size={24} />
                      </div>
                      <h4 className="text-xl font-black tracking-tight mb-1 text-slate-950">Redistribution</h4>
                      <p className="text-[10px] uppercase font-black tracking-[0.25em] text-emerald-600 mb-6 font-medium">Priority Alpha</p>
                      <div className="flex -space-x-3 mb-4">
                         {[1,2,3,4].map(i => (
                           <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                             <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="user" />
                           </div>
                         ))}
                      </div>
                   </div>
                </PhysicsCard>

                <PhysicsCard className="absolute bottom-[15%] left-[0%] z-30 pointer-events-auto" delay={0.6}>
                   <div className="glass rounded-[32px] p-6 shadow-deep border-white w-60 text-slate-950">
                      <div className="flex items-center gap-3 mb-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                            <Heart size={18} className="text-rose-500 fill-current" />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-[0.2em]">Node Vitality</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                         <motion.div 
                           animate={{ x: ["-100%", "100%"] }} 
                           transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                           className="h-full w-2/3 bg-linear-to-r from-rose-500 to-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.3)]" 
                         />
                      </div>
                      <p className="text-[11px] font-bold text-slate-400 tracking-wide">Relational sync active</p>
                   </div>
                </PhysicsCard>

                <PhysicsCard className="absolute top-[25%] right-[-5%] z-10 pointer-events-auto" delay={0.8}>
                   <div className="glass rounded-[40px] p-8 shadow-deep border-white w-80">
                      <div className="flex justify-between items-center mb-6">
                         <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-white shadow-xl">
                            <BarChart3 size={20} />
                         </div>
                         <span className="badge-premium bg-emerald-50 text-emerald-600 border-emerald-100">+24.8%</span>
                      </div>
                      <h4 className="text-base font-black tracking-tight mb-4 text-slate-950">Impact Velocity</h4>
                      <div className="h-24 flex items-end gap-1.5 px-1">
                         {[30, 60, 40, 100, 55, 85, 70, 95].map((h, i) => (
                           <motion.div 
                             key={i} 
                             initial={{ height: 0 }}
                             animate={{ height: `${h}%` }}
                             transition={{ delay: 1.4 + (i*0.1), duration: 1.5, ease: "circOut" }}
                             className="flex-1 bg-slate-100 rounded-t-md hover:bg-emerald-500/20 transition-colors"
                           />
                         ))}
                      </div>
                   </div>
                </PhysicsCard>

                <motion.div 
                   style={{ x: useTransform(moveX, x => x * 1.8), y: useTransform(moveY, y => y * 1.8) }}
                   className="absolute z-0 w-[500px] h-[500px] bg-linear-to-tr from-emerald-500/5 to-blue-500/5 rounded-full blur-[140px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />

                <PhysicsCard className="absolute top-[10%] right-[30%]" delay={1}>
                   <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-emerald-500 shadow-xl border-white">
                      <Zap size={20} fill="currentColor" />
                   </div>
                </PhysicsCard>
                <PhysicsCard className="absolute bottom-[20%] right-[15%]" delay={1.2}>
                   <div className="w-14 h-14 rounded-full glass flex items-center justify-center text-blue-500 shadow-xl border-white">
                      <ShoppingBag size={22} />
                   </div>
                </PhysicsCard>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
