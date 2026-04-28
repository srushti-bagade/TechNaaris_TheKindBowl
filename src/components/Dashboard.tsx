import { motion } from "motion/react";
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
  AlertCircle
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

export const Dashboard = () => {
  const navigate = useNavigate();
  const stats = [
    { label: "Food Items", val: "42", increase: "+12%", icon: <Utensils className="w-5 h-5" />, color: "bg-emerald-500" },
    { label: "Community Hubs", val: "18", increase: "+5%", icon: <Package className="w-5 h-5" />, color: "bg-indigo-500" },
    { label: "Pets Helped", val: "03", increase: "0%", icon: <PawPrint className="w-5 h-5" />, color: "bg-orange-500" },
    { label: "Requests", val: "07", increase: "-2", icon: <Timer className="w-5 h-5" />, color: "bg-rose-500" },
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
            <h2 className="text-5xl md:text-6xl font-black tracking-[-0.05em] mb-10 text-slate-950 leading-[0.9]">
               Food Distribution,<br /> 
              <span className="gradient-text">Ankita.</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 font-medium mb-10 max-w-lg leading-relaxed tracking-tight transition-all">
               The app is running smoothly. You have <span className="text-orange-500 font-black">2 food pickups</span> underway and <span className="text-rose-500 font-black">1 urgent need</span> that needs your help.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigate('/post')} className="bg-slate-950 hover:bg-emerald-500 text-white font-black px-10 py-7 rounded-[22px] shadow-deep transition-all duration-700 btn-premium border-none uppercase tracking-[0.2em] text-[10px] h-auto">
                Donate Food
              </Button>
              <Button variant="outline" className="bg-white border-slate-200 text-slate-950 font-black px-10 py-7 rounded-[22px] hover:bg-slate-50 transition-all duration-700 shadow-premium uppercase tracking-[0.2em] text-[10px] h-auto">
                Plan Routes
              </Button>
            </div>
          </div>
          
          <div className="bg-slate-950 p-10 rounded-[48px] text-white shadow-deep relative overflow-hidden flex flex-col justify-between min-h-[400px] group transition-all">
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                   <div>
                      <p className="text-[9px] uppercase tracking-[0.35em] font-black text-slate-500 mb-2 italic">Carbon Sequestration Index</p>
                      <h3 className="text-5xl font-black tracking-tighter">1.25<span className="text-emerald-400 text-2xl">t CO2</span></h3>
                   </div>
                   <div className="w-14 h-14 bg-emerald-500 rounded-[18px] shadow-xl shadow-emerald-500/20 flex items-center justify-center">
                      <Leaf size={24} className="text-white" />
                   </div>
                </div>
                
                <div className="space-y-6 pt-8 border-t border-white/5">
                   <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                         <Users size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase text-white">Meal Equivalence</p>
                         <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">4,200 Meals Provided</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                         <Droplets size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] font-black uppercase text-white">Water Savings</p>
                         <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">12,000 Liters Conserved</p>
                      </div>
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
                <h3 className="text-3xl font-black text-slate-950 tracking-tighter">Your Recent Activity</h3>
                <p className="text-slate-500 font-medium text-base mt-2 tracking-tight">Real-time local food pickups</p>
              </div>
              <Button variant="ghost" className="text-emerald-600 font-black uppercase text-[9px] tracking-[0.25em] hover:bg-emerald-50 px-6 py-4 rounded-xl">
                Global Stream <ArrowUpRight size={16} className="ml-2" />
              </Button>
            </div>
            
            <div className="grid gap-6">
              {[
                { title: "Artisan Surplus Load", donor: "Sunrise Bakery Unit", dist: "0.8km", time: "ETA 12m", status: "In Transit", type: "Prepared Nutrition", img: "https://images.unsplash.com/photo-1540333280207-e9a044754400?auto=format&fit=crop&q=80&w=400", alert: false },
                { title: "Organic Botanical Pack", donor: "Green Sphere Hub", dist: "1.2km", time: "Delayed", status: "Driver No-Show", type: "Raw Assets", img: "https://images.unsplash.com/photo-1610832958506-ee56338d7d9d?auto=format&fit=crop&q=80&w=400", alert: true },
              ].map((item, i) => (
                <Card key={i} className="group overflow-hidden border-none shadow-deep hover:shadow-xl transition-all duration-700 p-0 rounded-[32px]">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-56 h-56 md:h-auto overflow-hidden relative">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
                      {item.alert && (
                        <div className="absolute inset-0 bg-rose-500/20 backdrop-blur-sm flex items-center justify-center">
                           <AlertCircle className="text-white w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-8 md:p-10">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <Badge className="bg-emerald-50 text-emerald-600 border-none mb-4 font-black uppercase text-[8px] tracking-[0.2em] py-1.5 px-3 shadow-sm">{item.type}</Badge>
                          <h4 className="text-2xl font-black text-slate-950 leading-none tracking-tighter mb-4">{item.title}</h4>
                          <div className="flex items-center gap-3">
                             <div className={`w-2 h-2 rounded-full ${item.alert ? "bg-rose-500 animate-pulse" : "bg-emerald-500"}`} />
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">{item.status}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">Timing</p>
                          <p className={`text-[10px] font-black ${item.alert ? "text-rose-500 bg-rose-50" : "text-emerald-600 bg-emerald-50"} px-4 py-2 rounded-xl border ${item.alert ? "border-rose-100" : "border-emerald-100"} shadow-sm`}>{item.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-8 border-t border-slate-50 mt-4">
                        <Button variant="ghost" className="text-slate-400 hover:text-slate-950 font-black uppercase text-[9px] tracking-widest px-0">
                           {item.alert ? "Ask for Help" : "See Map"}
                        </Button>
                        <Button className="bg-slate-950 hover:bg-emerald-500 text-white font-black rounded-[20px] px-8 py-5 h-auto transition-all duration-700 btn-premium border-none uppercase tracking-[0.2em] text-[10px]">
                           Coordinate Pickup
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-12">
          <section>
             <h3 className="text-2xl font-black text-slate-950 tracking-tighter mb-10">Impact Summary</h3>
             <Card className="border-none shadow-deep glass overflow-hidden rounded-[40px] min-h-[450px]">
               <CardHeader className="p-10 pb-4">
                  <div className="flex items-center justify-between mb-2">
                     <CardTitle className="text-xl font-black tracking-tight text-slate-950">Effort Recap</CardTitle>
                     <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                        <TrendingUp className="text-emerald-600" size={20} />
                     </div>
                  </div>
               </CardHeader>
               <CardContent className="p-10 pt-0">
                  <p className="text-slate-500 font-medium mb-10 text-base tracking-tight leading-relaxed">See your impact in real-time.</p>
                  <div className="space-y-10">
                    {[
                      { label: "Food Saved", val: "84.2%", color: "bg-emerald-500" },
                      { label: "Meals Provided", val: "92.8%", color: "bg-indigo-500" },
                      { label: "Pets Helped", val: "68.4%", color: "bg-orange-500" },
                    ].map((log, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em]">
                          <span className="text-slate-950">{log.label}</span>
                          <span className="text-slate-400">{log.val}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: log.val }}
                            transition={{ delay: 0.5 + i * 0.2, duration: 1.5, ease: "easeOut" }}
                            className={`${log.color} h-full shadow-sm`}
                          />
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" className="w-full rounded-[20px] py-7 text-slate-500 font-black uppercase text-[9px] tracking-[0.3em] border border-slate-100 hover:bg-slate-50 hover:text-slate-950 transition-all mt-8 h-auto">
                      View All Activity
                    </Button>
                  </div>
               </CardContent>
             </Card>
          </section>

          <section>
            <h3 className="text-2xl font-black text-slate-950 tracking-tighter mb-10 flex items-center gap-3">
               <ShieldCheck className="text-emerald-500 w-6 h-6" /> Community Badges
            </h3>
            <div className="grid grid-cols-3 gap-6">
              {[
                { icon: "🏆", label: "Originator" },
                { icon: "🌱", label: "Eco-Hub" },
                { icon: "🤝", label: "Elite Giver" },
                { icon: "🐶", label: "Alpha Pack" },
                { icon: "⚡", label: "Quick Hero" },
                { icon: "🧩", label: "Community Member" },
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-6 rounded-[28px] bg-white border border-slate-50 shadow-premium hover:-translate-y-1 transition-all duration-500 group">
                  <span className="text-3xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">{badge.icon}</span>
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.25em] text-center italic">{badge.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
