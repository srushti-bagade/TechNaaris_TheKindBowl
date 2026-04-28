import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Users, 
  Leaf, 
  Heart, 
  Globe, 
  TrendingUp,
  Zap,
  Droplets
} from "lucide-react";
import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const data = [
  { name: 'Mon', savings: 400 },
  { name: 'Tue', savings: 700 },
  { name: 'Wed', savings: 500 },
  { name: 'Thu', savings: 900 },
  { name: 'Fri', savings: 600 },
  { name: 'Sat', savings: 1200 },
  { name: 'Sun', savings: 1500 },
];

const pieData = [
  { name: 'NGO Pickups', value: 45 },
  { name: 'Individual Help', value: 25 },
  { name: 'Animal Shelters', value: 20 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'];

export const Impact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const moveX = useTransform(springX, [0, 1500], [-40, 40]);
  const moveY = useTransform(springY, [0, 1000], [-40, 40]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-[#fcfcfd] pt-64 pb-32 text-slate-950 min-h-screen overflow-hidden relative"
    >
      {/* Background decoration with Parallax */}
      <motion.div 
        style={{ x: useTransform(springX, [0, 1500], [50, -50]), y: useTransform(springY, [0, 1000], [50, -50]) }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] -z-10" 
      />
      <motion.div 
        style={{ x: useTransform(springX, [0, 1500], [-30, 30]), y: useTransform(springY, [0, 1000], [-30, 30]) }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] -z-10" 
      />

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 mb-6 px-4 py-2 font-bold text-[9px] tracking-widest backdrop-blur-md">
               LIVE METRICS • UPDATED 2M AGO
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-none">Our Community <span className="text-emerald-500">Impact</span></h2>
            <p className="text-slate-500 text-lg font-medium mt-6 max-w-lg leading-relaxed">
              Visualizing the collective power of people coming together to solve waste and hunger.
            </p>
          </motion.div>
          
          <div className="flex items-center space-x-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="cursor-default"
            >
               <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-2">Global Reach</p>
               <h4 className="text-3xl font-black flex items-center gap-2 text-slate-950">
                 127 <span className="text-emerald-600 text-xs tracking-tight">Countries</span>
               </h4>
            </motion.div>
            <div className="h-12 w-[1px] bg-slate-200" />
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="cursor-default"
            >
               <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-2">Total Savings</p>
               <h4 className="text-3xl font-black flex items-center gap-2 text-slate-950">
                 $1.4M <TrendingUp size={20} className="text-emerald-500" />
               </h4>
            </motion.div>
          </div>
        </div>

        {/* Big Counter Cards with Physics-like Float */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Meal Equivalents", val: "12,540", icon: <Users className="text-blue-500" />, sub: "Daily nutrition target" },
            { label: "CO2 Sequestration", val: "4.2 Tons", icon: <Leaf className="text-emerald-500" />, sub: "12% more than last cycle" },
            { label: "Water Conserved", val: "12,000L", icon: <Droplets className="text-blue-400" />, sub: "Manufacturing offset" },
            { label: "Community Growth", val: "2,300", icon: <Globe className="text-orange-500" />, sub: "Across 42 active locations" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              style={{
                x: useTransform(springX, [0, 1500], [(i - 1.5) * 10, -(i - 1.5) * 10]),
                y: useTransform(springY, [0, 1000], [(i - 1.5) * 5, -(i - 1.5) * 5])
              }}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-[2rem] border border-slate-100 shadow-premium relative group overflow-hidden cursor-grab active:cursor-grabbing"
            >
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-white transition-colors border border-slate-100">
                  {item.icon}
                </div>
                <Zap size={14} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
              </div>
              <h3 className="text-3xl font-black mb-1 relative z-10 text-slate-950">{item.val}</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1 relative z-10">{item.label}</p>
              <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.2em] relative z-10">{item.sub}</p>
              
              {/* Internal Glow on Hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10 items-stretch">
          <Card className="lg:col-span-2 glass border-slate-100 rounded-[2.5rem] overflow-hidden flex flex-col shadow-deep">
            <CardHeader className="p-10 pb-0">
               <div className="flex items-center justify-between">
                 <CardTitle className="text-2xl font-black text-slate-950">Savings Velocity</CardTitle>
                 <div className="flex space-x-2">
                   {['Week', 'Month', 'Year'].map(t => (
                     <Badge key={t} variant={t === 'Month' ? 'default' : 'outline'} className={`px-4 py-1.5 rounded-full cursor-pointer font-bold ${t === 'Month' ? 'bg-slate-950 text-white' : 'bg-transparent text-slate-400 border-slate-200'}`}>
                        {t}
                     </Badge>
                   ))}
                 </div>
               </div>
            </CardHeader>
            <CardContent className="p-10 pt-10 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    fontWeight="bold" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ dy: 10 }}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    fontWeight="bold" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ dx: -10 }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '16px', fontWeight: 'bold', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#22c55e' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="#22c55e" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorSavings)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass border-slate-100 rounded-[2.5rem] overflow-hidden flex flex-col shadow-deep">
            <CardHeader className="p-10 pb-0">
              <CardTitle className="text-2xl font-black text-slate-950">Donation Mix</CardTitle>
            </CardHeader>
            <CardContent className="p-10 flex-1 flex flex-col items-center justify-center">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', border: 'none', borderRadius: '16px', fontWeight: 'bold', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8 w-full">
                 {pieData.map((item, i) => (
                   <div key={i} className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.name}</span>
                   </div>
                 ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
