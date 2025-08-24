import React, { useState,useEffect } from 'react'
//import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare,User,Mail,Lock,Eye,EyeOff,Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword,setShowPassword]=useState(false);
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })

  // const login = useAuthStore((state) => state.login);                 
  // const isLoggingIn = useAuthStore((state) => state.isLoggingIn);

  // const handleSubmit=(e)=>{
  //   e.preventDefault();
  //   login(formData);
  // }

    useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // store session.user in state
        console.log("Restored session:", session.user);
      } else {
        console.log("No session found");
      }
    };
    getSession();

    // Optional: listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);


  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault
    setLoading(true);
    try{
        const {data,error}=await supabase.auth.signInWithPassword({
        email:formData.email,
        password:formData.password,
        });
        if(!error && data.session){
          toast.success("Logged in!");
          navigate("/Admin");
        }
        else{
          toast.error(error?.message || "An unexpected Error occured");
        }
        
    }
    catch (error) {
        if (error instanceof Error) {
        toast.error(error.message);
    } else {
        toast.error("An unexpected error occurred");
    }
        
    }
    finally{
        setLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault
    setLoading(true);
    try{
        console.log("Signing up with:", formData);
        const {error}=await supabase.auth.signUp({
        email:formData.email,
        password:formData.password,
        });
        if(!error){

        setIsLogin(true); // Switch to login mode after signup
        setFormData({ email: '', password: '' }); // Clear form data
        toast.success("Signup successful! Please verify your email.");
        }
      else{
        toast.error(error.message);
      }
    }
    catch (error) {
        if (error instanceof Error) {
        toast.error(error.message);
    } else {
        toast.error("An unexpected error occurred");
    }
    }
    finally{
        setLoading(false);
    }
  };

  const redirectURL = import.meta.env.MODE === 'development' ? "http://localhost:3000/auth/callback" : "https://smashrix.vercel.app/auth/callback"

  // 🔐 Google OAuth Login
  const handleGoogleLogin = async () => {
    const { data,error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    //   options: {
    //     queryParams: {
    //       prompt: "select_account",
    //     },
    //   },
    options: {
    //redirectTo: "http://localhost:3000/auth/callback",
    //redirectTo: "https://data-visualisation-v1.vercel.app/auth/callback"
    redirectTo: redirectURL
  },
    });
    //console.log("Google OAuth data:", data);
    if (error) {
      toast.error(error.message);
    } 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 lottie-cursor-container" data-theme="synthwave">
            {/* left side */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
                {/* LOGO */}
                <div className="text-center mb-8">
                <div className="flex flex-col items-center gap-2 group">
                    <div
                    className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                    group-hover:bg-primary/20 transition-colors"
                    >
                    <MessageSquare className="size-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold mt-2">Only for Admins</h1>
                    <p className="text-base-content/60">Login here</p>
                </div>
                </div>

                <form 
                  onSubmit={(e) => {
                  e.preventDefault();
                  isLogin ? handleEmailLogin(e) : handleEmailSignup(e);
                }} 
                className="space-y-6">
      
                <div className="form-control">
                    <label className="label">
                    <span className="label-text font-medium">Email</span>
                    </label>
                    <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="size-5 text-base-content/40" />
                    </div>
                    <input
                        type="email"
                        className={`input input-bordered w-full pl-10 bg-transparent focus:bg-transparent`}
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                    <span className="label-text font-medium">Password</span>
                    </label>
                    <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="size-5 text-base-content/40" />
                    </div>
                    <input
                        type={showPassword ? "text" : "password"}
                        className={`input input-bordered w-full pl-10 bg-transparent focus:bg-transparent`}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                        <EyeOff className="size-5 text-base-content/40" />
                        ) : (
                        <Eye className="size-5 text-base-content/40" />
                        )}
                    </button>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                    {/* {isLogin ? (
                    <>
                        <Loader2 className="size-5 animate-spin" />
                        Loading...
                    </>
                    ) : (
                    "Login"
                    )} */}
                    {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2"></div>
                      <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                    </div>
                  ) : (
                    <span className="font-semibold">
                      {isLogin ? 'Sign In' : 'Create Account'}
                    </span>
                  )}
                </button>
                </form>

                <div className="text-center">
                <p className="text-base-content/60">
                    Go back to home?{" "}
                    <Link to="/" className="link link-primary">
                    Home
                    </Link>
                </p>
                </div>
            </div>
            </div>

            {/* right side */}

            <AuthImagePattern
            title="It is the door behind which lies our excellent team management"
            subtitle="Connect with friends, share moments, and stay in touch with your loved ones. All through our favorite sport Badminton!"
            />
        </div>
  )
}

export default AuthPage
