import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Trash2, Quote, Clock, User } from "lucide-react";
import { toast } from "sonner";

interface CommunityPost {
  id: string;
  name: string;
  title: string;
  story: string;
  rating: number;
  timestamp: string;
}

const DEFAULT_POSTS: CommunityPost[] = [
  {
    id: "1",
    name: "Rahul",
    title: "Rahul's First Donation",
    story: "Shared extra meals from a birthday event and helped 25 people nearby.",
    rating: 5,
    timestamp: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Seva NGO",
    title: "Seva Shelter Feedback",
    story: "Using The Kind Bowl helped reduce food shortage days significantly.",
    rating: 5,
    timestamp: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Priya",
    title: "Street Dog Feeding Success",
    story: "Regular donors now support daily feeding across neighborhoods.",
    rating: 4,
    timestamp: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Ramesh",
    title: "Weekend Food Drive",
    story: "Connected restaurants to distribute surplus meals weekly.",
    rating: 5,
    timestamp: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Hotel Anand",
    title: "Hotel Surplus Sharing",
    story: "Instead of waste, unused meals now reach families quickly.",
    rating: 5,
    timestamp: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Community Group",
    title: "Neighborhood Impact",
    story: "Our apartment shares leftover food every Friday.",
    rating: 4,
    timestamp: new Date().toISOString(),
  },
];

export const Community = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    story: "",
    rating: "5",
  });

  useEffect(() => {
    const savedPosts = localStorage.getItem("communityPosts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(DEFAULT_POSTS);
      localStorage.setItem("communityPosts", JSON.stringify(DEFAULT_POSTS));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.title || !formData.story) {
      toast.error("Please fill in all fields");
      return;
    }

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      name: formData.name,
      title: formData.title,
      story: formData.story,
      rating: parseInt(formData.rating),
      timestamp: new Date().toISOString(),
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
    
    setFormData({ name: "", title: "", story: "", rating: "5" });
    toast.success("Story shared with the community!");
  };

  const deletePost = (id: string) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
    toast.success("Post removed");
  };

  return (
    <div className="pt-64 pb-32 min-h-screen container mx-auto px-8 md:px-16 lg:px-24 text-slate-950 bg-[#fcfcfd] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] -z-10" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >

        <h2 className="text-5xl md:text-7xl lg:text-[85px] font-black tracking-[-0.07em] leading-[0.85] text-slate-950 mb-16">
          Voices From<br />
          <span className="gradient-text tracking-tighter">The Community.</span>
        </h2>
      </motion.div>

      {/* Post Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-32"
      >
        <Card className="card-startup bg-white border-slate-100/50 rounded-[48px] p-12 shadow-premium relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-1000" />
          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-4">
                <Label className="text-slate-500 text-[10px] uppercase tracking-widest font-black pl-2">Your Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="bg-slate-50 border-slate-100 text-slate-950 rounded-2xl py-6 px-6 focus:ring-emerald-500/10 transition-all h-auto"
                />
              </div>
              <div className="space-y-4">
                <Label className="text-slate-500 text-[10px] uppercase tracking-widest font-black pl-2">Story Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. My First Impact"
                  className="bg-slate-50 border-slate-100 text-slate-950 rounded-2xl py-6 px-6 focus:ring-emerald-500/10 transition-all h-auto"
                />
              </div>
              <div className="md:col-span-2 space-y-4">
                <Label className="text-slate-500 text-[10px] uppercase tracking-widest font-black pl-2">Impact Story</Label>
                <textarea
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  placeholder="Describe how you helped or were helped..."
                  className="w-full bg-slate-50 border-slate-100 text-slate-950 rounded-2xl py-6 px-6 focus:ring-emerald-500/10 transition-all h-32 resize-none outline-none text-sm placeholder:text-slate-400"
                />
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-6">
                <Label className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">Experience Rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star.toString() })}
                      className={`transition-all duration-300 ${parseInt(formData.rating) >= star ? "text-amber-400 scale-110" : "text-slate-200 hover:text-slate-400"}`}
                    >
                      <Star size={24} fill={parseInt(formData.rating) >= star ? "currentColor" : "none"} strokeWidth={2} />
                    </button>
                  ))}
                </div>
              </div>
              <Button
                type="submit"
                className="bg-slate-950 hover:bg-emerald-500 text-white font-black px-16 py-8 rounded-[28px] shadow-deep transition-all duration-700 btn-premium border-none uppercase tracking-[0.2em] text-[10px] h-auto w-full md:w-auto"
              >
                Share Story
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>

      {/* Feed */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              layout
            >
              <Card className="card-startup bg-white h-full group flex flex-col justify-between">
                <CardContent className="p-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                      <Quote size={24} />
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={14} 
                          fill={post.rating >= star ? "currentColor" : "none"} 
                          className={post.rating >= star ? "text-amber-400" : "text-slate-200"}
                          strokeWidth={2.5}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mb-10 flex-grow">
                    <h4 className="text-2xl font-extrabold text-slate-950 mb-4 tracking-tighter leading-tight group-hover:text-emerald-600 transition-colors duration-500 italic">
                      {post.title}
                    </h4>
                    <p className="text-slate-500 font-medium leading-relaxed tracking-tight line-clamp-4">
                      "{post.story}"
                    </p>
                  </div>

                  <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <User size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-950 uppercase tracking-widest">{post.name}</p>
                        <p className="text-[10px] font-medium text-slate-400 flex items-center gap-1.5">
                          <Clock size={10} /> {new Date(post.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    {/* Only show delete if it's not a default post OR if user wants to delete anything */}
                    <button
                      onClick={() => deletePost(post.id)}
                      className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 hover:bg-rose-50 hover:text-rose-500 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
