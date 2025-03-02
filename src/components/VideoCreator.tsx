import React, { useState } from 'react';
import { Video, Mic, Sparkles, Loader2, Play } from 'lucide-react';

interface FormData {
  prompt: string;
  voiceActor: string;
  aiModel: string;
  duration: string;
  style: string;
}
//TODO this needs to come from api
const voices = [
  { id: "9BWtsMINqrJLrRacOk9x", name: "Aria", accent: "American", description: "expressive", age: "middle-aged", gender: "female", use_case: "social media", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/9BWtsMINqrJLrRacOk9x/405766b8-1f4e-4d3c-aba1-6f25333823ec.mp3" },
  { id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger", accent: "American", description: "confident", age: "middle-aged", gender: "male", use_case: "social media", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/CwhRBWXzGAHq8TQ4Fs17/58ee3ff5-f6f2-4628-93b8-e38eb31806b0.mp3" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah", accent: "American", description: "soft", age: "young", gender: "female", use_case: "news", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/EXAVITQu4vr4xnSDxMaL/01a3e33c-6e99-4ee7-8543-ff2216a32186.mp3" },
  { id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura", accent: "American", description: "upbeat", age: "young", gender: "female", use_case: "social media", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/FGY2WhTYpPnrIDTdsKH5/67341759-ad08-41a5-be6e-de12fe448618.mp3" },
  { id: "IKne3meq5aSn9XLyUdCD", name: "Charlie", accent: "Australian", description: "natural", age: "middle-aged", gender: "male", use_case: "conversational", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/IKne3meq5aSn9XLyUdCD/102de6f2-22ed-43e0-a1f1-111fa75c5481.mp3" },
  { id: "JBFqnCBsd6RMkjVDRZzb", name: "George", accent: "British", description: "warm", age: "middle-aged", gender: "male", use_case: "narration", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/JBFqnCBsd6RMkjVDRZzb/e6206d1a-0721-4787-aafb-06a6e705cac5.mp3" },
  { id: "N2lVS1w4EtoT3dr4eOWO", name: "Callum", accent: "Transatlantic", description: "intense", age: "middle-aged", gender: "male", use_case: "characters", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/N2lVS1w4EtoT3dr4eOWO/ac833bd8-ffda-4938-9ebc-b0f99ca25481.mp3" },
  { id: "SAz9YHcvj6GT2YYXdXww", name: "River", accent: "American", description: "confident", age: "middle-aged", gender: "non-binary", use_case: "social media", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/SAz9YHcvj6GT2YYXdXww/e6c95f0b-2227-491a-b3d7-2249240decb7.mp3" },
  { id: "TX3LPaxmHKxFdv7VOQHJ", name: "Liam", accent: "American", description: "articulate", age: "young", gender: "male", use_case: "narration", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/TX3LPaxmHKxFdv7VOQHJ/63148076-6363-42db-aea8-31424308b92c.mp3" },
  { id: "Xb7hH8MSUJpSbSDYk0k2", name: "Alice", accent: "British", description: "confident", age: "middle-aged", gender: "female", use_case: "news", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/Xb7hH8MSUJpSbSDYk0k2/2db69eaf-f0b3-4d02-92f1-1e56e0ea539e.mp3" },
  { id: "cgSgspJ2msm6clMCkdW9", name: "Jessica", accent: "American", description: "expressive", age: "young", gender: "female", use_case: "conversational", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/cgSgspJ2msm6clMCkdW9/6e0e501f-3b96-4b98-871b-152d59dd4eb5.mp3" },
  { id: "cjVigY5qzO86Huf0OWal", name: "Eric", accent: "American", description: "friendly", age: "middle-aged", gender: "male", use_case: "conversational", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/cjVigY5qzO86Huf0OWal/2b84f979-b648-4d61-9b73-9f1d8a0c3a36.mp3" },
  { id: "iP95p4xoKVk53GoZ742B", name: "Chris", accent: "American", description: "casual", age: "middle-aged", gender: "male", use_case: "conversational", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/iP95p4xoKVk53GoZ742B/5a4050b0-0099-4c10-92f1-8a01b1ac741b.mp3" },
  { id: "nPczCjzI2devNBz1zQrb", name: "Brian", accent: "American", description: "deep", age: "middle-aged", gender: "male", use_case: "narration", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/nPczCjzI2devNBz1zQrb/ba67b87c-6b3a-4200-9df2-7ff39f6e9132.mp3" },
  { id: "onwK4e9ZLuTAKqWW03F9", name: "Daniel", accent: "British", description: "authoritative", age: "middle-aged", gender: "male", use_case: "news", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/onwK4e9ZLuTAKqWW03F9/3569eb8e-5b36-4f7a-bfb2-e34501a8d3a2.mp3" },
  { id: "pFZP5JQG7iQjIQuC4Bku", name: "Lily", accent: "British", description: "warm", age: "middle-aged", gender: "female", use_case: "narration", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/pFZP5JQG7iQjIQuC4Bku/4827b589-f9ea-4dbb-9aa2-f7aa14cbd741.mp3" },
  { id: "pqHfZKP75CvOlQylNhV4", name: "Bill", accent: "American", description: "trustworthy", age: "old", gender: "male", use_case: "narration", preview: "https://storage.googleapis.com/eleven-public-prod/premade/voices/pqHfZKP75CvOlQylNhV4/d782b3ff-84ba-4029-848c-acf01285524d.mp3" }
];


export function VideoCreator() {
  const [formData, setFormData] = useState<FormData>({
    prompt: '',
    voiceActor: voices[0].id,
    aiModel: 'gpt-4',
    duration: '30',
    style: 'cinematic'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioSrc, setAudioSrc] = useState<string>(voices[0].preview);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "voiceActor") {
      const selectedVoice = voices.find((voice) => voice.id === value);
      if (selectedVoice) {
        setAudioSrc(selectedVoice.preview);
      }
    }
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
                <select
                  id="voiceActor"
                  name="voiceActor"
                  value={formData.voiceActor}
                  onChange={handleChange}
                  className="w-full rounded-md border border-nebula-600 bg-nebula-800/50 text-nebula-100 py-2 pl-10 pr-3 shadow-sm focus:border-nebula-400 focus:outline-none focus:ring-1 focus:ring-nebula-400"
                >
                  {voices.map((voice) => (
                    <option key={voice.id} value={voice.id}>
                      {voice.name} ({voice.accent}, {voice.description}, {voice.age}, {voice.gender}, {voice.use_case})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-3">
                <Play className="text-nebula-400" size={20} />
                <audio controls key={audioSrc} className="w-small">
                  <source src={audioSrc} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
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
