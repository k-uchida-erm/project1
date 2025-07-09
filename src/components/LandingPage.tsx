import React, { useState, useEffect } from 'react';
import { SignInButton } from '@clerk/clerk-react';
import { ArrowRight, Sparkles, Zap, Brain, MessageSquare, Map, Lightbulb, Network, Layers, PenTool, Link2, Workflow } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Custom Logo Component
  const CustomLogo = () => (
    <div className="relative w-32 h-32 mx-auto">
      <svg
        width="128"
        height="128"
        viewBox="0 0 128 128"
        className="drop-shadow-2xl transform hover:scale-110 transition-transform duration-500"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="depthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#6B21A8" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Centered geometric shape */}
        <g transform="translate(64,64)" className="animate-pulse" style={{ animationDuration: '2s' }}>
          
          {/* Shadow/depth layer - offset for 3D effect */}
          <polygon 
            points="2,-32 32,-12 32,12 2,32 -28,12 -28,-12"
            fill="url(#depthGradient)" 
            opacity="0.4"
          />
          
          {/* Main shape - more square proportions */}
          <polygon 
            points="0,-30 30,-10 30,10 0,30 -30,10 -30,-10"
            fill="url(#logoGradient)" 
            filter="url(#glow)"
            className="transform hover:rotate-180 transition-transform duration-700"
          />
          
          {/* Inner bevel - creating depth */}
          <polygon 
            points="0,-22 22,-6 22,6 0,22 -22,6 -22,-6"
            fill="rgba(255,255,255,0.2)"
          />
          
          {/* Inner accent with highlight */}
          <polygon 
            points="0,-14 14,-3 14,3 0,14 -14,3 -14,-3"
            fill="rgba(255,255,255,0.4)"
          />
          
          {/* Central core with highlight */}
          <circle cx="0" cy="0" r="5" fill="rgba(255,255,255,0.6)"/>
          <circle cx="-1" cy="-1" r="2" fill="white"/>
        </g>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 overflow-hidden relative">
      {/* Background Visual Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div 
          className="absolute top-20 left-20 w-96 h-96 border border-blue-500/20 rounded-full"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute bottom-32 right-32 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rotate-45"
          style={{
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px) rotate(45deg)`
          }}
        />
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <path 
            d="M200,300 Q500,200 800,400 T600,700" 
            stroke="url(#lineGradient)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
          />
          <path 
            d="M100,600 Q400,500 700,300 T900,600" 
            stroke="url(#lineGradient)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Logo-style Hero Section */}
          <div className="mb-20 animate-emerge">
            
            {/* Custom Logo */}
            <div className="flex items-center justify-center mb-16">
              <CustomLogo />
            </div>
            
            {/* Short Brand Name - Much larger */}
            <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                NoteFlow
              </span>
            </h1>
            
            {/* Visual tagline with icons - Simplified */}
            <div className="flex items-center justify-center gap-8 mb-10 flex-wrap">
              <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-full shadow-lg">
                <Brain className="w-6 h-6 text-blue-400" />
                <span className="text-blue-200 font-medium text-lg">AI-Powered</span>
              </div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-purple-400/30 rounded-full shadow-lg">
                <Zap className="w-6 h-6 text-purple-400" />
                <span className="text-purple-200 font-medium text-lg">Lightning Fast</span>
              </div>
            </div>
            
            {/* Subtitle - Larger */}
            <p className="text-2xl text-slate-300 leading-relaxed font-medium mb-12 max-w-3xl mx-auto">
              AI-powered workspace for developing and managing your ideas
            </p>

            {/* Visual CTA Section - Larger */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <SignInButton mode="modal">
                <button className="group relative px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-purple-500/50 text-xl">
                  <span className="flex items-center gap-3">
                    <Sparkles className="w-7 h-7" />
                    Start Creating
                    <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </button>
              </SignInButton>
              
              <button className="px-12 py-6 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border-2 border-white/20 hover:border-purple-400/50 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl text-xl">
                <span className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-purple-400" />
                  Watch Demo
                </span>
              </button>
            </div>
          </div>

          {/* Visual Features Grid - Simplified */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {/* Feature 1 */}
            <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-blue-500/20">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-slate-300 leading-relaxed">
                Instant note creation and organization
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-purple-500/20">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI-Powered</h3>
              <p className="text-slate-300 leading-relaxed">
                Smart insights and connections
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-blue-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-purple-500/20">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Network className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Connected</h3>
              <p className="text-slate-300 leading-relaxed">
                Visual mind maps and workflows
              </p>
            </div>
          </div>

          {/* Visual Bottom CTA - Simplified */}
          <div className="text-center">
            {/* Icon separator */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></div>
            </div>
            
            <p className="text-slate-400 mb-8 text-xl font-medium">
              Join thousands of creators worldwide
            </p>
            
            <SignInButton mode="modal">
              <button className="group inline-flex items-center gap-3 px-8 py-4 text-blue-400 hover:text-purple-400 transition-colors duration-300 font-semibold text-lg">
                <Workflow className="w-5 h-5" />
                Get started for free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </SignInButton>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes emerge {
          0% { opacity: 0; transform: translateY(40px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .animate-emerge {
          animation: emerge 1.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LandingPage; 