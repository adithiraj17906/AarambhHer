import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setAuth, toast }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !pass) {
      toast("Please enter both email and password.");
      return;
    }
    
    // Mock authentication
    setAuth({ name: email.split('@')[0], email: email });
    toast(isLogin ? "Welcome back! Login successful. ✓" : "Account created! Welcome to AarambhHer. ✓");
    navigate(-1); // Go back to where the user came from
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12 fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl border border-pink-100 p-8 shadow-2xl shadow-pink-100/50">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? "Welcome Back" : "Join AarambhHer"}
          </h2>
          <p className="text-gray-500 text-sm">
            {isLogin ? "Login to access your personalized career hub" : "Start your professional journey with thousands of women"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5 ml-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-pink-100 rounded-2xl px-5 py-3.5 text-sm bg-rose-50/30 text-gray-800 outline-none focus:border-pink-400 focus:bg-white transition-all placeholder-gray-300" 
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5 ml-1">Password</label>
            <input 
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-pink-100 rounded-2xl px-5 py-3.5 text-sm bg-rose-50/30 text-gray-800 outline-none focus:border-pink-400 focus:bg-white transition-all placeholder-gray-300" 
            />
          </div>

          <button type="submit"
            className="w-full bg-pink-700 hover:bg-pink-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-pink-900/20 transition-all border-0 cursor-pointer active:scale-95 text-base mt-2">
            {isLogin ? "Log In →" : "Create Account →"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-pink-50 pt-6">
          <p className="text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-pink-700 font-bold hover:underline bg-transparent border-0 cursor-pointer text-sm">
              {isLogin ? "Sign Up Free" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
