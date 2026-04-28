import { motion } from "motion/react";
import { 
  Heart, 
  MapPin, 
  PawPrint, 
  Info, 
  Calendar, 
  ShieldCheck,
  ChevronRight,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export const PetAdoption = () => {
  const pets = [
    { name: "Luna", breed: "Golden Retriever", age: "2 yrs", location: "Greenwich Park Node", tags: ["Friendly", "High Vitality"], img: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400", urgent: true, stage: "Interview", verified: true, health: "A+" },
    { name: "Milo", breed: "Calico Essence", age: "6 months", location: "Downtown Hub", tags: ["Quiet", "Calibrating"], img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400", urgent: false, stage: "Available", verified: true, health: "A" },
    { name: "Cooper", breed: "Beagle Variant", age: "4 yrs", location: "Westside Hills", tags: ["Analytical", "Vocal"], img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400", urgent: false, stage: "Home Check", verified: true, health: "A" },
    { name: "Bella", breed: "Persian Spirit", age: "1 yr", location: "Evergreen Heights", tags: ["Serene", "Indoor"], img: "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=400", urgent: true, stage: "Available", verified: true, health: "A+" },
  ];

  return (
    <div className="pt-56 pb-24 container mx-auto px-8 md:px-16 lg:px-24 bg-[#fcfcfd] min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -right-1/4 w-[50rem] h-[50rem] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-[40rem] h-[40rem] bg-indigo-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="mb-32 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-6 mb-10">
            <span className="badge-premium bg-emerald-50 text-emerald-600 italic py-2 px-6 border-emerald-100 backdrop-blur-md uppercase tracking-widest">Companion Protocol</span>
            <span className="h-px w-20 bg-slate-200"></span>
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-[0.4em] tracking-widest">Biological Resource Network</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-[85px] font-black text-slate-950 tracking-[-0.07em] mb-10 leading-[0.85]">
            Redefine the<br/>
            <span className="gradient-text tracking-tighter">Connection.</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg md:text-xl leading-relaxed max-w-xl tracking-tight">
            Every adoption is a high-impact narrative of redemption. Facilitate a new chapter for these exceptional souls.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20 pb-12 border-b border-slate-100 relative z-10">
        <div className="flex flex-wrap gap-5">
          {["Global Roster", "Canine", "Feline", "Secondary Soul"].map((filter, i) => (
            <button key={i} className={`px-12 py-7 rounded-[28px] font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-700 ${
              i === 0 ? "bg-slate-950 text-white shadow-deep" : "glass border-slate-100 text-slate-400 hover:text-slate-950"
            }`}>
              {filter}
            </button>
          ))}
        </div>
        <button className="rounded-[28px] glass border border-slate-100 text-slate-500 font-black text-[11px] uppercase tracking-[0.3em] px-12 py-7 flex items-center gap-4 hover:bg-slate-50 hover:text-slate-950 transition-all duration-700 shadow-premium h-auto font-black">
          <Filter size={18} /> Matrix Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {pets.map((pet, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10, rotate: i % 2 === 0 ? 1 : -1 }}
            transition={{ 
              delay: i * 0.1, 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              rotate: { type: "spring", stiffness: 200, damping: 15 }
            }}
            viewport={{ once: true }}
            className="perspective-2000"
          >
            <Card className="group border-none glass overflow-hidden cursor-pointer rounded-[48px] shadow-premium hover:shadow-deep transition-all duration-700 h-full">
              <div className="relative h-[480px] overflow-hidden">
                <img 
                  src={pet.img} 
                  alt={pet.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)]" 
                />
                
                <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10">
                  {pet.urgent ? (
                    <motion.span 
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="badge-premium bg-rose-600 text-white shadow-lg border-none !py-2 px-5 text-[10px] !tracking-[0.3em] font-black"
                    >CRITICAL</motion.span>
                  ) : <div />}
                  <motion.button 
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    whileTap={{ scale: 0.8 }}
                    className="w-14 h-14 glass rounded-[22px] flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white transition-all duration-700 shadow-premium border-white"
                  >
                    <Heart size={24} className="group-hover:fill-current transition-all" />
                  </motion.button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950/80 to-transparent flex flex-col justify-end p-10">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em] mb-1 italic tracking-widest leading-none">
                      <MapPin size={14} strokeWidth={3} /> {pet.location}
                    </div>
                    {pet.verified && (
                      <div className="flex items-center gap-2 text-blue-400 font-bold text-[9px] uppercase tracking-widest">
                         <ShieldCheck size={12} strokeWidth={3} /> Verified Shelter
                      </div>
                    )}
                  </div>
                  <h3 className="text-5xl font-black text-white tracking-tighter leading-none mt-2">{pet.name}</h3>
                </div>
              </div>
              
              <CardContent className="p-10 md:p-12">
                <div className="flex justify-between items-center mb-8">
                   <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-slate-950 text-white rounded-full text-[9px] font-black uppercase tracking-wider">
                         Stage: {pet.stage}
                      </div>
                      <div className="px-3 py-1 border border-slate-100 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-wider">
                         Health: {pet.health}
                      </div>
                   </div>
                </div>

                <div className="flex justify-between items-baseline mb-8">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] italic group-hover:text-slate-950 transition-colors tracking-widest">{pet.breed}</p>
                  <p className="text-[10px] font-black text-slate-950 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">{pet.age} Cycle</p>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-12">
                  {pet.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 border border-slate-50 bg-slate-50 px-4 py-1.5 rounded-2xl italic hover:text-emerald-600 hover:border-emerald-500/20 transition-all">
                      #{tag}
                    </span>
                  ))}
                </div>

                <Button className="w-full bg-slate-950 hover:bg-emerald-500 text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-[24px] py-8 h-auto transition-all duration-700 btn-premium border-none shadow-deep">
                  Request Connection
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-32 glass p-20 md:p-28 rounded-[72px] border border-slate-100 shadow-deep relative overflow-hidden flex flex-col lg:grid lg:grid-cols-[1.4fr_1.1fr] items-center justify-between gap-20 z-10">
        <div className="relative z-10">
           <div className="badge-premium bg-emerald-50 text-emerald-600 border-emerald-100 mb-10 !py-2 !px-8 backdrop-blur-md">Ecosystem Expansion</div>
           <h3 className="text-5xl md:text-7xl font-black text-slate-950 tracking-[-0.07em] mb-8 leading-[0.85]">Join our elite<br/>foster network.</h3>
           <p className="text-lg md:text-xl text-slate-500 font-medium mb-16 max-w-xl leading-relaxed tracking-tight">
             Not ready for terminal commitment? Facilitate meaningful trajectory shifts by hosting a soul in a premium environment until they locate their permanent node.
           </p>
           <Button className="rounded-[28px] px-16 py-8 bg-slate-950 text-white font-black hover:bg-emerald-600 transition-all duration-700 shadow-deep btn-premium border-none uppercase tracking-[0.3em] text-[11px] h-auto">
              Apply for Foster Status
           </Button>
        </div>
        <div className="relative z-10 w-full lg:w-auto">
           <div className="aspect-[4/5] rounded-[80px] border-[16px] border-white shadow-deep overflow-hidden animate-float-slow transform rotate-3 scale-110">
              <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Foster" />
           </div>
        </div>
        
        {/* Cinematic light rays */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-emerald-500/5 rounded-full blur-[180px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] -z-10" />
      </div>
    </div>
  );
};
