import React, { useState } from 'react';
import { Video, Mic, Sparkles, Loader2 } from 'lucide-react';

interface FormData {
  prompt: string;
  voiceActor: string;
  aiModel: string;
  duration: string;
  style: string;
}

export function VideoCreator() {
  const [formData, setFormData] = useState<FormData>({
    prompt: '',
    voiceActor: '',
    aiModel: 'gpt-4',
    duration: '30',
    style: 'cinematic'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSubmitting(false);
          setIsComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 800);
  };
  
  const resetForm = () => {
    setFormData({
      prompt: '',
      voiceActor: '',
      aiModel: 'gpt-4',
      duration: '30',
      style: 'cinematic'
    });
    setIsComplete(false);
    setProgress(0);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Video className="text-nebula-200" size={24} />
        <h2 className="text-2xl font-bold text-nebula-50">AI Video Creator</h2>
      </div>
      
      <p className="text-nebula-200 mb-6">
        Create short AI-generated videos by providing a prompt and customizing settings.
      </p>
      
      {!isComplete ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-nebula-100 mb-1">
              Video Prompt
            </label>
            <textarea
              id="prompt"
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Describe what you want in your video..."
              className="w-full rounded-md border border-nebula-600 bg-nebula-800/50 text-nebula-100 py-2 px-3 shadow-sm focus:border-nebula-400 focus:outline-none focus:ring-1 focus:ring-nebula-400 placeholder-nebula-400"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="voiceActor" className="block text-sm font-medium text-nebula-100 mb-1">
                Voice Actor
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mic className="text-nebula-400" size={16} />
                </div>
                <input
                  type="text"
                  id="voiceActor"
                  name="voiceActor"
                  value={formData.voiceActor}
                  onChange={handleChange}
                  placeholder="e.g. Morgan Freeman, neutral female"
                  className="w-full rounded-md border border-nebula-600 bg-nebula-800/50 text-nebula-100 py-2 pl-10 pr-3 shadow-sm focus:border-nebula-400 focus:outline-none focus:ring-1 focus:ring-nebula-400 placeholder-nebula-400"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="aiModel" className="block text-sm font-medium text-nebula-100 mb-1">
                AI Model
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Sparkles className="text-nebula-400" size={16} />
                </div>
                <select
                  id="aiModel"
                  name="aiModel"
                  value={formData.aiModel}
                  onChange={handleChange}
                  className="w-full rounded-md border border-nebula-600 bg-nebula-800/50 text-nebula-100 py-2 pl-10 pr-3 shadow-sm focus:border-nebula-400 focus:outline-none focus:ring-1 focus:ring-nebula-400"
                >
                  <option value="gpt-4">GPT-4 (High Quality)</option>
                  <option value="gpt-3.5">GPT-3.5 (Faster)</option>
                  <option value="stable-diffusion">Stable Diffusion</option>
                  <option value="midjourney">Midjourney Style</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-nebula-100 mb-1">
                Duration (seconds)
              </label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full rounded-md border border-nebula-600 bg-nebula-800/50 text-nebula-100 py-2 px-3 shadow-sm focus:border-nebula-400 focus:outline-none focus:ring-1 focus:ring-nebula-400"
              >
                <option value="15">15 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">60 seconds</option>
                <option value="120">2 minutes</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-nebula-100 mb-1">
                Video Style
              </label>
              <select
                id="style"
                name="style"
                value={formData.style}
                onChange={handleChange}
                className="w-full rounded-md border border-nebula-600 bg-nebula-800/50 text-nebula-100 py-2 px-3 shadow-sm focus:border-nebula-400 focus:outline-none focus:ring-1 focus:ring-nebula-400"
              >
                <option value="cinematic">Cinematic</option>
                <option value="cartoon">Cartoon/Animated</option>
                <option value="realistic">Realistic</option>
                <option value="vintage">Vintage/Retro</option>
                <option value="scifi">Sci-Fi</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-nebula-500 text-nebula-50 py-2 px-4 rounded-md hover:bg-nebula-400 focus:outline-none focus:ring-2 focus:ring-nebula-300 focus:ring-offset-2 focus:ring-offset-nebula-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Generating Video ({progress}%)
              </>
            ) : (
              'Generate Video'
            )}
          </button>
        </form>
      ) : (
        <div className="bg-nebula-800/30 backdrop-blur-sm rounded-lg border border-nebula-700/50 p-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-nebula-400/20 rounded-full flex items-center justify-center">
              <Video className="text-nebula-200" size={32} />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-nebula-100 mb-2">Video Generated Successfully!</h3>
          <p className="text-nebula-200 mb-6">
            Your video has been created based on your prompt: "{formData.prompt.substring(0, 50)}..."
          </p>
          
          <div className="aspect-video bg-nebula-900 rounded-lg mb-6 flex items-center justify-center border border-nebula-700">
            <div className="text-nebula-100 text-center p-4">
              <p className="text-lg font-medium mb-2">Video Preview</p>
              <p className="text-sm opacity-70">
                (In a real application, the video would be displayed here)
              </p>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetForm}
              className="bg-nebula-800 border border-nebula-600 text-nebula-200 py-2 px-4 rounded-md hover:bg-nebula-700 focus:outline-none focus:ring-2 focus:ring-nebula-400 focus:ring-offset-2 focus:ring-offset-nebula-900 transition-colors"
            >
              Create Another Video
            </button>
            <button
              className="bg-nebula-500 text-nebula-50 py-2 px-4 rounded-md hover:bg-nebula-400 focus:outline-none focus:ring-2 focus:ring-nebula-300 focus:ring-offset-2 focus:ring-offset-nebula-900 transition-colors"
            >
              Download Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
}