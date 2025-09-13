
import React, { useState } from 'react';
import { SparklesIcon } from '../components/icons';

interface OnboardingProps {
  onComplete: (answers: string[]) => void;
}

const questions = [
  {
    question: "When a disagreement arises, what's your typical approach?",
    options: ["I need space to think before talking.", "I prefer to talk it out immediately.", "I try to find a compromise quickly.", "I tend to avoid the conflict."]
  },
  {
    question: "How do you prefer to receive affection and feel connected?",
    options: ["Words of affirmation and praise.", "Quality time spent together, distraction-free.", "Physical touch like hugs and hand-holding.", "Acts of service, like helping with chores."]
  },
  {
    question: "What is one shared goal you're excited about for the next year?",
    options: ["Going on a big vacation.", "Starting a new hobby together.", "Improving our home.", "Focusing on personal and shared growth."]
  }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Last question answered
      onComplete(newAnswers);
    }
  };
  
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-brand-cream p-6">
      <div>
        <div className="text-center mb-8">
            <SparklesIcon className="w-12 h-12 text-brand-purple mx-auto" />
            <h1 className="mt-2 text-2xl font-bold text-brand-charcoal">A few questions to start...</h1>
            <p className="text-gray-600">This helps us personalize your HeartSync experience.</p>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
            <div className="bg-brand-purple h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-brand-charcoal mb-4">{questions[step].question}</h2>
            <div className="space-y-3">
            {questions[step].options.map((option, index) => (
                <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 bg-brand-cream border border-brand-purple-light rounded-lg hover:bg-brand-purple-light hover:border-brand-purple transition duration-200"
                >
                {option}
                </button>
            ))}
            </div>
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm mt-8">
        Step {step + 1} of {questions.length}
      </div>
    </div>
  );
};

export default Onboarding;