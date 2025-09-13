
import React, { useState, useCallback } from 'react';
import PageHeader from '../components/PageHeader';
import { explainConcept } from '../services/geminiService';
import type { LibraryConcept } from '../types';
import Loader from '../components/Loader';

const concepts: LibraryConcept[] = [
    { id: 'gottman', title: "Gottman's Four Horsemen", category: 'Conflict' },
    { id: 'attachment', title: "Attachment Theory", category: 'Connection' },
    { id: 'active-constructive', title: "Active Constructive Responding", category: 'Communication' },
    { id: 'love-languages', title: "The 5 Love Languages", category: 'Affection' },
    { id: 'harvard-study', title: "Harvard Adult Development Study", category: 'Long-Term Health' },
];

const Library: React.FC = () => {
    const [selectedConcept, setSelectedConcept] = useState<LibraryConcept | null>(null);
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSelectConcept = useCallback(async (concept: LibraryConcept) => {
        if (selectedConcept?.id === concept.id) {
            setSelectedConcept(null);
            setExplanation('');
            return;
        }
        setSelectedConcept(concept);
        setIsLoading(true);
        setError(null);
        setExplanation('');
        try {
            const result = await explainConcept(concept.title);
            setExplanation(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [selectedConcept]);

    return (
        <div>
            <PageHeader title="Role-Model Library" subtitle="Learn the science and art of great relationships." />
            <div className="p-6 space-y-4">
                {concepts.map(concept => (
                    <div key={concept.id}>
                        <button
                            onClick={() => handleSelectConcept(concept)}
                            className="w-full text-left p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-xs font-semibold uppercase text-brand-purple">{concept.category}</p>
                                    <h3 className="text-lg font-bold text-brand-charcoal">{concept.title}</h3>
                                </div>
                                <span className={`transform transition-transform duration-300 ${selectedConcept?.id === concept.id ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </div>
                        </button>
                        {selectedConcept?.id === concept.id && (
                             <div className="mt-2 p-5 bg-brand-cream rounded-b-lg">
                                {isLoading && <Loader text="Loading explanation..." />}
                                {error && <div className="text-center p-4 bg-red-100 text-brand-error rounded-lg">{error}</div>}
                                {explanation && <p className="text-gray-700 whitespace-pre-wrap">{explanation}</p>}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Library;
