import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { 
  Search, 
  MapPin, 
  Filter, 
  ChevronDown, 
  LayoutGrid, 
  Map as MapIcon,
  Navigation,
  ExternalLink,
  MoreVertical,
  Utensils,
  PawPrint,
  Sparkles,
  Clock,
  Zap
} from "lucide-react";
import React, { useState, useRef, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const MagneticCard = ({ children, i }: { children: React.ReactNode, i: number, key?: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-30, 30], [5, -5]);
  const rotateY = useTransform(mouseX, [-30, 30], [-5, 5]);

  const handleMouseMove = (e: MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) / 6);
      y.set((e.clientY - centerY) / 6);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY, rotateX, rotateY }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-2000 preserve-3d"
    >
      {children}
    </motion.div>
  );
};

export const Explore = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const categories = ["All Needs", "Human Nutrition", "Raw Food", "Pet Care", "Food Bank"];
  
  const listings = [
    { title: "Heirloom Grains", status: "Active", type: "Raw Ingredient", dist: "1.2km", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400", urgent: false, expiry: "12h", match: 94, info: "Stable storage" },
    { title: "Artisan Bakery Bundle", status: "Critical", type: "Prepared Meal", dist: "0.5km", img: "https://images.unsplash.com/photo-1540333280207-e9a044754400?auto=format&fit=crop&q=80&w=400", urgent: true, expiry: "45m", match: 98, info: "Traffic peak: +5m" },
    { title: "Golden Retriever Adult", status: "High Priority", type: "Pet Adoption", dist: "3.2km", img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400", urgent: true, vetting: "In Progress", match: 88, info: "Needs yard" },
    { title: "Premium Kibble Bulk", status: "Replenished", type: "Pet Food", dist: "2.1km", img: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&q=80&w=400", urgent: false, capacity: "Large", match: 76, info: "Truck ready" },
    { title: "Community Kitchen Hub", status: "Operations", type: "NGO Partner", dist: "0.8km", img: "https://images.unsplash.com/photo-1534080333753-96ed2d5d804b?auto=format&fit=crop&q=80&w=400", urgent: false, statusMsg: "Hub Capacity: 80%", match: 92, info: "2 loading bays" },
    { title: "Gourmet Salad Array", status: "Critical", type: "Prepared Meal", dist: "1.5km", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400", urgent: true, expiry: "1.5h", match: 95, info: "Cold chain req." },
  ];

  React.useEffect(() => {
    if (viewMode === 'map') {
      // Load Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
      document.head.appendChild(link);

      // Load Leaflet JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        if (mapContainerRef.current && !mapInstanceRef.current) {
          const L = (window as any).L;
          const bangaloreCoords = [12.9716, 77.5946];
          
          mapInstanceRef.current = L.map(mapContainerRef.current).setView(bangaloreCoords, 12);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(mapInstanceRef.current);

          const markers = [
            { pos: [12.9716, 77.5946], label: "🍱 Food Donation: Central Market" },
            { pos: [12.9850, 77.6050], label: "🐾 Animal Shelter: Paws Foundation" },
            { pos: [12.9550, 77.5850], label: "🤝 NGO: Hunger Free City" },
            { pos: [12.9900, 77.5750], label: "🍽 Food Bank: Community Pantry" },
            { pos: [13.0100, 77.6200], label: "🍱 Food Donation: Hebbal Hub" },
            { pos: [12.9300, 77.5400], label: "🤝 NGO: Hope Mission" },
          ];

          markers.forEach(marker => {
            L.marker(marker.pos).addTo(mapInstanceRef.current)
              .bindPopup(marker.label);
          });
        }
      };
      document.head.appendChild(script);

      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }
  }, [viewMode]);

  return (
    <div className="pt-64 pb-32 min-h-screen container mx-auto px-8 md:px-16 lg:px-24 text-slate-950 bg-[#fcfcfd] relative overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-1/4 -left-1/4 w-[60rem] h-[60rem] bg-emerald-500/5 rounded-full blur-[180px] pointer-events-none" />
          <div className="absolute bottom-1/4 -right-1/4 w-[50rem] h-[50rem] bg-blue-500/5 rounded-full blur-[180px] pointer-events-none" />

          <div className="mb-20 relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1 }}
           >

              <h2 className="text-5xl md:text-7xl lg:text-[85px] font-black tracking-[-0.07em] leading-[0.85] text-slate-950 mb-16">
                Your Extra Can Be<br/>
                <span className="gradient-text tracking-tighter">Someone’s Everything.</span>
              </h2>
           </motion.div>

           {/* View Toggle Buttons */}
           <div className="flex justify-center items-center">
              <div className="flex p-4 glass rounded-[40px] border border-slate-100 w-full lg:w-auto">
                 <button 
                   onClick={() => setViewMode('grid')}
                   className={`flex-1 lg:flex-none flex items-center justify-center gap-4 px-12 py-7 rounded-[28px] font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-700 ${
                     viewMode === 'grid' ? "bg-slate-950 text-white shadow-xl" : "text-slate-500 hover:text-slate-950"
                   }`}
                 >
                   <LayoutGrid size={18} /> Explore Donations
                 </button>
                 <button 
                   onClick={() => setViewMode('map')}
                   className={`flex-1 lg:flex-none flex items-center justify-center gap-4 px-12 py-7 rounded-[28px] font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-700 ${
                     viewMode === 'map' ? "bg-slate-950 text-white shadow-xl" : "text-slate-500 hover:text-slate-950"
                   }`}
                 >
                   <MapIcon size={18} /> View on Map
                 </button>
              </div>
           </div>
        </div>


        {viewMode === 'grid' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10"
          >
            {listings.map((item, i) => (
              <MagneticCard key={i} i={i}>
                <Card className="group border-none glass overflow-hidden cursor-pointer relative rounded-[48px] shadow-premium hover:shadow-deep hover:border-emerald-500/20 transition-all duration-700 backface-hidden h-full">
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] ease-[cubic-bezier(0.16,1,0.3,1)]" 
                    />
                    <div className="absolute top-8 left-8 flex gap-4 z-10">
                      <Badge className={`badge-premium ${item.urgent ? "bg-rose-600 text-white border-none shadow-lg" : "bg-white text-emerald-600 border-slate-100"} !py-2 px-5 !tracking-[0.3em] font-black`}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-10 md:p-12 relative">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic tracking-widest leading-none">{item.type}</p>
                           {item.match && (
                             <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 text-[8px] font-black px-2 py-0.5 rounded-full">
                               {item.match}% MATCH
                             </Badge>
                           )}
                        </div>
                        <h4 className="text-2xl font-black text-slate-950 group-hover:text-emerald-600 transition-colors duration-700 leading-tight tracking-tighter mb-4">{item.title}</h4>
                        
                        {item.expiry && (
                          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-rose-500 mb-2">
                             <Clock size={10} strokeWidth={3} /> Expires in {item.expiry}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 py-1 px-3 bg-slate-50 border border-slate-100 rounded-lg inline-flex w-fit">
                           <Zap size={10} className="text-orange-500" />
                           <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{item.info}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-10 mt-10 border-t border-slate-100">
                       <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                             <MapPin size={14} className="text-emerald-500" />
                             <span className="text-[11px] font-black text-slate-400 tracking-[0.3em] uppercase italic">{item.dist}</span>
                          </div>
                       </div>
                       <Button className="rounded-[24px] px-10 py-6 h-auto font-black text-[10px] uppercase tracking-[0.3em] bg-slate-950 text-white hover:bg-emerald-500 transition-all duration-700 border-none btn-premium shadow-xl">
                        Accept Donation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </MagneticCard>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 h-[800px] rounded-[100px] overflow-hidden bg-slate-50 relative border-[20px] border-white shadow-deep relative z-10"
          >
             <div ref={mapContainerRef} className="absolute inset-0 z-10 h-full w-full" />

             <div className="absolute top-16 left-16 flex flex-col space-y-8 z-30">
                <Button variant="secondary" size="icon" className="w-[96px] h-[96px] rounded-[40px] shadow-deep glass text-slate-950 hover:bg-emerald-500 hover:text-white transition-all border-white">
                   <Navigation size={36} />
                </Button>
             </div>
          </motion.div>
        )}
    </div>
  );
};
