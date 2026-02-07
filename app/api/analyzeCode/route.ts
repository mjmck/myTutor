import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey?.trim()) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY is not set. Add it to .env.local." },
        { status: 502 }
      );
    }

    const { code } = await request.json();
    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'code' in request body." },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": siteUrl,
        "X-Title": "AI Code Refactor Tool",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "z-ai/glm-4.5-air:free",
        messages: [
          {
            role: "user",
            content: `Analyze this code and suggest concise refactors or improvements.

Return a single JSON object with exactly two keys:
1. "suggestions": a string (markdown) with clear, actionable suggestions only.
2. "resources": an array of 1–3 objects, each with "title" and "url", linking to official docs or articles that help understand the concepts behind your suggestions (e.g. MDN, React docs, language specs). Use real, working URLs.

Example shape:
{"suggestions": "## Summary\\n...", "resources": [{"title": "MDN: Array.prototype.map", "url": "https://developer.mozilla.org/..."}, ...]}

Code to analyze:
\`\`\`
${code}
\`\`\``,
          },
        ],
      }),
    });

    const bodyText = await response.text();
    if (!response.ok) {
      let details = bodyText;
      try {
        const parsed = JSON.parse(bodyText);
        details = parsed.error?.message ?? parsed.message ?? bodyText;
      } catch {
        // use raw text
      }
      return NextResponse.json(
        { error: "OpenRouter request failed", details, status: response.status },
        { status: 502 }
      );
    }

    let result: { choices?: Array<{ message?: { content?: string } }> };
    try {
      result = JSON.parse(bodyText);
    } catch {
      return NextResponse.json(
        { error: "Invalid response from AI provider." },
        { status: 502 }
      );
    }
    const rawContent = result.choices?.[0]?.message?.content ?? "";
    let suggestions = "No suggestions returned.";
    let resources: { title: string; url: string }[] = [];

    try {
      const cleaned = rawContent.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
      const parsed = JSON.parse(cleaned);
      if (typeof parsed.suggestions === "string") suggestions = parsed.suggestions;
      if (Array.isArray(parsed.resources)) {
        resources = parsed.resources
          .filter((r: unknown) => r && typeof r === "object" && "title" in r && "url" in r)
          .map((r: { title: string; url: string }) => ({ title: String(r.title), url: String(r.url) }));
      }
    } catch {
      suggestions = rawContent;
    }

    return NextResponse.json({ suggestions, resources });
  } catch (error) {
    console.error("analyzeCode error:", error);
    return NextResponse.json(
      { error: "Error analyzing code." },
      { status: 500 }
    );
  }
}
