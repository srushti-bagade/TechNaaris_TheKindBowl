import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50 pt-32">
            <Card className="w-full max-w-md shadow-deep rounded-[32px] border-none">
                <CardHeader className="p-10 pb-4">
                    <CardTitle className="text-3xl font-black tracking-tighter text-slate-950">
                        {isLogin ? "Access Hub" : "Initialize Account"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-0 space-y-6">
                    {!isLogin && (
                        <div className="space-y-2">
                            <Label className="uppercase text-[10px] font-black text-slate-400 tracking-wider">Full Name</Label>
                            <Input placeholder="Ankita Das" className="rounded-2xl h-14 border-slate-200" />
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label className="uppercase text-[10px] font-black text-slate-400 tracking-wider">Email</Label>
                        <Input type="email" placeholder="email@example.com" className="rounded-2xl h-14 border-slate-200" />
                    </div>
                    <div className="space-y-2">
                        <Label className="uppercase text-[10px] font-black text-slate-400 tracking-wider">Password</Label>
                        <Input type="password" placeholder="••••••••" className="rounded-2xl h-14 border-slate-200" />
                    </div>
                    <Button 
                        className="w-full bg-slate-950 hover:bg-emerald-500 text-white font-black rounded-2xl h-14 shadow-lg"
                        onClick={() => navigate('/dashboard')}
                    >
                        {isLogin ? "Authorize" : "Initialize"} <ArrowRight size={16} className="ml-2" />
                    </Button>
                    <p className="text-center text-[11px] font-medium text-slate-500">
                        {isLogin ? "New to TheKindBowl?" : "Already part of the network?"}{" "}
                        <button 
                            className="text-emerald-600 font-bold hover:underline"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Initialize Account" : "Access Hub"}
                        </button>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
