import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { RestaurantChat } from './components/RestaurantChat';
import { VideoCreator } from './components/VideoCreator';
import { InstagramScraper } from './components/InstagramScraper';
import { TextAnalyzer } from './components/TextAnalyzer';
import { GithubIcon, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-nebula-gradient">
      <header className="bg-nebula-900/90 border-b border-nebula-700/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-nebula-50 flex items-center">
          <img 
            src="/assets/nova-nexus-icon.svg" 
            alt="Nova Nexus" 
            className="mr-2" 
            width="50" 
            height="50" 
          />
            NovaNexus
          </h1>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-nebula-200 hover:text-nebula-50 transition-colors"
          >
            <GithubIcon size={24} />
          </a>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-nebula-900/40 backdrop-blur-md rounded-lg shadow-xl overflow-hidden border border-nebula-700/30">
          <Tabs defaultValue="restaurant" className="w-full">
            <div className="border-b border-nebula-700/30">
              <TabsList className="flex">
                <TabsTrigger value="restaurant" className="flex-1">Restaurant Chat</TabsTrigger>
                <TabsTrigger value="video" className="flex-1">Video Creator</TabsTrigger>
                <TabsTrigger value="instagram" className="flex-1">Instagram Scraper</TabsTrigger>
                <TabsTrigger value="text" className="flex-1">Text Analysis</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-6">
              <TabsContent value="restaurant">
                <RestaurantChat />
              </TabsContent>
              
              <TabsContent value="video">
                <VideoCreator />
              </TabsContent>
              
              <TabsContent value="instagram">
                <InstagramScraper />
              </TabsContent>
              
              <TabsContent value="text">
                <TextAnalyzer />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      
      <footer className="bg-nebula-900/90 border-t border-nebula-700/50 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-nebula-300 flex flex-col md:flex-row justify-center items-center gap-4">
          <span>© 2025 NovaNexus playground. All rights reserved.</span>

          <a
            href="https://www.linkedin.com/in/ravi-bhatt-219a10ab/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-nebula-400 hover:text-nebula-200 transition-colors flex items-center gap-2"
          >
            <FaLinkedin className="text-blue-500" size={20} /> LinkedIn 
          </a>

          <a
            href="mailto:oceanicravi@gmail.com"
            className="text-nebula-400 hover:text-nebula-200 transition-colors flex items-center gap-2"
          >
            <FaEnvelope className="text-red-500" size={20} /> Mail
          </a>
        </div>
      </footer>

    </div>
  );
}

export default App;