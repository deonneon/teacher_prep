const openai = require("openai");

// Initialize OpenAI client
const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiClient = new openai({ apiKey: openaiApiKey });

// Function to generate problems using OpenAI
const generateProblems = async (topic, numberOfProblems) => {
  try {
    const prompt = `Generate ${numberOfProblems} problems on the topic of ${topic}, in the format of a list of objects with 'problem' and 'answer' keys.`;
    const response = await openaiClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            'You are a problem generation assistant. Output problems and answers in JSON format in a "problems" array at the top level. The keys should look like this:\n[{"problem": "Example problem", "answer": "Example answer"}, ...]',
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });
    console.log("full response", response);
    const generatedProblemsSet = response.choices[0].message.content;
    console.log("problem response", generatedProblemsSet);
    const problemsArray = JSON.parse(generatedProblemsSet).problems;
    return problemsArray;
  } catch (error) {
    console.error("Error generating problems:", error);
    throw error;
  }
};

// Netlify Function handler
exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { topic, numberOfProblems } = JSON.parse(event.body);
    const problems = await generateProblems(topic, numberOfProblems);
    return {
      statusCode: 200,
      body: JSON.stringify({ problems }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
