import fetch from "node-fetch";

export const genIntro = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (!process.env.OPENAI_API_KEY1) {
      return res.status(500).json({ error: "API key missing in server" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY1}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are DigiCoders Jarvis AI. Reply smartly." },
          { role: "user", content: prompt }
        ]
      })
    });

    // If API returns non-200 status
    if (!response.ok) {
      const err = await response.json();

      // Rate limit handling
      if (err?.error?.code === "rate_limit_exceeded") {
        return res.status(429).json({
          error: "Rate limit exceeded. Please wait a few seconds and try again."
        });
      }

      return res.status(response.status).json({
        error: err?.error?.message || "OpenAI API error"
      });
    }

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(500).json({ error: "No output received from AI" });
    }

    return res.json({ text });

  } catch (error) {
    console.error("Server Error:", error);

    return res.status(500).json({
      error: "Internal server error. Something went wrong."
    });
  }
};

export const genprojectGoals = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY2) {
      return res.status(500).json({ error: "API key missing in server env" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY2}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are DigiCoders Jarvis AI. Reply smartly." },
          { role: "user", content: prompt }
        ]
      })
    });

    // Handle non-200 AI responses
    if (!response.ok) {
      const err = await response.json();

      // Rate limit specific handling
      if (err?.error?.code === "rate_limit_exceeded") {
        return res.status(429).json({
          error: "Rate limit exceeded. Please wait a few seconds and try again."
        });
      }

      // Other OpenAI errors
      return res.status(response.status).json({
        error: err?.error?.message || "OpenAI API error"
      });
    }

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content;
    if (!text) {
      return res.status(500).json({ error: "No output received from AI" });
    }

    return res.json({ text });

  } catch (error) {
    console.error("Server Error:", error);

    return res.status(500).json({
      error: "Internal server error. Something went wrong."
    });
  }
};

export const gensystemAnalysis = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY3) {
      return res.status(500).json({ error: "API key missing in server env" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY3}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are DigiCoders Jarvis AI. Reply smartly." },
          { role: "user", content: prompt }
        ]
      })
    });

    // Handle non-200 responses
    if (!response.ok) {
      const err = await response.json();

      // Handle rate limit error
      if (err?.error?.code === "rate_limit_exceeded") {
        return res.status(429).json({
          error: "Rate limit exceeded. Please wait a few seconds and try again."
        });
      }

      return res.status(response.status).json({
        error: err?.error?.message || "OpenAI API error"
      });
    }

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content;
    if (!text) {
      return res.status(500).json({ error: "No output received from AI" });
    }

    return res.json({ text });

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: "Internal server error. Something went wrong." });
  }
};

export const gencoreFeatures = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY4) {
      return res.status(500).json({ error: "API key missing in server env" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY4}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are DigiCoders Jarvis AI. Reply smartly." },
          { role: "user", content: prompt }
        ]
      })
    });

    // Handle non-OK responses
    if (!response.ok) {
      const err = await response.json();

      // Specific handling for rate-limit errors
      if (err?.error?.code === "rate_limit_exceeded") {
        return res.status(429).json({
          error: "Rate limit exceeded. Please wait a few seconds and try again."
        });
      }

      return res.status(response.status).json({
        error: err?.error?.message || "OpenAI API error"
      });
    }

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content;
    if (!text) {
      return res.status(500).json({ error: "No output received from AI" });
    }

    return res.json({ text });

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      error: "Internal server error. Something went wrong."
    });
  }
};

export const gensystemArchitecture = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY6) {
      return res.status(500).json({ error: "API key missing in server env" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY6}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are DigiCoders Jarvis AI. Reply smartly." },
          { role: "user", content: prompt }
        ]
      })
    });

    // Handle non-success responses
    if (!response.ok) {
      const err = await response.json();

      // Handle rate-limit errors specially
      if (err?.error?.code === "rate_limit_exceeded") {
        return res.status(429).json({
          error: "Rate limit exceeded. Please wait a few seconds and try again."
        });
      }

      return res.status(response.status).json({
        error: err?.error?.message || "OpenAI API error"
      });
    }

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content;
    if (!text) {
      return res.status(500).json({ error: "No output received from AI" });
    }

    return res.json({ text });

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({
      error: "Internal server error. Something went wrong."
    });
  }
};

