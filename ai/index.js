const groq_apikey = "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"
const Groq = require("groq-sdk");
const groq = new Groq({
    apiKey: groq_apikey,
});

async function main() {
    const chatCompletion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `bạn hãy cho tôi 1 setup vào lệnh sử dụng smart money concept`
            }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.1,
        max_tokens: 1024,
        top_p: 1,
        stop: null,
        stream: false
    });

    console.log(chatCompletion.choices[0]?.message?.content || "");
}

main().catch(console.error);
