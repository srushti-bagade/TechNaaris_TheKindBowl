import { motion } from "motion/react";
import { 
  Utensils, 
  PawPrint, 
  ShoppingBag, 
  Upload, 
  MapPin, 
  Calendar,
  AlertCircle,
  Plus,
  ShieldCheck,
  Clock,
  Fingerprint,
  HeartHandshake,
  Home
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

export const PostForm = () => {
  const [quantity, setQuantity] = useState([5]);

  return (
    <div className="pt-24 pb-20 container mx-auto px-4 md:px-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">Post a Donation</h2>
        <p className="text-base text-slate-500 font-medium max-w-lg mx-auto">
          Share your surplus food or help a pet find a home. Every small step creates a massive impact.
        </p>
      </motion.div>

      <Card className="border-none shadow-2xl glass overflow-hidden rounded-[32px]">
        <Tabs defaultValue="human-food" className="w-full">
          <TabsList className="w-full grid grid-cols-3 h-14 bg-slate-100/50 p-1.5 rounded-none border-b border-slate-100">
            <TabsTrigger value="human-food" className="rounded-xl flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-slate-600 data-[state=active]:text-primary transition-all text-[10px] md:text-xs">
              <Utensils size={14} /> <span className="hidden sm:inline">Human Food</span>
            </TabsTrigger>
            <TabsTrigger value="pet-food" className="rounded-xl flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-slate-600 data-[state=active]:text-orange-500 transition-all text-[10px] md:text-xs">
              <ShoppingBag size={14} /> <span className="hidden sm:inline">Pet Food</span>
            </TabsTrigger>
            <TabsTrigger value="pet-adoption" className="rounded-xl flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md font-bold text-slate-600 data-[state=active]:text-blue-500 transition-all text-[10px] md:text-xs">
              <PawPrint size={14} /> <span className="hidden sm:inline">Pet Adoption</span>
            </TabsTrigger>
          </TabsList>

          <CardContent className="p-6 md:p-10">
            <TabsContent value="human-food" className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  {/* Image Upload Zone */}
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Food Image</Label>
                    <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-primary/40 transition-all group cursor-pointer">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <Upload className="text-primary" />
                      </div>
                      <p className="text-sm font-bold text-slate-600">Drag & drop or <span className="text-primary">browse</span></p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">PNG, JPG, up to 10MB</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                       Food Safety <ShieldCheck size={14} className="text-emerald-500" />
                    </Label>
                    <div className="space-y-3 p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                      {[
                        "Stored at required temperature",
                        "Original packaging intact or airtight container",
                        "No signs of spoilage or odor",
                        "Not prepared using recalled ingredients"
                      ].map((check, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <input type="checkbox" id={`safety-${i}`} className="mt-1 w-4 h-4 rounded accent-emerald-500 border-slate-300" />
                          <label htmlFor={`safety-${i}`} className="text-xs font-medium text-slate-600 cursor-pointer leading-tight">
                            {check}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">How much (in kg)</Label>
                      <Badge variant="outline" className="bg-slate-900 text-white border-none text-sm font-black px-3 py-1">{quantity}kg</Badge>
                    </div>
                    <Slider 
                      defaultValue={quantity} 
                      max={50} 
                      step={1} 
                      onValueChange={setQuantity}
                      className="py-4"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Best before</Label>
                      <div className="relative">
                         <Input type="datetime-local" className="rounded-2xl border-slate-200 py-6 font-medium focus:ring-emerald-500 h-14 pl-10 text-xs" />
                         <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Location</Label>
                      <div className="relative">
                         <Input placeholder="Search location..." className="rounded-2xl border-slate-200 py-6 font-medium focus:ring-emerald-500 h-14 pl-10" />
                         <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Pickup details</Label>
                    <div className="grid grid-cols-2 gap-3">
                       <button className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 text-left transition-all group">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 text-emerald-600">
                             <Clock size={16} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-wider">Availability</p>
                            <p className="text-[9px] text-slate-500 font-bold">Set pickup window</p>
                          </div>
                       </button>
                       <button className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 text-left transition-all group">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 text-emerald-600">
                             <Fingerprint size={16} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-wider">Handoff Mode</p>
                            <p className="text-[9px] text-slate-500 font-bold">Contactless/Direct</p>
                          </div>
                       </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Food Details</Label>
                    <div className="flex flex-wrap gap-2">
                      {["Dairy", "Gluten-free", "Nut-free", "Vegan", "Halal"].map(tag => (
                        <Badge key={tag} variant="outline" className="rounded-xl px-4 py-2 hover:bg-primary hover:text-white cursor-pointer transition-colors border-slate-200 font-bold">
                          {tag}
                        </Badge>
                      ))}
                      <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0 border border-dashed border-slate-300">
                        <Plus size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <Button className="w-full bg-primary hover:bg-emerald-600 text-white font-black text-xl rounded-3xl py-10 shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                   Submit Food Donation
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="pet-adoption" className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="flex items-center space-x-4 bg-blue-50 p-6 rounded-3xl border border-blue-100">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <AlertCircle className="text-blue-500" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-black text-blue-900 tracking-tight">Help a furry friend 🐾</h4>
                  <p className="text-sm font-medium text-blue-700">Detailed profiling helps reach more potential adopters quickly.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Pet's Best Photo</Label>
                    <div className="aspect-square border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-400/40 transition-all group cursor-pointer relative overflow-hidden">
                       <div className="z-10 flex flex-col items-center">
                          <Plus size={32} className="text-blue-400 mb-2 group-hover:rotate-90 transition-transform duration-500" />
                          <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">Add Photo</p>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Pet's Name</Label>
                      <Input placeholder="name" className="rounded-2xl h-14 bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Age (Years)</Label>
                      <Input placeholder="age" type="number" className="rounded-2xl h-14 bg-white" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Breed or Species</Label>
                    <Input placeholder="e.g. Golden Retriever" className="rounded-2xl h-14 bg-white" />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                       Vetting Questionnaire <HeartHandshake size={14} className="text-blue-500" />
                    </Label>
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Required Adopter Traits</p>
                          <Input placeholder="e.g. Experience with active breeds..." className="rounded-2xl bg-white border-slate-200" />
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Ideal Environment</p>
                          <div className="grid grid-cols-2 gap-2">
                             {['Large Yard', 'Apartment OK', 'Child Friendly', 'Other Pets OK'].map(env => (
                               <Badge key={env} variant="outline" className="justify-center py-2 text-[9px] font-black uppercase tracking-wider cursor-pointer hover:bg-blue-50 border-slate-100">
                                  {env}
                               </Badge>
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

               <div className="pt-6 border-t border-slate-100">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black text-xl rounded-3xl py-10 shadow-2xl shadow-blue-500/20 hover:scale-[1.02] transition-all">
                   Post Adoption Listing
                </Button>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};
