
import React, { useState, useCallback, useContext, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import Loader from '../components/Loader';
import { generateDailyRituals } from '../services/geminiService';
import type { DailyRitual, User } from '../types';
import { AuthContext, mockUser } from '../contexts/AuthContext';
import { SparklesIcon } from '../components/icons';

const RitualCard: React.FC<{ title: string; content: string; icon: React.ReactNode }> = ({ title, content, icon }) => (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-brand-purple-light flex items-center justify-center mr-3 text-brand-purple-dark">
                {icon}
            </div>
            <h3 className="text-lg font-bold text-brand-charcoal">{title}</h3>
        </div>
        <p className="text-gray-600 leading-relaxed">{content}</p>
    </div>
);

interface DashboardProps {
    previewProfile?: User['profile'] | null;
    onSignUp?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ previewProfile, onSignUp }) => {
    const { user: authUser } = useContext(AuthContext);
    const isPreview = !!previewProfile;

    // The user object is either the authenticated user or a temporary one for the preview.
    const user = isPreview && previewProfile ? { ...mockUser, name: 'there', partnerName: 'your partner', profile: previewProfile } : authUser;

    const [rituals, setRituals] = useState<DailyRitual | null>(null);
    const [isLoading, setIsLoading] = useState(isPreview); // Start loading immediately in preview
    const [error, setError] = useState<string | null>(null);

    const handleGenerateRituals = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateDailyRituals(user as User);
            setRituals(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (isPreview) {
            handleGenerateRituals();
        }
    }, [isPreview, handleGenerateRituals]);

    return (
        <div>
            <PageHeader title={`Hi, ${user?.name}!`} subtitle="Your daily connection rituals." />
            <div className="p-6 space-y-6 bg-brand-cream/50">
                {!rituals && !isLoading && !isPreview && (
                    <div className="text-center p-8 bg-white rounded-xl shadow-md">
                        <h2 className="text-xl font-bold text-brand-charcoal">Ready to connect?</h2>
                        <p className="text-gray-600 my-4">Generate your personalized rituals for today to deepen your bond with {user?.partnerName}.</p>
                        <button
                            onClick={handleGenerateRituals}
                            className="inline-flex items-center justify-center px-6 py-3 bg-brand-purple-dark text-white font-bold rounded-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
                        >
                            <SparklesIcon className="w-5 h-5 mr-2" />
                            Generate Today's Rituals
                        </button>
                    </div>
                )}

                {isLoading && <Loader text="Crafting your rituals..." />}
                
                {error && <div className="text-center p-4 bg-red-100 text-brand-error rounded-lg">{error}</div>}

                {rituals && (
                    <div className="space-y-4 animate-fade-in">
                        <RitualCard title="Conversation Starter" content={rituals.conversationStarter} icon={<span className="text-xl">💬</span>} />
                        <RitualCard title="Appreciation Prompt" content={rituals.appreciationMessage} icon={<span className="text-xl">💖</span>} />
                        <RitualCard title="Shared Activity" content={rituals.sharedActivity} icon={<span className="text-xl">🤝</span>} />
                        
                        {isPreview && onSignUp ? (
                             <div className="pt-6 text-center border-t-2 border-brand-purple-light mt-6">
                                <h3 className="text-xl font-bold text-brand-charcoal">Like what you see?</h3>
                                <p className="text-gray-600 my-3">Sign up for free to save your progress, get daily reminders, and unlock all features to build a stronger bond.</p>
                                <button
                                    onClick={onSignUp}
                                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-brand-purple-dark text-white font-bold rounded-lg hover:bg-purple-700 transition-transform transform hover:scale-105"
                                >
                                    Create Your Account & Continue
                                </button>
                            </div>
                        ) : (
                            <div className="pt-4 text-center">
                                <button
                                    onClick={handleGenerateRituals}
                                    disabled={isLoading}
                                    className="px-5 py-2 bg-white border border-brand-purple text-brand-purple-dark font-semibold rounded-lg hover:bg-brand-purple-light disabled:opacity-50"
                                >
                                    {isLoading ? 'Generating...' : 'Generate New Rituals'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
