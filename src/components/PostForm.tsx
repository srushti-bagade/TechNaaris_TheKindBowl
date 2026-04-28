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
  Info,
  Package,
  Tag,
  Bone,
  Check,
  Activity,
  MessageSquare
} from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const PostForm = () => {
  const [quantity, setQuantity] = useState([5]);
  const [petFoodQuantity, setPetFoodQuantity] = useState([2]);
  
  // Human Food State
  const [humanFoodData, setHumanFoodData] = useState({
    bestBefore: "",
    location: "",
    additionalNotes: "",
    allergens: [] as string[],
    pickupWindow: "",
    handoff: "contactless"
  });

  // Pet Food Form State
  const [petFoodData, setPetFoodData] = useState({
    type: "",
    category: "",
    brand: "",
    expiryDate: "",
    condition: "sealed",
    allergens: [] as string[],
    suitability: "adult",
    preference: "all",
    location: "",
    pickupWindow: "",
    handoff: "contactless",
    additionalDetails: ""
  });

  // Pet Adoption State
  const [petAdoptionData, setPetAdoptionData] = useState({
    name: "",
    ageValue: "",
    ageUnit: "years",
    breed: "",
    requiredTraits: "",
    idealEnvironment: [] as string[],
    additionalDetails: "",
    energyLevel: "medium"
  });
  
  const [petFoodImage, setPetFoodImage] = useState<string | null>(null);
  const [humanFoodImage, setHumanFoodImage] = useState<string | null>(null);
  const [petAdoptionImage, setPetAdoptionImage] = useState<string | null>(null);
  
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const humanFileInputRef = useRef<HTMLInputElement>(null);
  const adoptionFileInputRef = useRef<HTMLInputElement>(null);

  const handlePetFoodImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetFoodImage(reader.result as string);
        setIsUploading(false);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHumanImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setHumanFoodImage(reader.result as string);
        setIsUploading(false);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdoptionImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetAdoptionImage(reader.result as string);
        setIsUploading(false);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleAllergen = (tag: string) => {
    setPetFoodData(prev => ({
      ...prev,
      allergens: prev.allergens.includes(tag) 
        ? prev.allergens.filter(t => t !== tag)
        : [...prev.allergens, tag]
    }));
  };

  const getSafetyIndicator = (expiryDate: string) => {
    if (!expiryDate) return null;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return { label: "Expired", color: "text-red-500", bg: "bg-red-50" };
    if (diffDays <= 7) return { label: "Use Soon", color: "text-orange-500", bg: "bg-orange-50" };
    return { label: "Safe", color: "text-emerald-500", bg: "bg-emerald-50" };
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPetFoodData(prev => ({ ...prev, location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}` }));
        toast.success("Location updated!");
      }, () => {
        toast.error("Failed to fetch location.");
      });
    }
  };

  const handleSubmitPetFood = () => {
    if (!petFoodData.type || !petFoodData.category || !petFoodData.expiryDate || !petFoodData.location) {
      toast.error("Please fill in all required fields.");
      return;
    }
    
    // Simulate API call
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Posting donation...',
        success: 'Pet food donation posted successfully!',
        error: 'Error posting donation.',
      }
    );
  };

  const handleSubmitHumanFood = () => {
    // Simulate API call
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Posting donation...',
        success: 'Food donation posted successfully!',
        error: 'Error posting donation.',
      }
    );
  };

  const handleSubmitAdoption = () => {
    if (!petAdoptionData.name || !petAdoptionData.ageValue || !petAdoptionData.breed) {
      toast.error("Please fill in basic pet details.");
      return;
    }
    // Simulate API call
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Posting listing...',
        success: 'Adoption listing posted successfully!',
        error: 'Error posting listing.',
      }
    );
  };

  const toggleAdoptionEnv = (env: string) => {
    setPetAdoptionData(prev => ({
      ...prev,
      idealEnvironment: prev.idealEnvironment.includes(env)
        ? prev.idealEnvironment.filter(e => e !== env)
        : [...prev.idealEnvironment, env]
    }));
  };

  const toggleHumanAllergen = (tag: string) => {
    setHumanFoodData(prev => ({
      ...prev,
      allergens: prev.allergens.includes(tag) 
        ? prev.allergens.filter(t => t !== tag)
        : [...prev.allergens, tag]
    }));
  };

  const handleUseHumanLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setHumanFoodData(prev => ({ ...prev, location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}` }));
        toast.success("Location updated!");
      }, () => {
        toast.error("Failed to fetch location.");
      });
    }
  };

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
                    <div 
                      onClick={() => humanFileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-primary/40 transition-all group cursor-pointer relative overflow-hidden"
                    >
                      {humanFoodImage ? (
                        <img src={humanFoodImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                      ) : (
                        <div className="flex flex-col items-center relative z-10">
                          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                            {isUploading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Clock className="text-primary" /></motion.div> : <Upload className="text-primary" />}
                          </div>
                          <p className="text-sm font-bold text-slate-600">Drag & drop or <span className="text-primary">browse</span></p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">PNG, JPG, up to 10MB</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        ref={humanFileInputRef} 
                        className="hidden" 
                        onChange={handleHumanImageUpload}
                        accept="image/*"
                      />
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
                      value={quantity} 
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
                         <Input 
                          type="datetime-local" 
                          className="rounded-2xl border-slate-200 py-6 font-medium focus:ring-emerald-500 h-14 pl-10 text-xs" 
                          value={humanFoodData.bestBefore}
                          onChange={(e) => setHumanFoodData(prev => ({ ...prev, bestBefore: e.target.value }))}
                         />
                         <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Location</Label>
                      <div className="relative">
                         <Input 
                          placeholder="Search location..." 
                          className="rounded-2xl border-slate-200 py-6 font-medium focus:ring-emerald-500 h-14 pl-10 pr-10" 
                          value={humanFoodData.location}
                          onChange={(e) => setHumanFoodData(prev => ({ ...prev, location: e.target.value }))}
                         />
                         <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                         <button onClick={handleUseHumanLocation} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-emerald-600 transition-colors">
                            <Fingerprint size={18} />
                         </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Pickup details</Label>
                    <div className="grid grid-cols-2 gap-3">
                       <div className="space-y-1">
                          <div className="relative">
                            <Input 
                              placeholder="Availability window" 
                              className="rounded-2xl h-14 border-slate-200 pl-10 text-xs"
                              value={humanFoodData.pickupWindow}
                              onChange={(e) => setHumanFoodData(prev => ({ ...prev, pickupWindow: e.target.value }))}
                            />
                            <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          </div>
                          <p className="text-[9px] text-slate-500 font-bold px-2">e.g. 5 PM - 8 PM</p>
                       </div>
                       <div className="space-y-1">
                          <Select value={humanFoodData.handoff} onValueChange={(v) => setHumanFoodData(prev => ({ ...prev, handoff: v }))}>
                            <SelectTrigger className="rounded-2xl h-14 border-slate-200 font-medium">
                              <SelectValue placeholder="Handoff" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="contactless">Contactless</SelectItem>
                              <SelectItem value="direct">Direct</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-[9px] text-slate-500 font-bold px-2">Select handoff mode</p>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Food Details</Label>
                    <div className="flex flex-wrap gap-2">
                      {["Dairy", "Gluten-free", "Nut-free", "Vegan", "Halal"].map(tag => (
                        <Badge 
                          key={tag} 
                          variant={humanFoodData.allergens.includes(tag) ? "default" : "outline"} 
                          onClick={() => toggleHumanAllergen(tag)}
                          className={`rounded-xl px-4 py-2 cursor-pointer transition-all border-slate-200 font-bold ${humanFoodData.allergens.includes(tag) ? "bg-primary text-white" : "hover:bg-slate-50"}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                      <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0 border border-dashed border-slate-300">
                        <Plus size={14} />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Additional Notes (Optional)</Label>
                      <Input 
                        placeholder="Enter any specific details (spice level, timing, packaging instructions, etc.)" 
                        className="rounded-2xl h-14 bg-white border-slate-200"
                        value={humanFoodData.additionalNotes}
                        onChange={(e) => setHumanFoodData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <Button 
                  onClick={handleSubmitHumanFood}
                  className="w-full bg-primary hover:bg-emerald-600 text-white font-black text-xl rounded-3xl py-10 shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                   Submit Food Donation
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="pet-food" className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  {/* Pet Food Image Upload */}
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Pet Food Image</Label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 rounded-[2rem] p-6 min-h-[240px] flex flex-col items-center justify-center bg-slate-50/50 hover:bg-orange-50/50 hover:border-orange-400/40 transition-all group cursor-pointer relative overflow-hidden"
                    >
                      {petFoodImage ? (
                        <img src={petFoodImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                            {isUploading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Clock className="text-orange-500" /></motion.div> : <Upload className="text-orange-500" />}
                          </div>
                          <p className="text-sm font-bold text-slate-600">Drag & drop or <span className="text-orange-500">browse</span></p>
                          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">PNG, JPG, up to 10MB</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={handlePetFoodImageUpload}
                        accept="image/*"
                      />
                    </div>
                  </div>

                  {/* Safety Indicator */}
                  {petFoodData.expiryDate && (
                    <div className={`p-4 rounded-2xl border flex items-center gap-3 animate-in slide-in-from-top-4 duration-500 ${getSafetyIndicator(petFoodData.expiryDate)?.bg}`}>
                      <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm ${getSafetyIndicator(petFoodData.expiryDate)?.color}`}>
                        <ShieldCheck size={20} />
                      </div>
                      <div className="flex-1">
                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Safety Status</p>
                         <p className={`text-sm font-black ${getSafetyIndicator(petFoodData.expiryDate)?.color}`}>
                           {getSafetyIndicator(petFoodData.expiryDate)?.label}
                         </p>
                      </div>
                      <Info size={16} className="text-slate-300" />
                    </div>
                  )}

                  <div className="space-y-4">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Condition</Label>
                    <div className="grid grid-cols-2 gap-4">
                       <button 
                        onClick={() => setPetFoodData(prev => ({ ...prev, condition: "sealed" }))}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${petFoodData.condition === "sealed" ? "border-orange-500 bg-orange-50 shadow-inner" : "border-slate-100 bg-white hover:border-slate-200"}`}
                       >
                          <Package size={20} className={petFoodData.condition === "sealed" ? "text-orange-600" : "text-slate-400"} />
                          <span className={`text-[10px] font-black uppercase tracking-wider ${petFoodData.condition === "sealed" ? "text-orange-700" : "text-slate-600"}`}>Sealed Pack</span>
                       </button>
                       <button 
                        onClick={() => setPetFoodData(prev => ({ ...prev, condition: "opened" }))}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${petFoodData.condition === "opened" ? "border-orange-500 bg-orange-50 shadow-inner" : "border-slate-100 bg-white hover:border-slate-200"}`}
                       >
                          <ShoppingBag size={20} className={petFoodData.condition === "opened" ? "text-orange-600" : "text-slate-400"} />
                          <span className={`text-[10px] font-black uppercase tracking-wider ${petFoodData.condition === "opened" ? "text-orange-700" : "text-slate-600"}`}>Opened (Safe)</span>
                       </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Allergen Tags</Label>
                    <div className="flex flex-wrap gap-2">
                       {["Chicken-free", "Dairy-free", "Grain-free", "Soy-free"].map(tag => (
                         <Badge 
                          key={tag} 
                          onClick={() => toggleAllergen(tag)}
                          variant={petFoodData.allergens.includes(tag) ? "default" : "outline"}
                          className={`rounded-xl px-4 py-2 cursor-pointer transition-all border-slate-200 font-bold ${petFoodData.allergens.includes(tag) ? "bg-orange-500 hover:bg-orange-600" : "hover:bg-orange-50"}`}
                         >
                           {tag}
                         </Badge>
                       ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Pet Type</Label>
                      <Select value={petFoodData.type} onValueChange={(v) => setPetFoodData(prev => ({ ...prev, type: v }))}>
                        <SelectTrigger className="rounded-2xl h-14 border-slate-200 font-medium">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dog">Dog</SelectItem>
                          <SelectItem value="cat">Cat</SelectItem>
                          <SelectItem value="bird">Bird</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Category</Label>
                      <Select value={petFoodData.category} onValueChange={(v) => setPetFoodData(prev => ({ ...prev, category: v }))}>
                        <SelectTrigger className="rounded-2xl h-14 border-slate-200 font-medium">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dry">Dry Food</SelectItem>
                          <SelectItem value="wet">Wet Food</SelectItem>
                          <SelectItem value="treats">Treats</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Brand Name</Label>
                       <Input 
                        placeholder="e.g. Pedigree" 
                        className="rounded-2xl h-14 border-slate-200"
                        value={petFoodData.brand}
                        onChange={(e) => setPetFoodData(prev => ({ ...prev, brand: e.target.value }))}
                       />
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between items-center h-[20px] mb-2">
                         <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Quantity</Label>
                         <Badge className="bg-orange-500 text-white border-none text-[10px] py-0">{petFoodQuantity} units</Badge>
                       </div>
                       <Slider 
                        value={petFoodQuantity} 
                        max={20} 
                        step={1} 
                        onValueChange={setPetFoodQuantity}
                        className="py-4"
                       />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Expiry Date</Label>
                       <div className="relative">
                          <Input 
                            type="date" 
                            className="rounded-2xl h-14 border-slate-200 pl-10" 
                            value={petFoodData.expiryDate}
                            onChange={(e) => setPetFoodData(prev => ({ ...prev, expiryDate: e.target.value }))}
                          />
                          <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Location</Label>
                       <div className="relative">
                          <Input 
                            placeholder="Find location..." 
                            className="rounded-2xl h-14 border-slate-200 pl-10" 
                            value={petFoodData.location}
                            onChange={(e) => setPetFoodData(prev => ({ ...prev, location: e.target.value }))}
                          />
                          <button onClick={handleUseLocation} className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-600">
                             <MapPin size={18} />
                          </button>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Pickup Window</Label>
                       <div className="relative">
                          <Input 
                            placeholder="e.g. 5 PM - 8 PM" 
                            className="rounded-2xl h-14 border-slate-200 pl-10" 
                            value={petFoodData.pickupWindow}
                            onChange={(e) => setPetFoodData(prev => ({ ...prev, pickupWindow: e.target.value }))}
                          />
                          <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                       </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Handoff</Label>
                      <Select value={petFoodData.handoff} onValueChange={(v) => setPetFoodData(prev => ({ ...prev, handoff: v }))}>
                        <SelectTrigger className="rounded-2xl h-14 border-slate-200 font-medium">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contactless">Contactless (Porch Pickup)</SelectItem>
                          <SelectItem value="direct">Direct Handoff</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Suitability</Label>
                      <Select value={petFoodData.suitability} onValueChange={(v) => setPetFoodData(prev => ({ ...prev, suitability: v }))}>
                        <SelectTrigger className="rounded-2xl h-14 border-slate-200 font-medium">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="puppy-kitten">Puppy/Kitten</SelectItem>
                          <SelectItem value="adult">Adult</SelectItem>
                          <SelectItem value="senior">Senior</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Preference</Label>
                      <Select value={petFoodData.preference} onValueChange={(v) => setPetFoodData(prev => ({ ...prev, preference: v }))}>
                        <SelectTrigger className="rounded-2xl h-14 border-slate-200 font-medium">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small breeds</SelectItem>
                          <SelectItem value="large">Large breeds</SelectItem>
                          <SelectItem value="all">All pets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Additional Details</Label>
                    <Input 
                      placeholder="Enter specific instructions or notes (optional)" 
                      className="rounded-2xl h-14 bg-white border-slate-200" 
                      value={petFoodData.additionalDetails}
                      onChange={(e) => setPetFoodData(prev => ({ ...prev, additionalDetails: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <Button 
                  onClick={handleSubmitPetFood}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-xl rounded-3xl py-10 shadow-2xl shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                   Submit Pet Food Donation
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
                    <div 
                      onClick={() => adoptionFileInputRef.current?.click()}
                      className="aspect-square border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-400/40 transition-all group cursor-pointer relative overflow-hidden"
                    >
                      {petAdoptionImage ? (
                        <img src={petAdoptionImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                      ) : (
                        <div className="z-10 flex flex-col items-center">
                          {isUploading ? (
                             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Clock className="text-blue-500" /></motion.div>
                          ) : (
                            <Plus size={32} className="text-blue-400 mb-2 group-hover:rotate-90 transition-transform duration-500" />
                          )}
                          <p className="text-sm font-bold text-slate-600 uppercase tracking-wider">Add Photo</p>
                        </div>
                      )}
                      <input 
                        type="file" 
                        ref={adoptionFileInputRef} 
                        className="hidden" 
                        onChange={handleAdoptionImageUpload}
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Pet's Name</Label>
                      <Input 
                        placeholder="name" 
                        className="rounded-2xl h-14 bg-white" 
                        value={petAdoptionData.name}
                        onChange={(e) => setPetAdoptionData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                       <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Age Value</Label>
                          <Input 
                            placeholder="0" 
                            type="number" 
                            className="rounded-xl h-14 bg-white" 
                            value={petAdoptionData.ageValue}
                            onChange={(e) => setPetAdoptionData(prev => ({ ...prev, ageValue: e.target.value }))}
                          />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Unit</Label>
                          <Select 
                            value={petAdoptionData.ageUnit} 
                            onValueChange={(v) => setPetAdoptionData(prev => ({ ...prev, ageUnit: v }))}
                          >
                             <SelectTrigger className="rounded-xl h-14 bg-white">
                                <SelectValue />
                             </SelectTrigger>
                             <SelectContent>
                                <SelectItem value="months">Months</SelectItem>
                                <SelectItem value="years">Years</SelectItem>
                             </SelectContent>
                          </Select>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Breed or Species</Label>
                      <Input 
                        placeholder="e.g. Golden Retriever" 
                        className="rounded-2xl h-14 bg-white" 
                        value={petAdoptionData.breed}
                        onChange={(e) => setPetAdoptionData(prev => ({ ...prev, breed: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Energy Level</Label>
                      <Select 
                        value={petAdoptionData.energyLevel} 
                        onValueChange={(v) => setPetAdoptionData(prev => ({ ...prev, energyLevel: v }))}
                      >
                         <SelectTrigger className="rounded-2xl h-14 bg-white">
                            <div className="flex items-center gap-2">
                               <Activity size={16} className="text-blue-500" />
                               <SelectValue placeholder="Energy Level" />
                            </div>
                         </SelectTrigger>
                         <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                         </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                       Vetting & Details <HeartHandshake size={14} className="text-blue-500" />
                    </Label>
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Ideal Environment</p>
                          <div className="grid grid-cols-2 gap-2">
                             {['Large Yard', 'Apartment OK', 'Child Friendly', 'Other Pets OK'].map(env => (
                               <Badge 
                                key={env} 
                                variant={petAdoptionData.idealEnvironment.includes(env) ? "default" : "outline"} 
                                onClick={() => toggleAdoptionEnv(env)}
                                className={`justify-center py-2 text-[9px] font-black uppercase tracking-wider cursor-pointer transition-all ${petAdoptionData.idealEnvironment.includes(env) ? "bg-blue-500 hover:bg-blue-600" : "hover:bg-blue-50 border-slate-100"}`}>
                                  {env}
                               </Badge>
                             ))}
                          </div>
                       </div>
                       <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Additional Details (Optional)</p>
                          <Input 
                            placeholder="Medical history, Vaccination Info, favorite food, behavior notes, or any extra information" 
                            className="rounded-2xl bg-white border-slate-200 h-14" 
                            value={petAdoptionData.additionalDetails}
                            onChange={(e) => setPetAdoptionData(prev => ({ ...prev, additionalDetails: e.target.value }))}
                          />
                       </div>
                    </div>
                  </div>
                </div>
              </div>

               <div className="pt-6 border-t border-slate-100">
                <Button 
                  onClick={handleSubmitAdoption}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black text-xl rounded-3xl py-10 shadow-2xl shadow-blue-500/20 hover:scale-[1.02] transition-all"
                >
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
