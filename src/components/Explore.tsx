import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
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
  Zap,
  CheckCircle2,
  X
} from "lucide-react";
import React, { useState, useRef, MouseEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const Explore = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [acceptedIds, setAcceptedIds] = useState<string[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const categories = ["All Needs", "Human Nutrition", "Raw Food", "Pet Care", "Food Bank"];
  
  const listings = [
    { id: "don_001", title: "Heirloom Grains", status: "Active", type: "RAW INGREDIENT", dist: "1.2km", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400", urgent: false, expiry: "12H", match: 94, info: "Stable storage", pickup: "Green Valley Farm", delivery: "Central Pantry", time: "2:00 PM" },
    { id: "don_002", title: "Artisan Bakery Bundle", status: "Critical", type: "BAKERY", dist: "0.5km", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400", urgent: true, expiry: "45M", match: 98, info: "Traffic peak: +5m", pickup: "Sunrise Bakery", delivery: "Shelter 8", time: "11:30 AM" },
    { id: "don_003", title: "Golden Retriever Adult", status: "High Priority", type: "PET ADOPTION", dist: "3.2km", img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400", urgent: true, vetting: "In Progress", match: 88, info: "Needs yard", pickup: "Paws Rescue", delivery: "New Home", time: "4:00 PM" },
    { id: "don_004", title: "Premium Kibble Bulk", status: "Replenished", type: "PET FOOD", dist: "2.1km", img: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&q=80&w=400", urgent: false, capacity: "Large", match: 76, info: "Truck ready", pickup: "PetSupplies Inc", delivery: "Animal Haven", time: "10:00 AM" },
    { id: "don_005", title: "Community Kitchen Hub", status: "Operations", type: "NGO PARTNER", dist: "0.8km", img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=400", urgent: false, statusMsg: "Hub Capacity: 80%", match: 92, info: "2 loading bays", pickup: "Main Kitchen", delivery: "Distribution Point", time: "1:00 PM" },
    { id: "don_006", title: "Gourmet Salad Array", status: "Critical", type: "PREPARED MEAL", dist: "1.5km", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400", urgent: true, expiry: "1.5H", match: 95, info: "Cold chain req.", pickup: "Fresh Salads Co", delivery: "City Shelter", time: "12:30 PM" },
  ];

  useEffect(() => {
    const active = JSON.parse(localStorage.getItem("activeDonations") || "[]");
    setAcceptedIds(active.map((d: any) => d.id));
  }, []);

  const handleAccept = (item: any) => {
    if (acceptedIds.includes(item.id)) return;
    setSelectedDonation(item);
  };

  const handleStartTask = () => {
    if (!selectedDonation) return;
    
    const active = JSON.parse(localStorage.getItem("activeDonations") || "[]");
    const newDonation = {
      ...selectedDonation,
      status: "Assigned"
    };
    
    const updatedActive = [...active, newDonation];
    localStorage.setItem("activeDonations", JSON.stringify(updatedActive));
    
    setAcceptedIds([...acceptedIds, selectedDonation.id]);
    setSelectedDonation(null);
    navigate('/dashboard');
  };

  useEffect(() => {
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] relative z-10"
          >
            {listings.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="group border-none glass overflow-hidden cursor-pointer relative rounded-[48px] shadow-premium hover:shadow-deep hover:border-emerald-500/20 transition-all duration-700 backface-hidden h-full min-h-[420px] flex flex-col !p-0">
                  <div className="w-full h-[220px] overflow-hidden rounded-t-[48px] bg-slate-100 relative">
                    <img 
                      src={item.img} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540333280207-e9a044754400?auto=format&fit=crop&q=80&w=400';
                      }}
                      alt={item.title} 
                      className="w-full h-full object-cover block transform-none transition-none" 
                    />
                    <div className="absolute top-8 left-8 flex gap-4 z-10">
                      <Badge className={`badge-premium ${item.urgent ? "bg-rose-600 text-white border-none shadow-lg" : "bg-white text-emerald-600 border-slate-100"} !py-2 px-5 !tracking-[0.3em] font-black`}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-10 md:p-12 relative flex-1 flex flex-col justify-between">
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
                        
                      </div>
                    </div>

                    <div className="flex items-center justify-center pt-10 mt-10 border-t border-slate-100">
                       <Button 
                         onClick={() => handleAccept(item)}
                         disabled={acceptedIds.includes(item.id)}
                         className={`rounded-[24px] px-10 py-6 h-auto font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-700 border-none btn-premium shadow-xl ${
                           acceptedIds.includes(item.id) 
                             ? "bg-emerald-100 text-emerald-600 cursor-default hover:bg-emerald-100" 
                             : "bg-slate-950 text-white hover:bg-emerald-500"
                         }`}
                       >
                        {acceptedIds.includes(item.id) ? "Accepted ✅" : "Accept Donation"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
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

      {/* Confirmation Modal */}
      <AnimatePresence>
        {selectedDonation && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDonation(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl glass rounded-[48px] p-12 shadow-deep border-white overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
              
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 rounded-[24px] bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                  <CheckCircle2 size={32} />
                </div>
                <button 
                  onClick={() => setSelectedDonation(null)}
                  className="p-4 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-950 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <h3 className="text-4xl font-black text-slate-950 tracking-tighter mb-4">You accepted this donation!</h3>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed italic">Confirm selection to begin the distribution protocol.</p>
              
              <div className="space-y-6 mb-12">
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-500">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2 italic">Pickup Location</p>
                    <p className="text-lg font-bold text-slate-950 leading-none">{selectedDonation.pickup}</p>
                  </div>
                </div>
                
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-500">
                    <Navigation size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2 italic">Delivery Location</p>
                    <p className="text-lg font-bold text-slate-950 leading-none">{selectedDonation.delivery}</p>
                  </div>
                </div>
                
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-orange-500">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2 italic">Pickup Time</p>
                    <p className="text-lg font-bold text-slate-950 leading-none">{selectedDonation.time}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => setSelectedDonation(null)}
                  variant="outline" 
                  className="rounded-3xl py-8 h-auto font-black text-[10px] uppercase tracking-[0.3em] border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-950 transition-all"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleStartTask}
                  className="bg-slate-950 hover:bg-emerald-500 text-white font-black rounded-3xl py-8 h-auto transition-all duration-700 btn-premium border-none uppercase tracking-[0.3em] text-[10px] shadow-xl"
                >
                  Start Task
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
