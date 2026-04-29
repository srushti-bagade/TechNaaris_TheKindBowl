import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  MapPin, 
  PawPrint, 
  Info, 
  Calendar, 
  ShieldCheck,
  ChevronRight,
  Filter,
  CheckCircle2,
  X,
  Phone,
  MessageSquare,
  Navigation
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

export const PetAdoption = () => {
  const [selectedPet, setSelectedPet] = useState<any>(null);
  const [contactPet, setContactPet] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("Available Pets");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("connectionRequests") || "[]");
    setRequests(storedRequests);
  }, []);

  // Simulated approval logic
  useEffect(() => {
    const pendingRequests = requests.filter(r => r.status === "Pending");
    
    if (pendingRequests.length > 0) {
      const timers = pendingRequests.map(req => {
        const delay = 5000 + Math.random() * 5000; // 5-10 seconds
        return setTimeout(() => {
          const currentRequests = JSON.parse(localStorage.getItem("connectionRequests") || "[]");
          const updatedRequests = currentRequests.map((r: any) => 
            r.id === req.id ? { ...r, status: "Approved" } : r
          );
          localStorage.setItem("connectionRequests", JSON.stringify(updatedRequests));
          setRequests(updatedRequests);
          toast.success(`Shelter approved your request for ${req.name}! ✅`, {
            duration: 5000,
          });
        }, delay);
      });

      return () => timers.forEach(t => clearTimeout(t));
    }
  }, [requests]);

  const pets = [
    { id: "pet_001", type: "dog", name: "Luna", breed: "Golden Retriever", age: "2 yrs", location: "Greenwich Park Node", tags: ["Friendly", "High Vitality"], img: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400", urgent: true, stage: "Interview", verified: true, health: "A+" },
    { id: "pet_002", type: "cat", name: "Milo", breed: "Calico Essence", age: "6 months", location: "Downtown Hub", tags: ["Quiet", "Calibrating"], img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400", urgent: false, stage: "Available", verified: true, health: "A" },
    { id: "pet_003", type: "dog", name: "Cooper", breed: "Beagle Variant", age: "4 yrs", location: "Westside Hills", tags: ["Analytical", "Vocal"], img: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400", urgent: false, stage: "Home Check", verified: true, health: "A" },
    { id: "pet_004", type: "cat", name: "Bella", breed: "Persian Spirit", age: "1 yr", location: "Evergreen Heights", tags: ["Serene", "Indoor"], img: "https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=400", urgent: true, stage: "Available", verified: true, health: "A+" },
  ];

  const foods = [
    { id: "food_001", type: "food", name: "Premium Kibble", breed: "Bulk Supply", age: "N/A", location: "Pet Food Bank", tags: ["Nutritious", "Sealed"], img: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&q=80&w=400", urgent: false, stage: "In Stock", verified: true, health: "N/A" },
    { id: "food_002", type: "food", name: "Organic Wet Food", breed: "Variety Pack", age: "N/A", location: "City Pantry", tags: ["Mixed", "Fresh"], img: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=400", urgent: true, stage: "Limited", verified: true, health: "N/A" },
  ];

  const allItems = [...pets, ...foods];

  const filteredItems = allItems.filter(item => {
    if (activeFilter === "Available Pets") return item.type !== "food";
    if (activeFilter === "Canine") return item.type === "dog";
    if (activeFilter === "Feline") return item.type === "cat";
    if (activeFilter === "Food") return item.type === "food";
    return true;
  });

  const getPetRequest = (petId: string) => {
    return requests.find(r => r.id === petId);
  };

  const handleRequest = (pet: any) => {
    if (pet.type === "food") {
      toast.info("Food items are distributed via the Explore page! Redirecting...");
      return;
    }
    const existingReq = getPetRequest(pet.id);
    if (existingReq) {
      if (existingReq.status === "Approved") {
        setContactPet(pet);
      }
      return;
    }
    setSelectedPet(pet);
  };

  const handleConfirmRequest = () => {
    if (!selectedPet) return;

    const storedRequests = JSON.parse(localStorage.getItem("connectionRequests") || "[]");
    const newRequest = {
      id: selectedPet.id,
      name: selectedPet.name,
      location: selectedPet.location,
      status: "Pending",
      timestamp: new Date().toISOString()
    };

    const updatedRequests = [...storedRequests, newRequest];
    localStorage.setItem("connectionRequests", JSON.stringify(updatedRequests));
    
    setRequests(updatedRequests);
    setSelectedPet(null);
    toast.success("Connection request sent successfully! ✅");
  };

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
            <span className="badge-premium bg-emerald-50 text-emerald-600 italic py-2 px-6 border-emerald-100 backdrop-blur-md uppercase tracking-widest">Pet Companionship</span>
            <span className="h-px w-20 bg-slate-200"></span>
            <span className="text-[10px] uppercase font-black text-slate-400 tracking-[0.4em] tracking-widest">KindBowl Community</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-[85px] font-black text-slate-950 tracking-[-0.07em] mb-10 leading-[0.85]">
            Redefine the<br/>
            <span className="gradient-text tracking-tighter">Connection.</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg md:text-xl leading-relaxed max-w-xl tracking-tight">
            Every adoption gives a pet a second chance. Find your new best friend.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col items-center justify-center mb-20 pb-12 border-b border-slate-100 relative z-10 w-full gap-8">
        <div className="flex flex-wrap items-center justify-center gap-8 w-full">
          {["Available Pets", "Canine", "Feline"].map((filter, i) => (
            <button 
              key={i} 
              onClick={() => setActiveFilter(filter)}
              className={`px-16 py-7 rounded-[28px] font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-700 min-w-[240px] text-center ${
                activeFilter === filter ? "bg-slate-950 text-white shadow-deep" : "glass border-slate-100 text-slate-400 hover:text-slate-950"
              }`}
            >
              {filter}
            </button>
          ))}
          
          <button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className={`rounded-[28px] glass border border-slate-100 text-slate-500 font-black text-[11px] uppercase tracking-[0.3em] px-16 py-7 flex items-center gap-4 transition-all duration-700 shadow-premium h-auto font-black ${
              isFiltersOpen ? "bg-slate-50 text-slate-950" : "hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <Filter size={18} /> Filters
          </button>
        </div>
        
        <AnimatePresence>
          {isFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="w-full flex justify-center overflow-hidden"
            >
              <div className="w-full max-w-4xl glass border border-slate-100 rounded-[32px] p-8 shadow-deep flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex flex-col items-center md:items-start">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">Refine Results</p>
                  <h4 className="text-xl font-black text-slate-950 tracking-tighter">Select Category</h4>
                </div>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  {["Canine", "Feline", "Food"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setActiveFilter(opt);
                        setIsFiltersOpen(false);
                      }}
                      className={`px-10 py-5 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                        activeFilter === opt ? "bg-slate-950 text-white shadow-lg" : "bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-950 border border-slate-100"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={() => setIsFiltersOpen(false)}
                  className="p-4 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-950 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((pet, i) => (
            <motion.div
              key={pet.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                delay: i * 0.05, 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1]
              }}
              viewport={{ once: true }}
            >
              <Card className="group glass overflow-hidden cursor-pointer rounded-[48px] shadow-premium hover:shadow-deep transition-all duration-700 h-full flex flex-col gap-0 !p-0 !border-none">
                <div className="relative h-[480px] w-full overflow-hidden rounded-t-[48px]">
                  <img 
                    src={pet.img} 
                    alt={pet.name} 
                    className="w-full h-full object-cover object-center block transform-none transition-none" 
                  />
                
                <div className="absolute top-8 left-8 right-8 flex justify-end items-center z-10">
                  <button 
                    className="w-14 h-14 glass rounded-[22px] flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-white transition-all duration-700 shadow-premium border-white"
                  >
                    <Heart size={24} className="group-hover:fill-current transition-all" />
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950/80 to-transparent flex flex-col justify-end p-10">
                  <h3 className="text-5xl font-black text-white tracking-tighter leading-none mt-2">{pet.name}</h3>
                </div>
              </div>
              
              <CardContent className="p-10 md:p-12 flex-grow flex flex-col">
                <div className="flex justify-between items-baseline mb-8">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] italic group-hover:text-slate-950 transition-colors tracking-widest">{pet.breed}</p>
                  <p className="text-[10px] font-black text-slate-950 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
                    {pet.age.includes("yr") ? (parseInt(pet.age) * 12) : parseInt(pet.age)} Months
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {pet.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 border border-slate-50 bg-slate-50 px-4 py-1.5 rounded-2xl italic hover:text-emerald-600 hover:border-emerald-500/20 transition-all">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="min-h-[70px] mb-6">
                  {getPetRequest(pet.id) && (
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Connection Status</span>
                      <Badge className={`${
                        getPetRequest(pet.id)?.status === "Approved" 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-orange-100 text-orange-700"
                      } border-none font-black text-[9px] uppercase tracking-widest px-4 py-1`}>
                        {getPetRequest(pet.id)?.status === "Approved" ? "Approved ✅" : "Pending Approval ⏳"}
                      </Badge>
                    </div>
                  )}
                </div>

                <Button 
                  onClick={() => handleRequest(pet)}
                  disabled={!!getPetRequest(pet.id)}
                  className={`w-full mt-auto font-bold text-[11px] uppercase tracking-[0.3em] rounded-full py-8 h-auto transition-all duration-700 border-none shadow-premium bg-slate-950 text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  REQUEST CONNECTION
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {selectedPet && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPet(null)}
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
                  <PawPrint size={32} />
                </div>
                <button 
                  onClick={() => setSelectedPet(null)}
                  className="p-4 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-950 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <h3 className="text-4xl font-black text-slate-950 tracking-tighter mb-4">Request a Connection?</h3>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed italic">You are requesting to meet <span className="text-slate-950 font-bold">{selectedPet.name}</span>. This will notify the shelter to review your profile.</p>
              
              <div className="space-y-6 mb-12">
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2 italic">Pet Name</p>
                    <p className="text-lg font-bold text-slate-950 leading-none">{selectedPet.name}</p>
                  </div>
                </div>
                
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-500">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2 italic">Shelter Location</p>
                    <p className="text-lg font-bold text-slate-950 leading-none">{selectedPet.location}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => setSelectedPet(null)}
                  variant="outline" 
                  className="rounded-3xl py-8 h-auto font-black text-[10px] uppercase tracking-[0.3em] border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-950 transition-all"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleConfirmRequest}
                  className="bg-slate-950 hover:bg-emerald-500 text-white font-black rounded-3xl py-8 h-auto transition-all duration-700 btn-premium border-none uppercase tracking-[0.3em] text-[10px] shadow-xl"
                >
                  Send Request
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactPet && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setContactPet(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl glass rounded-[48px] p-12 shadow-deep border-white overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
              
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 rounded-[24px] bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                  <ShieldCheck size={32} />
                </div>
                <button 
                  onClick={() => setContactPet(null)}
                  className="p-4 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-950 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <h3 className="text-4xl font-black text-slate-950 tracking-tighter mb-4">Contact Shelter</h3>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed italic">Your connection with <span className="text-slate-950 font-bold">{contactPet.name}</span> has been approved! Choose how you'd like to get in touch with the shelter.</p>
              
              <div className="space-y-4 mb-10">
                <button 
                  onClick={() => toast.info("Dialing shelter support...")}
                  className="w-full p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-6 hover:bg-white hover:shadow-lg hover:border-emerald-500/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                    <Phone size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2 italic italic">Voice Protocol</p>
                    <p className="text-lg font-bold text-slate-950 leading-none">Call Shelter</p>
                  </div>
                </button>
                
                <button 
                  onClick={() => toast.info("Opening secure messenger...")}
                  className="w-full p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-6 hover:bg-white hover:shadow-lg hover:border-indigo-500/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <MessageSquare size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2 italic">Direct Outreach</p>
                    <p className="text-lg font-bold text-slate-950 leading-none">Send Message</p>
                  </div>
                </button>

                <button 
                  onClick={() => toast.info("Navigating to facility...")}
                  className="w-full p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center gap-6 hover:bg-white hover:shadow-lg hover:border-orange-500/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <Navigation size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-2 italic">Spatial Intel</p>
                    <p className="text-lg font-bold text-slate-950 leading-none">View Shelter Location</p>
                  </div>
                </button>
              </div>

              <Button 
                onClick={() => setContactPet(null)}
                className="w-full bg-slate-950 hover:bg-slate-800 text-white font-black rounded-3xl py-8 h-auto transition-all duration-700 uppercase tracking-[0.3em] text-[10px]"
              >
                Close
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mt-32 glass p-20 md:p-28 rounded-[72px] border border-slate-100 shadow-deep relative overflow-hidden flex flex-col lg:grid lg:grid-cols-[1.4fr_1.1fr] items-center justify-between gap-20 z-10">
        <div className="relative z-10">
           <div className="badge-premium bg-emerald-50 text-emerald-600 border-emerald-100 mb-10 !py-2 !px-8 backdrop-blur-md">Join Us</div>
           <h3 className="text-5xl md:text-7xl font-black text-slate-950 tracking-[-0.07em] mb-8 leading-[0.85]">Join our foster<br/>community.</h3>
           <p className="text-lg md:text-xl text-slate-500 font-medium mb-16 max-w-xl leading-relaxed tracking-tight">
             Not ready for a forever home? Foster a pet in need until they find their perfect match.
           </p>
           <Button className="rounded-[28px] px-16 py-8 bg-slate-950 text-white font-black hover:bg-emerald-600 transition-all duration-700 shadow-deep btn-premium border-none uppercase tracking-[0.3em] text-[11px] h-auto">
              Sign Up to Foster
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
