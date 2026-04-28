import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";
import { 
  Users, 
  Heart, 
  TrendingUp,
  Utensils,
  PawPrint,
  Home,
  Trophy,
  Quote,
  MapPin
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Realistic dummy data for weekly contributions
const weeklyData = [
  { day: 'Mon', human: 42, pet: 18 },
  { day: 'Tue', human: 38, pet: 22 },
  { day: 'Wed', human: 55, pet: 15 },
  { day: 'Thu', human: 48, pet: 28 },
  { day: 'Fri', human: 72, pet: 35 },
  { day: 'Sat', human: 85, pet: 40 },
  { day: 'Sun', human: 60, pet: 25 },
];

const quotes = [
  "One meal can change someone’s day.",
  "Kindness grows when shared.",
  "Helping animals is helping humanity.",
  "A small act of kindness is a giant leap for a neighbor.",
  "TheKindBowl is built on your compassion."
];

// Count-up component for stats
const CountUp = ({ end, duration = 2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}</>;
};

export const Impact = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#fcfcfd] pt-32 pb-20 text-slate-950 min-h-screen">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        {/* 1. LOCAL IMPACT (Hero Section) */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 mb-6 px-4 py-2 font-bold text-[10px] tracking-widest uppercase">
               Local Momentum • Live
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              Small Acts, <span className="text-emerald-500">Big Change.</span>
            </h1>
            <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto mb-12">
              See the direct impact our community is making right now in your neighborhood.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Meals Shared Today", val: 128, icon: <Utensils className="text-emerald-500" />, delay: 0.2 },
              { label: "Active Donors Nearby", val: 23, icon: <Users className="text-indigo-500" />, delay: 0.4 },
              { label: "Nearby Shelters Supported", val: 8, icon: <Home className="text-yellow-500" />, delay: 0.6 },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: stat.delay, duration: 0.5 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-premium flex flex-col items-center group hover:shadow-deep transition-all"
              >
                <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white transition-all shadow-sm">
                  {stat.icon}
                </div>
                <h3 className="text-5xl font-black text-slate-950 mb-2">
                  <CountUp end={stat.val} />
                </h3>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          
          {/* 2. WEEKLY CONTRIBUTION CHART */}
          <Card className="bg-white border-slate-100 rounded-[2.5rem] shadow-premium overflow-hidden p-8">
            <CardHeader className="p-0 mb-8">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                  <TrendingUp className="text-emerald-500" />
                  Weekly Contributions
                </CardTitle>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Human</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pet Food</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontWeight: 700 }}
                  />
                  <Bar dataKey="human" fill="#10b981" radius={[6, 6, 0, 0]} barSize={24} />
                  <Bar dataKey="pet" fill="#facc15" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 3. PET IMPACT SECTION */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-2 px-2">
              <PawPrint className="text-yellow-500" />
              <h2 className="text-3xl font-black">Pet Impact</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Pets Listed", val: "142", desc: "Found new loving homes", color: "bg-blue-50 text-blue-600", icon: <Heart size={20} /> },
                { title: "Adoption Requests", val: "89", desc: "Families looking to add a member", color: "bg-purple-50 text-purple-600", icon: <Users size={20} /> },
                { title: "Pet Food Shared", val: "45kg", desc: "Nourishment for local animals", color: "bg-yellow-50 text-yellow-600", icon: <Utensils size={20} /> },
                { title: "Active Areas", val: "12", desc: "Neighborhoods with pet support", color: "bg-emerald-50 text-emerald-600", icon: <MapPin size={20} /> },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-premium transition-all flex flex-col gap-4"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.color} shadow-inner`}>
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-slate-950 mb-1">{card.val}</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{card.title}</p>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. TOP CONTRIBUTORS */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8 px-2">
            <Trophy className="text-yellow-500" />
            <h2 className="text-3xl font-black">Top Contributors</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { rank: "Top Donor", name: "Sarah J.", count: "48 Donations", color: "from-emerald-500 to-teal-400" },
              { rank: "Top Volunteer", name: "David K.", count: "32 Pickups", color: "from-blue-500 to-indigo-400" },
            ].map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                className="relative bg-white p-1 rounded-[3rem] shadow-premium overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${person.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className="bg-white p-8 rounded-[2.9rem] flex items-center justify-between relative z-10">
                   <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${person.color} flex items-center justify-center text-white text-2xl font-black shadow-lg`}>
                        {person.name[0]}
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-emerald-500 tracking-widest mb-1">{person.rank}</p>
                        <h4 className="text-2xl font-black text-slate-950">{person.name}</h4>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-2xl font-black text-slate-950">{person.count}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">This Month</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. QUOTES SECTION */}
        <div className="pt-20 border-t border-slate-100 text-center">
           <div className="max-w-3xl mx-auto">
              <Quote className="mx-auto text-emerald-500 mb-8 w-12 h-12 opacity-50" />
              <div className="h-24 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={quoteIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight italic"
                  >
                    "{quotes[quoteIndex]}"
                  </motion.p>
                </AnimatePresence>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
