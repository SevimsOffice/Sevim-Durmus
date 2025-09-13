
import { GoogleGenAI, Type } from "@google/genai";
import type { User, JournalEntry } from '../types';

if (!process.env.API_KEY) {
  // This is a placeholder for development.
  // In a real build, this environment variable should be set.
  process.env.API_KEY = "YOUR_API_KEY_HERE";
  console.warn("API_KEY is not set. Using a placeholder. Please set your API key in an .env file for a real build.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const model = 'gemini-2.5-flash';

export const generateDailyRituals = async (user: User): Promise<any> => {
  const prompt = `
    Based on the following couple's profile, generate a daily connection ritual set with 3 items: a conversation starter, an appreciation message prompt for one partner to send to the other, and a small shared activity.

    Couple's Profile:
    - Communication Style: ${user.profile.communicationStyle}
    - Attachment Type: ${user.profile.attachmentType}
    - Shared Goals: ${user.profile.sharedGoals.join(', ')}

    The tone should be warm, supportive, and insightful. The items should be simple and achievable in a short amount of time.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            conversationStarter: {
              type: Type.STRING,
              description: "A thought-provoking question to start a meaningful conversation.",
            },
            appreciationMessage: {
              type: Type.STRING,
              description: `A prompt for ${user.name} to express appreciation for ${user.partnerName}.`,
            },
            sharedActivity: {
              type: Type.STRING,
              description: "A small, simple activity the couple can do together.",
            },
          },
        },
      },
    });
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error generating daily rituals:", error);
    throw new Error("Failed to generate daily rituals. Please try again.");
  }
};

export const rewriteConflict = async (conflictDescription: string): Promise<string> => {
  const prompt = `
    You are a compassionate relationship coach. A user is describing a recent conflict. Your task is to rewrite their description into a calm, "soft-startup" message using "I" statements. The rewritten message should clearly state the user's feelings and needs without blaming their partner, and suggest a clear, positive next step for a conversation.

    User's description of conflict: "${conflictDescription}"

    Rewrite this into a constructive conversation starter.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error rewriting conflict:", error);
    throw new Error("Failed to rewrite the message. Please try again.");
  }
};

export const analyzeJournal = async (entries: JournalEntry[], user: User): Promise<any> => {
  const prompt = `
    You are a relationship wellness analyst. Analyze the following journal entries from a couple (${user.name} and ${user.partnerName}) to identify recurring themes, emotional patterns, and potential areas for growth. Based on your analysis, suggest two specific, actionable "micro-experiments" they can try this week to strengthen their bond.

    Recent Journal Entries:
    ${entries.map(e => `- ${e.date} (${e.author}, Mood: ${e.mood}): ${e.content}`).join('\n')}

    Your analysis should be gentle and insightful. The micro-experiments should be small, positive actions.
  `;
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.STRING,
              description: "A brief, insightful analysis of the journal entries."
            },
            experiments: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING
              },
              description: "Two actionable micro-experiments for the couple."
            }
          }
        }
      }
    });
    const jsonStr = response.text.trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error analyzing journal:", error);
    throw new Error("Failed to analyze journal entries. Please try again.");
  }
};

export const explainConcept = async (conceptTitle: string): Promise<string> => {
  const prompt = `
    Explain the relationship concept "${conceptTitle}" in a simple, easy-to-understand way for a layperson. Provide a brief definition, explain why it's important in a relationship, and give a short, realistic example of it in action (both a negative and a positive example, if applicable). Keep the total explanation to about 3-4 paragraphs.
  `;
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error explaining concept:", error);
    throw new Error("Failed to load explanation. Please try again.");
  }
};
