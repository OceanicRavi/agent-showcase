import React, { useState } from 'react';
import { FileText, BarChart2, Loader2, Zap, Clock, Smile, AlertTriangle } from 'lucide-react';

interface AnalysisResult {
  sentiment: {
    score: number;
    label: 'positive' | 'neutral' | 'negative';
  };
  readability: {
    score: number;
    level: string;
    readingTime: string;
  };
  keyPhrases: string[];
  entities: {
    text: string;
    type: string;
  }[];
  summary: string;
  warnings: string[];
}

export function TextAnalyzer() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  
  const analyzeText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const sentimentScore = Math.random() * 2 - 1; // Between -1 and 1
      let sentimentLabel: 'positive' | 'neutral' | 'negative' = 'neutral';
      
      if (sentimentScore > 0.3) sentimentLabel = 'positive';
      else if (sentimentScore < -0.3) sentimentLabel = 'negative';
      
      setResult({
        sentiment: {
          score: parseFloat(sentimentScore.toFixed(2)),
          label: sentimentLabel
        },
        readability: {
          score: Math.floor(Math.random() * 100),
          level: ['Elementary', 'Middle School', 'High School', 'College', 'Graduate'][Math.floor(Math.random() * 5)],
          readingTime: `${Math.ceil(text.split(' ').length / 200)} min`
        },
        keyPhrases: [
          'artificial intelligence',
          'data analysis',
          'natural language processing',
          'machine learning models',
          'text analytics'
        ],
        entities: [
          { text: 'Google', type: 'Organization' },
          { text: 'OpenAI', type: 'Organization' },
          { text: 'GPT-4', type: 'Product' },
          { text: 'United States', type: 'Location' }
        ],
        summary: text.length > 200 
          ? text.substring(0, 200) + '...' 
          : text,
        warnings: text.length < 100 
          ? ['Text is too short for comprehensive analysis'] 
          : []
      });
      
      setIsAnalyzing(false);
    }, 2000);
  };
  
  const resetAnalysis = () => {
    setText('');
    setResult(null);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-nebula-200" size={24} />
        <h2 className="text-2xl font-bold text-nebula-50">Text Analysis</h2>
      </div>
      
      <p className="text-nebula-200 mb-6">
        Analyze text to extract insights, sentiment, readability metrics, and key information.
      </p>
      
      <form onSubmit={analyzeText} className="space-y-6">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-nebula-100 mb-1">
            Paste your text below
          </label>
          <textarea
            id="text"
            value={text}
            onChange={handleTextChange}
            disabled={isAnalyzing || result !== null}
            rows={8}
            placeholder="Enter or paste text to analyze..."
            className="w-full rounded-md border border-nebula-600 bg-nebula-800/50 text-nebula-100 py-2 px-3 shadow-sm focus:border-nebula-400 focus:outline-none focus:ring-1 focus:ring-nebula-400 disabled:opacity-70 disabled:bg-nebula-800/70 placeholder-nebula-400"
          />
        </div>
        
        {!result ? (
          <button
            type="submit"
            disabled={!text.trim() || isAnalyzing}
            className="w-full bg-nebula-500 text-nebula-50 py-2 px-4 rounded-md hover:bg-nebula-400 focus:outline-none focus:ring-2 focus:ring-nebula-300 focus:ring-offset-2 focus:ring-offset-nebula-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Analyzing Text...
              </>
            ) : (
              <>
                <Zap className="mr-2" size={20} />
                Analyze Text
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={resetAnalysis}
            className="w-full bg-nebula-800 text-nebula-200 border border-nebula-600 py-2 px-4 rounded-md hover:bg-nebula-700 focus:outline-none focus:ring-2 focus:ring-nebula-400 focus:ring-offset-2 focus:ring-offset-nebula-900 transition-colors"
          >
            Analyze New Text
          </button>
        )}
      </form>
      
      {result && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`rounded-lg p-4 ${
              result.sentiment.label === 'positive' ? 'bg-nebula-700/30 border border-nebula-300/30' :
              result.sentiment.label === 'negative' ? 'bg-red-900/30 border border-red-400/30' :
              'bg-nebula-800/30 border border-nebula-600/30'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Smile className={`${
                  result.sentiment.label === 'positive' ? 'text-nebula-200' :
                  result.sentiment.label === 'negative' ? 'text-red-300' :
                  'text-nebula-300'
                }`} size={20} />
                <h3 className="font-medium text-nebula-100">Sentiment</h3>
              </div>
              <p className="text-2xl font-bold mb-1 capitalize text-nebula-100">{result.sentiment.label}</p>
              <p className="text-sm text-nebula-300">Score: {result.sentiment.score}</p>
            </div>
            
            <div className="bg-nebula-700/30 border border-nebula-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart2 className="text-nebula-200" size={20} />
                <h3 className="font-medium text-nebula-100">Readability</h3>
              </div>
              <p className="text-2xl font-bold mb-1 text-nebula-100">{result.readability.score}/100</p>
              <p className="text-sm text-nebula-300">{result.readability.level} level</p>
            </div>
            
            <div className="bg-nebula-600/20 border border-nebula-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-nebula-200" size={20} />
                <h3 className="font-medium text-nebula-100">Reading Time</h3>
              </div>
              <p className="text-2xl font-bold mb-1 text-nebula-100">{result.readability.readingTime}</p>
              <p className="text-sm text-nebula-300">Approx. reading time</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-nebula-800/30 border border-nebula-700/50 rounded-lg p-4">
              <h3 className="font-medium text-nebula-100 mb-3">Key Phrases</h3>
              <div className="flex flex-wrap gap-2">
                {result.keyPhrases.map((phrase, index) => (
                  <span 
                    key={index} 
                    className="bg-nebula-700/50 text-nebula-200 text-xs font-medium px-2.5 py-0.5 rounded"
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-nebula-800/30 border border-nebula-700/50 rounded-lg p-4">
              <h3 className="font-medium text-nebula-100 mb-3">Entities</h3>
              <div className="space-y-2">
                {result.entities.map((entity, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-nebula-200">{entity.text}</span>
                    <span className="bg-nebula-700/50 text-nebula-300 text-xs font-medium px-2.5 py-0.5 rounded">
                      {entity.type}
                    </span>
                  </div>
                 ))}
              </div>
            </div>
          </div>
          
          <div className="bg-nebula-800/30 border border-nebula-700/50 rounded-lg p-4">
            <h3 className="font-medium text-nebula-100 mb-3">Summary</h3>
            <p className="text-nebula-200">{result.summary}</p>
          </div>
          
          {result.warnings.length > 0 && (
            <div className="bg-yellow-900/30 border border-yellow-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="text-yellow-300" size={20} />
                <h3 className="font-medium text-nebula-100">Warnings</h3>
              </div>
              <ul className="space-y-1">
                {result.warnings.map((warning, index) => (
                  <li key={index} className="text-nebula-200">{warning}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}