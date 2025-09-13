
import React, { useState, useCallback } from 'react';
import PageHeader from '../components/PageHeader';
import Loader from '../components/Loader';
import { rewriteConflict } from '../services/geminiService';
import { SparklesIcon } from '../components/icons';

const Conflict: React.FC = () => {
  const [conflictDescription, setConflictDescription] = useState('');
  const [rewrittenMessage, setRewrittenMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRewrite = useCallback(async () => {
    if (!conflictDescription.trim()) return;
    setIsLoading(true);
    setError(null);
    setRewrittenMessage('');
    try {
      const result = await rewriteConflict(conflictDescription);
      setRewrittenMessage(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [conflictDescription]);

  return (
    <div>
      <PageHeader
        title="Conflict to Conversation"
        subtitle="Turn arguments into opportunities for connection."
      />
      <div className="p-6 space-y-6">
        <div>
          <label htmlFor="conflict-description" className="block text-md font-semibold text-gray-700 mb-2">
            Describe the situation or what's on your mind:
          </label>
          <textarea
            id="conflict-description"
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:outline-none"
            placeholder="E.g., 'I felt hurt when you were on your phone while I was talking about my day.'"
            value={conflictDescription}
            onChange={(e) => setConflictDescription(e.target.value)}
          />
        </div>
        
        <button
          onClick={handleRewrite}
          disabled={isLoading || !conflictDescription.trim()}
          className="w-full flex items-center justify-center px-6 py-3 bg-brand-purple-dark text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300 disabled:bg-gray-400"
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          {isLoading ? 'Rewriting...' : 'Rewrite with a Soft Start'}
        </button>

        {error && <div className="text-center p-4 bg-red-100 text-brand-error rounded-lg">{error}</div>}
        
        {isLoading && <Loader text="Finding the right words..." />}

        {rewrittenMessage && (
          <div className="p-5 bg-brand-teal-light/30 border-l-4 border-brand-teal rounded-r-lg space-y-3 animate-fade-in">
            <h3 className="text-lg font-bold text-brand-charcoal">Here's a gentle way to start the conversation:</h3>
            <p className="text-gray-700 whitespace-pre-wrap font-serif italic">"{rewrittenMessage}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conflict;
