import { Search, MapPin, Heart, Instagram, Twitter, Facebook, Mail, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-[#fcfcfd] text-slate-950 pt-24 pb-12 overflow-hidden relative border-t border-slate-100">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.4fr] gap-12 md:gap-20 mb-16">
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 transform -rotate-6">
                <Heart className="text-white w-5 h-5 fill-current" />
              </div>
              <span className="text-2xl font-black tracking-[-0.05em]">
                TheKind<span className="text-emerald-500">Bowl</span>
              </span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed max-w-xs text-base">
              Architecting the infrastructure for global circular food systems and compassionate resource redistribution. 
            </p>
            <div className="flex items-center space-x-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-500 group shadow-sm">
                  <Icon size={16} className="text-slate-400 group-hover:text-white group-hover:scale-110 transition-all" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[9px] font-black mb-8 tracking-[0.3em] uppercase text-slate-400">Platform</h4>
            <ul className="space-y-4 text-slate-500 font-bold text-xs">
              <li className="hover:text-emerald-600 transition-all cursor-pointer flex items-center group">
                 Asset Catalog <ExternalLink size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </li>
              <li className="hover:text-emerald-600 transition-all cursor-pointer flex items-center group">
                 Companion Center <ExternalLink size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </li>
              <li className="hover:text-emerald-600 transition-all cursor-pointer flex items-center group">
                 Network Logistics <ExternalLink size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </li>
              <li className="hover:text-emerald-600 transition-all cursor-pointer flex items-center group">
                 Developer API <ExternalLink size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[9px] font-black mb-8 tracking-[0.3em] uppercase text-slate-400">Organization</h4>
            <ul className="space-y-4 text-slate-500 font-bold text-xs">
              <li className="hover:text-emerald-600 transition-all cursor-pointer">The Manifesto</li>
              <li className="hover:text-emerald-600 transition-all cursor-pointer">Transparency Protocol</li>
              <li className="hover:text-emerald-600 transition-all cursor-pointer">Open Roles</li>
              <li className="hover:text-emerald-600 transition-all cursor-pointer">Media Kit</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-8 rounded-[32px] shadow-sm">
            <h4 className="text-[9px] font-black mb-6 tracking-[0.3em] uppercase text-emerald-500 italic">Newsletter</h4>
            <p className="text-xs text-slate-400 mb-5 font-medium">Get internal updates on our impact velocity.</p>
            <div className="relative group">
               <input 
                 type="email" 
                 placeholder="protocol@email.com" 
                 className="w-full bg-white border border-slate-200 rounded-xl py-4 px-5 text-xs font-bold focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
               />
               <Button className="mt-3 w-full bg-slate-950 hover:bg-emerald-600 text-white font-black rounded-xl py-6 h-auto shadow-deep border-none uppercase tracking-widest text-[9px]">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 font-black text-[9px] gap-6 uppercase tracking-[0.3em]">
           <p>© 2026 THEKINDBOWL TECHNOLOGIES. BUILT FOR GLOBAL IMPACT.</p>
           <div className="flex items-center gap-8">
             <span className="hover:text-slate-950 transition-colors cursor-pointer">Privacy / GDPR</span>
             <span className="hover:text-slate-950 transition-colors cursor-pointer">Security Protocol</span>
             <span className="hover:text-slate-950 transition-colors cursor-pointer">Governance</span>
           </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/[0.03] rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />
    </footer>
  );
};
