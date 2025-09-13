
import React, { useState, useCallback, useContext } from 'react';
import PageHeader from '../components/PageHeader';
import { analyzeJournal } from '../services/geminiService';
import { AuthContext } from '../contexts/AuthContext';
import type { JournalEntry, WeeklyCheckIn } from '../types';
import Loader from '../components/Loader';
import { SparklesIcon } from '../components/icons';

const mockJournalEntries: JournalEntry[] = [
    { id: '1', author: 'Alex', date: '3 days ago', mood: 'joyful', content: 'Jordan made my favorite dinner tonight, it was such a nice surprise after a long week.' },
    { id: '2', author: 'Jordan', date: '2 days ago', mood: 'anxious', content: 'Feeling a bit disconnected lately. We seem busy and haven\'t had much quality time.' },
    { id: '3', author: 'Alex', date: '1 day ago', mood: 'content', content: 'We had a good chat this morning before work. It felt nice to connect, even for a few minutes.' }
];

const Journal: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [entries, setEntries] = useState<JournalEntry[]>(mockJournalEntries);
    const [checkInResult, setCheckInResult] = useState<WeeklyCheckIn | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheckIn = useCallback(async () => {
        if (!user || entries.length === 0) return;
        setIsLoading(true);
        setError(null);
        setCheckInResult(null);
        try {
            const result = await analyzeJournal(entries, user);
            setCheckInResult(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [entries, user]);
    
    const moodEmoji = {
        joyful: '😊',
        content: '🙂',
        neutral: '😐',
        sad: '😔',
        anxious: '😟'
    };

    return (
        <div>
            <PageHeader title="Shared Journal" subtitle="Reflect together, grow together." />
            <div className="p-6 space-y-6">
                <div className="p-5 bg-brand-purple-light/50 rounded-lg">
                    <h3 className="text-lg font-bold text-brand-charcoal mb-2">Weekly Relationship Check-In</h3>
                    <p className="text-gray-700 mb-4">Analyze your recent entries to uncover patterns and get suggestions for growth.</p>
                     <button
                        onClick={handleCheckIn}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center px-6 py-3 bg-brand-purple-dark text-white font-bold rounded-lg hover:bg-purple-700 transition duration-300 disabled:bg-gray-400"
                     >
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Analyzing...' : 'Start Weekly Check-In'}
                    </button>
                </div>

                {isLoading && <Loader text="Reading your reflections..." />}
                {error && <div className="text-center p-4 bg-red-100 text-brand-error rounded-lg">{error}</div>}
                
                {checkInResult && (
                    <div className="p-5 bg-brand-teal-light/30 border-l-4 border-brand-teal rounded-r-lg space-y-4 animate-fade-in">
                        <div>
                            <h4 className="font-bold text-brand-charcoal">Our Insight:</h4>
                            <p className="text-gray-700">{checkInResult.analysis}</p>
                        </div>
                         <div>
                            <h4 className="font-bold text-brand-charcoal">Micro-Experiments for this week:</h4>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 mt-1">
                                {checkInResult.experiments.map((exp, i) => <li key={i}>{exp}</li>)}
                            </ul>
                        </div>
                    </div>
                )}


                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-brand-charcoal border-b-2 pb-2 border-brand-purple-light">Recent Entries</h3>
                    {entries.map(entry => (
                        <div key={entry.id} className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-bold">{entry.author}</span>
                                <span className="text-sm text-gray-500">{entry.date} {moodEmoji[entry.mood]}</span>
                            </div>
                            <p className="text-gray-600">{entry.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Journal;
