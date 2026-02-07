import { NextResponse } from "next/server";

export async function GET() {
    // First API call with reasoning
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "z-ai/glm-4.7-flash",
            "messages": [
                {
                    "role": "user",
                    "content": "How many r's are in the word 'strawberry'?"
                }
            ],
            "reasoning": { "enabled": true }
        })
    });

    // Extract the assistant message with reasoning_details
    const result = await response.json();
    const assistantMessage = result.choices[0].message;

    // Preserve the assistant message with reasoning_details
    const messages = [
        {
            role: 'user',
            content: "How many r's are in the word 'strawberry'?",
        },
        {
            role: 'assistant',
            content: assistantMessage.content,
            reasoning_details: assistantMessage.reasoning_details, // Pass back unmodified
        },
        {
            role: 'user',
            content: "Are you sure? Think carefully.",
        },
    ];

    // Second API call - model continues reasoning from where it left off
    const response2 = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "model": "z-ai/glm-4.7-flash",
            "messages": messages  // Includes preserved reasoning_details
        })
    });

    const result2 = await response2.json();
    return NextResponse.json(result2);
}