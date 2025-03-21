
import translate from '@iamtraction/google-translate';
async function translateWord(word, targetLanguage) {
    try {
        // Kiểm tra nếu từ gốc hoặc ngôn ngữ đích không được cung cấp
        if (!word || !targetLanguage) {
            return "Vui lòng cung cấp từ gốc và ngôn ngữ đích!";
        }

        // Dịch từ
        const result = await translate(word, { to: targetLanguage });
        return result.text;
    } catch (error) {
        console.error("Lỗi khi dịch:", error);
        return "Đã xảy ra lỗi khi dịch từ!";
    }
}


const LanguageSwitcher = async (word) => {
    let nationality = "vi"
    const translated = await translateWord(word, nationality);
    return translated;
};

export default LanguageSwitcher;

