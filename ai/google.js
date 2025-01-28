const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the API with your key
const genAI = new GoogleGenerativeAI("AIzaSyCtrTFezvw9xRIl_K4zYnFPXibMEVgrAVc");

async function runGemini() {
    try {
        // Use Gemini-Pro model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        // Create a chat session
        const chat = model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
            },
        }); 

        // Send a message and get the response
        const result = await chat.sendMessage(` 9,9 hay 9,11 lớn hơn`);
        const response = await result.response;
        console.log("Gemini:", response.text());

    } catch (error) {
        console.error("Error:", error);
    }
}

runGemini();