import { motion, AnimatePresence } from "motion/react";
import { 
  Utensils, 
  Package, 
  PawPrint, 
  Timer, 
  ArrowUpRight, 
  ShieldCheck,
  TrendingUp,
  MapPin,
  Heart,
  Leaf,
  Users,
  Droplets,
  AlertCircle,
  Navigation,
  CheckCircle2,
  Clock,
  Bell
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [activeDonations, setActiveDonations] = useState<any[]>([]);
  const [completedDonations, setCompletedDonations] = useState<any[]>([]);
  const [connectionRequests, setConnectionRequests] = useState<any[]>([]);

  const notifications = [
    {
      id: 1,
      title: "Pickup Scheduled",
      message: "Food pickup at Indiranagar",
      time: "5:00 PM",
      status: "New",
      icon: <Package size={16} className="text-blue-500" />,
      dot: "bg-emerald-400"
    },
    {
      id: 2,
      title: "Request Accepted",
      message: "Pet adoption request approved",
      location: "Whitefield",
      status: "New",
      icon: <PawPrint size={16} className="text-emerald-500" />,
      dot: "bg-emerald-400"
    },
    {
      id: 3,
      title: "New Claim Received",
      message: "Someone requested your donation",
      location: "HSR Layout",
      status: "Pending",
      icon: <Utensils size={16} className="text-orange-500" />,
      dot: "bg-orange-500"
    },
    {
      id: 4,
      title: "Delivery Completed",
      message: "Food delivered successfully",
      time: "10:30 AM",
      status: "Completed",
      icon: <CheckCircle2 size={16} className="text-slate-400" />,
      dot: "bg-slate-400"
    }
  ];

  useEffect(() => {
    const active = JSON.parse(localStorage.getItem("activeDonations") || "[]");
    const completed = JSON.parse(localStorage.getItem("completedDonations") || "[]");
    const connections = JSON.parse(localStorage.getItem("connectionRequests") || "[]");
    setActiveDonations(active);
    setCompletedDonations(completed);
    setConnectionRequests(connections);

    // Periodic check for status updates (e.g. from Pending to Approved)
    const interval = setInterval(() => {
      const latestConnections = JSON.parse(localStorage.getItem("connectionRequests") || "[]");
      setConnectionRequests(latestConnections);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const updateStatus = (id: string, newStatus: string) => {
    const updatedActive = activeDonations.map(d => 
      d.id === id ? { ...d, status: newStatus } : d
    );
    setActiveDonations(updatedActive);
    localStorage.setItem("activeDonations", JSON.stringify(updatedActive));
    toast.success(`Task status: ${newStatus}`);
  };

  const handleDelivered = (id: string) => {
    const donation = activeDonations.find(d => d.id === id);
    if (!donation) return;

    const updatedActive = activeDonations.filter(d => d.id !== id);
    const updatedCompleted = [{ ...donation, status: "Completed", completedAt: new Date().toISOString() }, ...completedDonations];
    
    setActiveDonations(updatedActive);
    setCompletedDonations(updatedCompleted);
    
    localStorage.setItem("activeDonations", JSON.stringify(updatedActive));
    localStorage.setItem("completedDonations", JSON.stringify(updatedCompleted));
    
    toast.success("Donation delivered successfully! ✅");
  };

  const stats = [
    { label: "Food Items", val: "42", increase: "+12%", icon: <Utensils className="w-5 h-5" />, color: "bg-emerald-500" },
    { label: "Community Hubs", val: "18", increase: "+5%", icon: <Package className="w-5 h-5" />, color: "bg-indigo-500" },
    { label: "Active Tasks", val: activeDonations.length.toString().padStart(2, '0'), increase: activeDonations.length > 0 ? "+1" : "0", icon: <Timer className="w-5 h-5" />, color: "bg-orange-500" },
    { label: "Deliveries", val: completedDonations.length.toString().padStart(2, '0'), increase: completedDonations.length > 0 ? `+${completedDonations.length}` : "0", icon: <ShieldCheck className="w-5 h-5" />, color: "bg-rose-500" },
  ];

  return (
    <div className="pt-40 pb-32 container mx-auto px-6 md:px-12 lg:px-24 bg-[#fcfcfd] min-h-screen">
      {/* Cinematic Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 glass rounded-[40px] p-10 md:p-16 border-white shadow-deep relative overflow-hidden"
      >
        <div className="relative z-10 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <div className="flex items-center gap-4 mb-10">
               <span className="badge-premium bg-slate-950 text-white !py-1.5 !px-5">Trusted Network Member</span>
               <div className="h-4 w-px bg-slate-200"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-[-0.05em] mb-8 text-slate-950 leading-[0.9]">
               Compassion Delivered Daily
            </h2>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigate('/post')} className="bg-slate-950 hover:bg-emerald-500 text-white font-black px-10 py-7 rounded-[22px] shadow-deep transition-all duration-700 btn-premium border-none uppercase tracking-[0.2em] text-[10px] h-auto">
                Donate Food
              </Button>
              <Button onClick={() => navigate('/explore')} variant="outline" className="bg-white border-slate-200 text-slate-950 font-black px-10 py-7 rounded-[22px] hover:bg-slate-50 transition-all duration-700 shadow-premium uppercase tracking-[0.2em] text-[10px] h-auto">
                Explore Needs
              </Button>
            </div>
          </div>
          
          <div className="bg-slate-950 p-10 rounded-[48px] text-white shadow-deep relative overflow-hidden flex flex-col justify-between min-h-[400px] group transition-all">
             <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                   <div>
                      <p className="text-[9px] uppercase tracking-[0.35em] font-black text-slate-500 mb-2 italic">Most requested items today</p>
                      <h3 className="text-3xl font-black tracking-tighter flex items-center gap-2">
                        📊 Food Demand Insight
                      </h3>
                   </div>
                   <div className="w-12 h-12 bg-white/10 rounded-[18px] flex items-center justify-center border border-white/10">
                      <TrendingUp size={20} className="text-emerald-400" />
                   </div>
                </div>
                
                <div className="flex-grow overflow-y-auto pr-2 space-y-4 max-h-[220px] scrollbar-thin scrollbar-thumb-white/10">
                   {[
                      { name: "Rice Meals", level: "High", color: "text-rose-400 bg-rose-400/10 border-rose-400/20", icon: <Utensils size={14} /> },
                      { name: "Dog Food", level: "High", color: "text-rose-400 bg-rose-400/10 border-rose-400/20", icon: <PawPrint size={14} /> },
                      { name: "Baby Food", level: "Medium", color: "text-orange-400 bg-orange-400/10 border-orange-400/20", icon: <Droplets size={14} /> },
                      { name: "Cooked Meals", level: "Medium", color: "text-orange-400 bg-orange-400/10 border-orange-400/20", icon: <Utensils size={14} /> },
                      { name: "Cat Food", level: "Low", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20", icon: <PawPrint size={14} /> },
                   ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 group/item hover:bg-white/10 transition-all">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover/item:text-white transition-colors">
                               {item.icon}
                            </div>
                            <span className="text-sm font-bold text-white tracking-tight">{item.name}</span>
                         </div>
                         <div className={`px-3 py-1 rounded-full ${item.color} text-[8px] font-black uppercase tracking-widest border`}>
                            {item.level}
                         </div>
                      </div>
                   ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                   <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest italic">Based on community requests</p>
                   <div className="flex -space-x-2">
                       <div className="w-5 h-5 rounded-full border-2 border-slate-950 bg-rose-500" />
                       <div className="w-5 h-5 rounded-full border-2 border-slate-950 bg-amber-500" />
                       <div className="w-5 h-5 rounded-full border-2 border-slate-950 bg-emerald-500" />
                   </div>
                </div>
             </div>
             {/* Dynamic background element */}
             <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-[2s]" />
          </div>
        </div>
      </motion.div>


      {/* High-Precision Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
            dragElastic={0.05}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
            viewport={{ once: true }}
            transition={{ 
              delay: i * 0.1, 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="perspective-2000"
          >
            <Card className="card-startup p-8 group cursor-grab active:cursor-grabbing relative overflow-hidden border-none rounded-[32px] preserve-3d">
                <div className="flex items-center justify-between mb-8">
                  <div className={`p-3.5 ${stat.color} rounded-[18px] text-white shadow-xl group-hover:scale-110 transition-transform duration-500 flex items-center justify-center`}>
                    {stat.icon}
                  </div>
                  <div className="badge-premium bg-emerald-50 text-emerald-600 font-black px-3 py-1.5 text-[9px] !tracking-[0.2em]">
                    {stat.increase}
                  </div>
                </div>
                <h3 className="text-4xl font-black text-slate-950 mb-2 tracking-tighter leading-none">{stat.val}</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">{stat.label}</p>
                <div className={`absolute bottom-0 left-0 w-full h-1 ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Detailed Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-3xl font-black text-slate-950 tracking-tighter">Active Donations</h3>
                <p className="text-slate-500 font-medium text-base mt-2 tracking-tight">Real-time task synchronization</p>
              </div>
              <Button variant="ghost" onClick={() => navigate('/explore')} className="text-emerald-600 font-black uppercase text-[9px] tracking-[0.25em] hover:bg-emerald-50 px-6 py-4 rounded-xl">
                Explore More <ArrowUpRight size={16} className="ml-2" />
              </Button>
            </div>
            
            <div className="grid gap-6">
              <AnimatePresence mode="popLayout">
                {activeDonations.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-16 glass rounded-[40px] text-center border-dashed border-2 border-slate-200"
                  >
                    <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-xs italic">No Active Tasks</p>
                  </motion.div>
                ) : (
                  activeDonations.map((item, i) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Card className="group overflow-hidden border-none shadow-deep hover:shadow-xl transition-all duration-700 p-0 rounded-[32px]">
                        <div className="flex flex-col md:flex-row h-full">
                          <div className="w-full md:w-56 h-56 md:h-auto overflow-hidden relative">
                            <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
                          </div>
                          <div className="flex-1 p-8 md:p-10">
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <Badge className="bg-emerald-50 text-emerald-600 border-none mb-4 font-black uppercase text-[8px] tracking-[0.2em] py-1.5 px-3 shadow-sm">{item.type}</Badge>
                                <h4 className="text-2xl font-black text-slate-950 leading-none tracking-tighter mb-4">{item.title}</h4>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <MapPin size={12} className="text-emerald-500" />
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pickup: <span className="text-slate-950">{item.pickup}</span></p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Navigation size={12} className="text-indigo-500" />
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Delivery: <span className="text-slate-950">{item.delivery}</span></p>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">Time Slot</p>
                                <p className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 shadow-sm">{item.time}</p>
                                <div className="mt-4 flex items-center justify-end gap-2">
                                  <div className={`w-2 h-2 rounded-full ${item.status === 'Assigned' ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}`} />
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{item.status}</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-end gap-4 pt-8 border-t border-slate-50 mt-4">
                              {item.status === 'Assigned' ? (
                                <Button 
                                  onClick={() => updateStatus(item.id, 'Picked Up')}
                                  className="bg-slate-950 hover:bg-emerald-500 text-white font-black rounded-[20px] px-8 py-5 h-auto transition-all duration-700 btn-premium border-none uppercase tracking-[0.2em] text-[10px]"
                                >
                                  Picked Up Food ✅
                                </Button>
                              ) : (
                                <Button 
                                  onClick={() => handleDelivered(item.id)}
                                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-[20px] px-8 py-5 h-auto transition-all duration-700 btn-premium border-none uppercase tracking-[0.2em] text-[10px]"
                                >
                                  Delivered Food ✅
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-3xl font-black text-slate-950 tracking-tighter">Completed Donations</h3>
                <p className="text-slate-500 font-medium text-base mt-2 tracking-tight">Success archive and log</p>
              </div>
            </div>

            <div className="grid gap-6">
              <AnimatePresence mode="popLayout">
                {completedDonations.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-10 bg-slate-50 rounded-[32px] text-center border-dashed border border-slate-200"
                  >
                    <p className="text-slate-300 font-black uppercase tracking-[0.3em] text-[9px]">No Completed Logs</p>
                  </motion.div>
                ) : (
                  completedDonations.map((item, i) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass rounded-[32px] p-8 border-white flex items-center justify-between opacity-80"
                    >
                      <div className="flex items-center gap-8">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden grayscale">
                          <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-slate-950 tracking-tighter">{item.title}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                             <MapPin size={10} /> Delivered to {item.delivery}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-6 py-2 rounded-full font-black text-[9px] uppercase tracking-widest">
                        Completed ✅
                      </Badge>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-3xl font-black text-slate-950 tracking-tighter">Connection Requests</h3>
                <p className="text-slate-500 font-medium text-base mt-2 tracking-tight">Active pet adoption interest</p>
              </div>
            </div>

            <div className="grid gap-6">
              <AnimatePresence mode="popLayout">
                {connectionRequests.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-10 bg-slate-50 rounded-[32px] text-center border-dashed border border-slate-200"
                  >
                    <p className="text-slate-300 font-black uppercase tracking-[0.3em] text-[9px]">No Active Requests</p>
                  </motion.div>
                ) : (
                  connectionRequests.map((item, i) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass rounded-[32px] p-8 border-white flex items-center justify-between"
                    >
                      <div className="flex items-center gap-8">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                          <PawPrint size={32} />
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-slate-950 tracking-tighter">{item.name}</h4>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                             <MapPin size={10} /> {item.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">{new Date(item.timestamp).toLocaleDateString()}</span>
                        <Badge className={`${
                          item.status === "Approved" 
                            ? "bg-emerald-100 text-emerald-700" 
                            : "bg-orange-100 text-orange-700"
                        } hover:bg-opacity-80 border-none px-6 py-2 rounded-full font-black text-[9px] uppercase tracking-widest transition-all`}>
                          {item.status === "Approved" ? "Approved ✅" : "Pending Approval ⏳"}
                        </Badge>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </section>
        </div>

        <div className="space-y-12">
          <section>
             <h3 className="text-2xl font-black text-slate-950 tracking-tighter mb-10 flex items-center gap-3">
               <Bell size={24} className="text-slate-950" /> Notifications
             </h3>
             <Card className="border-none shadow-deep glass overflow-hidden rounded-[40px] min-h-[450px] flex flex-col">
               <CardHeader className="p-10 pb-4">
                  <div className="flex items-center justify-between mb-2">
                     <CardTitle className="text-xl font-black tracking-tight text-slate-950">Real-time alerts</CardTitle>
                     <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                        <TrendingUp className="text-emerald-600" size={20} />
                     </div>
                  </div>
                  <p className="text-slate-500 font-medium text-base tracking-tight leading-relaxed">Stay updated with your impact.</p>
               </CardHeader>
               <CardContent className="p-10 pt-0 flex-grow">
                  <div className="space-y-6">
                    {notifications.map((notif, i) => (
                      <motion.div 
                        key={notif.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i, duration: 0.8 }}
                        className={`flex items-start gap-4 pb-6 ${i !== notifications.length - 1 ? 'border-b border-slate-50' : ''}`}
                      >
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100/50">
                            {notif.icon}
                          </div>
                          {notif.status === "New" && (
                            <motion.div 
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white shadow-sm"
                            />
                          )}
                          {(notif.status === "Pending" || notif.status === "Completed") && (
                            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${notif.dot} border-2 border-white shadow-sm`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-[11px] font-black text-slate-950 uppercase tracking-wider">{notif.title}</h4>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{notif.time || notif.location}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed truncate">{notif.message}</p>
                          <div className="mt-2">
                             <span className={`text-[8px] font-black uppercase tracking-[0.2em] italic ${
                               notif.status === 'New' ? 'text-emerald-500' : 
                               notif.status === 'Pending' ? 'text-orange-500' : 'text-slate-400'
                             }`}>
                               {notif.status}
                             </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <Button variant="ghost" className="w-full rounded-[20px] py-7 text-slate-500 font-black uppercase text-[9px] tracking-[0.3em] border border-slate-100 hover:bg-slate-50 hover:text-slate-950 transition-all mt-4 h-auto">
                      View All Notifications
                    </Button>
                  </div>
               </CardContent>
             </Card>
          </section>


        </div>
      </div>
    </div>
  );
};
