import React, { useState } from 'react';
import { Instagram, Search, Loader2, FileText } from 'lucide-react';

interface ScraperFormData {
  username: string;
  prompt: string;
  postCount: string;
}

interface ScrapedData {
  username: string;
  followers: string;
  posts: {
    id: number;
    imageUrl: string;
    caption: string;
    likes: number;
    comments: number;
  }[];
  insights: string[];
}

export function InstagramScraper() {
  const [formData, setFormData] = useState<ScraperFormData>({
    username: '',
    prompt: '',
    postCount: '5'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setScrapedData({
        username: formData.username,
        followers: '12.5K',
        posts: [
          {
            id: 1,
            imageUrl: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            caption: 'Enjoying a beautiful sunset at the beach! #sunset #beach #vibes',
            likes: 342,
            comments: 28
          },
          {
            id: 2,
            imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            caption: 'Nothing beats homemade pizza night! 🍕 #foodie #homecooking',
            likes: 289,
            comments: 15
          },
          {
            id: 3,
            imageUrl: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            caption: 'Morning workout complete! Starting the day right 💪 #fitness #motivation',
            likes: 412,
            comments: 32
          }
        ],
        insights: [
          'Posts with food content receive 27% more engagement than other content',
          'Optimal posting time appears to be between 6-8pm on weekdays',
          'Posts with questions in the caption receive 2x more comments',
          'Hashtag usage is effective, with an average of 5-7 hashtags per post'
        ]
      });
      setIsLoading(false);
    }, 2000);
  };
  
  const resetForm = () => {
    setFormData({
      username: '',
      prompt: '',
      postCount: '5'
    });
    setScrapedData(null);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Instagram className="text-nebula-200" size={24} />
        <h2 className="text-2xl font-bold text-nebula-50">Instagram Scraper</h2>
      </div>
      
      <p className="text-nebula-200 mb-6">
        Analyze Instagram profiles and extract insights based on your specific requirements.
      </p>
      
      {!scrapedData ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-nebula-100 mb-1">
              Instagram Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Instagram className="text-nebula-400" size={16} />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="e.g. natgeo"
                className="w-full rounded-md border border-nebula-600 bg-nebula-800/50 text-nebula-100 py-2 pl-10 pr-3 shadow-sm focus:border-nebula-400 focus:outline-none focus:ring-1 focus:ring-nebula-400 placeholder-nebula-400"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-nebula-100 mb-1">
              What information are you looking for?
            </label>
            <textarea
              id="prompt"
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}
              required
              rows={3}
              placeholder="e.g. Analyze posting frequency, engagement rates, and most successful content types"
              className="w-full rounded-md border border-nebula-600 bg-nebula-800/50 text-nebula-100 py-2 px-3 shadow-sm focus:border-nebula-400 focus:outline-none focus:ring-1 focus:ring-nebula-400 placeholder-nebula-400"
            />
          </div>
          
          <div>
            <label htmlFor="postCount" className="block text-sm font-medium text-nebula-100 mb-1">
              Number of Posts to Analyze
            </label>
            <select
              id="postCount"
              name="postCount"
              value={formData.postCount}
              onChange={handleChange}
              className="w-full rounded-md border border-nebula-600 bg-nebula-800/50 text-nebula-100 py-2 px-3 shadow-sm focus:border-nebula-400 focus:outline-none focus:ring-1 focus:ring-nebula-400"
            >
              <option value="5">Last 5 posts</option>
              <option value="10">Last 10 posts</option>
              <option value="20">Last 20 posts</option>
              <option value="50">Last 50 posts</option>
              <option value="100">Last 100 posts</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-nebula-500 text-nebula-50 py-2 px-4 rounded-md hover:bg-nebula-400 focus:outline-none focus:ring-2 focus:ring-nebula-300 focus:ring-offset-2 focus:ring-offset-nebula-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Scraping Data...
              </>
            ) : (
              <>
                <Search className="mr-2" size={20} />
                Scrape Instagram Data
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="bg-nebula-800/30 backdrop-blur-sm rounded-lg border border-nebula-700/50 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-tr from-nebula-600 to-nebula-200 rounded-full flex items-center justify-center text-nebula-900">
                <Instagram size={32} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-nebula-100">@{scrapedData.username}</h3>
                <p className="text-nebula-300">{scrapedData.followers} followers</p>
              </div>
            </div>
            
            <div className="border-t border-nebula-700/50 pt-4 mt-4">
              <h4 className="font-medium text-nebula-100 mb-3">Recent Posts</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scrapedData.posts.map(post => (
                  <div key={post.id} className="border border-nebula-700/50 rounded-lg overflow-hidden bg-nebula-800/50">
                    <img 
                      src={post.imageUrl} 
                      alt={`Post by ${scrapedData.username}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-3">
                      <p className="text-sm text-nebula-200 line-clamp-2 mb-2">{post.caption}</p>
                      <div className="flex justify-between text-xs text-nebula-300">
                        <span>❤️ {post.likes} likes</span>
                        <span>💬 {post.comments} comments</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t border-nebula-700/50 pt-4 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={18} className="text-nebula-200" />
                <h4 className="font-medium text-nebula-100">AI-Generated Insights</h4>
              </div>
              <ul className="space-y-2">
                {scrapedData.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-nebula-200 font-bold">•</span>
                    <span className="text-nebula-200">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={resetForm}
              className="bg-nebula-500 text-nebula-50 py-2 px-4 rounded-md hover:bg-nebula-400 focus:outline-none focus:ring-2 focus:ring-nebula-300 focus:ring-offset-2 focus:ring-offset-nebula-900 transition-colors"
            >
              Analyze Another Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}