export const gensystemDesign = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY7) {
      return res.status(500).json({ error: "API key missing in server env" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY7}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are DigiCoders Jarvis AI. Reply smartly." },
          { role: "user", content: prompt }
        ]
      })
    });

    // If OpenAI returns an error status
    if (!response.ok) {
      const err = await response.json();

      // Special handling for rate limit
      if (err?.error?.code === "rate_limit_exceeded") {
        return res.status(429).json({
          error: "Rate limit exceeded. Please wait a few seconds and try again."
        });
      }

      return res.status(response.status).json({
        error: err?.error?.message || "OpenAI API error"
      });
    }

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content;
    if (!text) {
      return res.status(500).json({ error: "No output received from AI" });
    }

    return res.json({ text });

  } catch (error) {
    console.error("Server Error:", error);

    return res.status(500).json({
      error: "Internal server error. Something went wrong."
    });
  }
};

export const genbackendDesign = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY8) {
      return res.status(500).json({ error: "API key missing in server env" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY8}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are DigiCoders Jarvis AI. Reply smartly." },
          { role: "user", content: prompt }
        ]
      })
    });

    // Handle non-OK AI responses
    if (!response.ok) {
      const err = await response.json();

      // Rate-limit handling
      if (err?.error?.code === "rate_limit_exceeded") {
        return res.status(429).json({
          error: "Rate limit exceeded. Please wait a few seconds and try again."
        });
      }

      return res.status(response.status).json({
        error: err?.error?.message || "OpenAI API error"
      });
    }

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content;
    if (!text) {
      return res.status(500).json({ error: "No output received from AI" });
    }

    return res.json({ text });

  } catch (error) {
    console.error("Server Error:", error);

    return res.status(500).json({
      error: "Internal server error. Something went wrong."
    });
  }
};
export const gendataModeling = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY9) {
      return res.status(500).json({ error: "API key missing in server env" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY9}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are DigiCoders Jarvis AI. Reply smartly." },
          { role: "user", content: prompt }
        ]
      })
    });

    // Handle non-OK AI responses
    if (!response.ok) {
      const err = await response.json();

      // Rate-limit handling
      if (err?.error?.code === "rate_limit_exceeded") {
        return res.status(429).json({
          error: "Rate limit exceeded. Please wait a few seconds and try again."
        });
      }

      return res.status(response.status).json({
        error: err?.error?.message || "OpenAI API error"
      });
    }

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content;
    if (!text) {
      return res.status(500).json({ error: "No output received from AI" });
    }

    return res.json({ text });

  } catch (error) {
    console.error("Server Error:", error);

    return res.status(500).json({
      error: "Internal server error. Something went wrong."
    });
  }
};
export const genconclusion = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY13) {
      return res.status(500).json({ error: "API key missing in server env" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY13}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are DigiCoders Jarvis AI. Reply smartly." },
          { role: "user", content: prompt }
        ]
      })
    });

    // Handle non-OK AI responses
    if (!response.ok) {
      const err = await response.json();

      // Rate-limit handling
      if (err?.error?.code === "rate_limit_exceeded") {
        return res.status(429).json({
          error: "Rate limit exceeded. Please wait a few seconds and try again."
        });
      }

      return res.status(response.status).json({
        error: err?.error?.message || "OpenAI API error"
      });
    }

    const data = await response.json();

    const text = data?.choices?.[0]?.message?.content;
    if (!text) {
      return res.status(500).json({ error: "No output received from AI" });
    }

    return res.json({ text });

  } catch (error) {
    console.error("Server Error:", error);

    return res.status(500).json({
      error: "Internal server error. Something went wrong."
    });
  }
};


