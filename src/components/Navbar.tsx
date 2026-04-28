import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  MapPin, 
  LayoutDashboard, 
  Search, 
  BarChart3, 
  LogIn,
  Menu,
  X,
  PawPrint,
  Utensils
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Explore", path: "/explore", icon: <Search className="w-4 h-4" /> },
    { name: "Pets", path: "/pets", icon: <PawPrint className="w-4 h-4" /> },
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "Impact", path: "/impact", icon: <BarChart3 className="w-4 h-4" /> },
    { name: "Community", path: "/community", icon: <Heart className="w-4 h-4" /> },
  ];

  return (
    <nav className={`fixed top-8 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-[100] transition-all duration-700 rounded-[32px] overflow-visible ${
      isScrolled ? "py-4 glass shadow-deep translate-y-[-4px]" : "py-6 glass"
    }`}>
      <div className="mx-auto px-8 md:px-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-11 h-11 bg-slate-950 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-emerald-500/20 transition-all duration-500">
              <div className="absolute inset-0 bg-linear-to-tr from-emerald-500 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Heart className="text-white w-5 h-5 fill-current relative z-10 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <span className="text-2xl font-bold tracking-[-0.03em] text-slate-900">
              TheKind<span className="text-emerald-600 font-extrabold">Bowl</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-12">
            <div className="flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 relative group/link ${
                    location.pathname === link.path ? "text-emerald-600" : "text-slate-500 hover:text-slate-950"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className={`absolute -bottom-1.5 left-0 w-0 h-px bg-emerald-500 transition-all duration-500 group-hover/link:w-full ${location.pathname === link.path ? "w-full" : ""}`} />
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-10 pl-12 border-l border-slate-100">
              <button 
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-950 transition-colors"
                onClick={() => navigate('/auth')}
              >
                Log In
              </button>
              <Button 
                onClick={() => navigate('/post')}
                className="bg-slate-950 hover:bg-emerald-500 text-white text-[10px] uppercase tracking-[0.3em] font-black px-10 py-6 rounded-[22px] transition-all duration-700 shadow-premium border-none btn-premium h-auto"
              >
                Share Food
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-700 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass shadow-2xl overflow-hidden md:hidden border-t border-slate-100"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 text-lg font-semibold py-2 px-4 rounded-xl transition-all ${
                    location.pathname === link.path 
                      ? "bg-primary/10 text-primary" 
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
                <Button variant="outline" className="w-full rounded-xl py-6 font-bold text-lg" onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false); }}>
                  Login
                </Button>
                <Button className="w-full bg-primary hover:bg-emerald-600 text-white rounded-xl py-6 font-bold text-lg">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
