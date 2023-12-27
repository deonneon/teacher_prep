const express = require('express');
const cors = require('cors');
const openai = require('openai');

require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

const openaiClient = new openai({ apiKey: openaiApiKey });

const generateProblems = async (topic, numberOfProblems) => {
  try {
    const response = await openaiClient.chat.completions.create({
      messages: [
        {
          "role": "system",
          "content": "You are a problem generation assistant designed to output structured JSON in the format:\n[{ \"problem\": \"get problem\", \"answer\": \"get answer\" }]"
        },
        {
          role: 'user',
          content: `Generate ${numberOfProblems} problems on the topic of ${topic}.`,
        },        
      ],
      model: 'gpt-3.5-turbo-1106', // Use the appropriate GPT-3 model
      response_format: { type: "json_object" },
      //max_tokens: 150, // Adjust as needed
    });
    console.log(response.choices[0])
    const generatedProblemsSet = response.choices[0].message.content;
    console.log(generatedProblemsSet)
    const problemsArray = JSON.parse(generatedProblemsSet).problems; // Extract the problems array
    console.log(problemsArray)
    return problemsArray;
  } catch (error) {
    console.error('Error generating problems:', error);
    throw error;
  }
};

// Add a new endpoint for generating problems
app.post('/generate-problems', async (req, res) => {
  const { topic, numberOfProblems } = req.body;

  try {
    const problems = await generateProblems(topic, numberOfProblems);
    res.json({ choices: [{ text: JSON.stringify({ problems }) }] }); // Return the response in the expected format
  } catch (error) {
    res.status(500).json({ error: 'Error generating problems' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
