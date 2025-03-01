import React, { useState } from 'react';
import { Instagram, Search, Loader2, FileText } from 'lucide-react';

export function InstagramScraper() {
  const [formData, setFormData] = useState({
    username: '',
    prompt: '',
    postCount: '5'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState(null);
  const [error, setError] = useState(null);

  // Default Images
  const DEFAULT_PROFILE_IMAGE = "/assets/default_insta_profile.webp";
  const DEFAULT_POST_IMAGE = "https://via.placeholder.com/500";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://novanexus.app.n8n.cloud/webhook/9cc7d5e4-c841-4d5f-a280-3177fc4a9a5f", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: formData.username, prompt: formData.prompt })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Instagram data");
      }

      const tempData = await response.json();
      const data = tempData.output;

      if (!data.profile) {
        throw new Error("Invalid API response structure.");
      }

      setScrapedData({
        profile: {
          username: data.profile.username,
          fullName: data.profile.fullName || "Not Available",
          biography: data.profile.biography || "No bio available",
          followers: data.profile.followers || 0,
          following: data.profile.following || 0,
          postsCount: data.profile.postsCount || 0,
          highlightReels: data.profile.highlightReels || 0,
          profileUrl: data.profile.profileUrl || "#",
          externalUrl: data.profile.externalUrl || "No link available",
          profilePicture: data.profile.profilePicture || DEFAULT_PROFILE_IMAGE
        },
        latestPosts: data.latestPosts?.map((post) => ({
          caption: post.caption,
          url: post.url,
          likes: post.likes || 0,
          comments: post.comments || 0,
          postType: post.postType || "unknown",
          timestamp: post.timestamp || "N/A",
          image: post.image || DEFAULT_POST_IMAGE
        })) || []
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ username: '', prompt: '', postCount: '5' });
    setScrapedData(null);
    setError(null);
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

      {error && <p className="text-red-500">{error}</p>}

      {!scrapedData ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-nebula-100 mb-1">
              Instagram Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="e.g. natgeo"
              className="w-full rounded-md border border-nebula-600 bg-nebula-800/50 text-nebula-100 py-2 px-3 shadow-sm focus:border-nebula-400 focus:outline-none focus:ring-1 focus:ring-nebula-400 placeholder-nebula-400"
            />
          </div>

          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-nebula-100 mb-1">
              What insights do you need?
            </label>
            <textarea
              id="prompt"
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. Analyze and fetch username details"
              className="w-full rounded-md border border-nebula-600 bg-nebula-800/50 text-nebula-100 py-2 px-3 shadow-sm focus:border-nebula-400 focus:outline-none focus:ring-1 focus:ring-nebula-400 placeholder-nebula-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-nebula-500 text-nebula-50 py-2 px-4 rounded-md hover:bg-nebula-400 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="bg-nebula-800/30 rounded-lg border border-nebula-700/50 p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={scrapedData.profile.profilePicture}
                alt={scrapedData.profile.username}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold text-nebula-100">@{scrapedData.profile.username}</h3>
                <p className="text-nebula-300">👥 {scrapedData.profile.followers} followers | 👤 {scrapedData.profile.following} following</p>
              </div>
            </div>

            <p className="text-nebula-200">{scrapedData.profile.biography}</p>

            <div className="border-t border-nebula-700/50 pt-4 mt-4">
              <h4 className="font-medium text-nebula-100 mb-3">Latest Posts</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scrapedData.latestPosts.map((post, index) => (
                  <div key={index} className="border border-nebula-700/50 rounded-lg overflow-hidden bg-nebula-800/50">
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      <img 
                        src={post.image} 
                        alt={`Post by ${scrapedData.profile.username}`}
                        className="w-full h-48 object-cover"
                      />
                      <p className="text-sm text-nebula-200 p-2">{post.caption}</p>
                      <p className="text-xs text-nebula-300 px-2 pb-2">💬 {post.comments} comments | ❤️ {post.likes} likes</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={resetForm}
              className="bg-nebula-500 text-nebula-50 py-2 px-4 rounded-md hover:bg-nebula-400 transition-colors"
            >
              Analyze Another Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
