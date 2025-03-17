const axios = require('axios');

// Thay YOUR_API_KEY bằng key API thực tế của bạn từ OpenRouter
const API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function getChatResponse(prompt) {
    try {
        const response = await axios.post(
            OPENROUTER_API_URL,
            {
                model: 'anthropic/claude-3.7-sonnet:beta', // Có thể thay bằng model khác
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1000,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost', // Thay bằng URL của bạn
                    'X-Title': 'My Node.js App' // Tên ứng dụng của bạn
                }
            }
        );

        // Lấy nội dung trả về từ response
        const reply = response.data.choices[0].message.content;
        return reply;

    } catch (error) {
        console.error('Error calling OpenRouter API:', error.response?.data || error.message);
        throw error;
    }
}

// Ví dụ sử dụng
async function main() {
    try {
        const prompt = 'write a Python program that shows a ball bouncing inside a spinning hexagon. The ball should be affected by gravity and friction, and it must bounce off the rotating walls realistically';
        const response = await getChatResponse(prompt);
        console.log('Response from OpenRouter:', response);
    } catch (error) {
        console.error('Error in main:', error);
    }
}

main();