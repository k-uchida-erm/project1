// GeminiとOpenAIの両方をサポート
import { aiService as geminiService } from './gemini';
import { openaiService } from './openai';

const useOpenAI = !!import.meta.env.VITE_OPENAI_API_KEY;
const aiService = useOpenAI ? openaiService : geminiService;

export interface TitleGenerationResult {
  title: string;
  error?: string;
}

/**
 * メモの内容からAIが適切なタイトルを生成する
 * @param content メモの本文内容
 * @returns 生成されたタイトル
 */
export async function generateTitleFromContent(content: string): Promise<TitleGenerationResult> {
  console.log('🎯 Title generation started for content:', content.substring(0, 50) + '...');
  
  try {
    // 内容が空の場合はデフォルトタイトル
    if (!content || content.trim() === '') {
      console.log('⚠️ Content is empty, using default title');
      return {
        title: 'メモ',
        error: 'Content is empty'
      };
    }

    // 内容が極端に短い場合（10文字以下）はそのまま使用
    if (content.trim().length <= 10) {
      console.log('📝 Content is very short, using content as title:', content.trim());
      return {
        title: content.trim().substring(0, 20)
      };
    }

    // 内容が短い場合（20文字以下）も直接使用してAPI呼び出しを回避
    if (content.trim().length <= 20) {
      console.log('📝 Content is short, using content as title:', content.trim());
      return {
        title: content.trim()
      };
    }

    // それ以外はAIを使ってタイトル生成
    console.log('🤖 Calling AI to generate title...');
    const prompt = `以下のメモ内容から、簡潔で適切なタイトルを1つ生成してください。
要件:
- 20文字以内
- 内容の核心を表現
- 読みやすく自然な日本語
- タイトルのみを出力（説明や前置きは不要）

メモ内容:
${content.trim()}`;

    // タイムアウト処理を5秒に短縮（より積極的なフォールバック）
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('AI title generation timeout')), 5000); // 5秒でタイムアウト
    });

    const generatedTitle = await Promise.race([
      aiService.chatResponse(prompt),
      timeoutPromise
    ]);
    
    console.log('🤖 AI generated raw title:', generatedTitle);
    
    // 生成されたタイトルをクリーンアップ
    const cleanTitle = generatedTitle
      .replace(/^[「『"']*/, '') // 開始の引用符を削除
      .replace(/[」』"']*$/, '') // 終了の引用符を削除
      .replace(/^タイトル[:：]\s*/, '') // "タイトル:" プレフィックスを削除
      .replace(/^\d+\.\s*/, '') // 番号付きリストのプレフィックスを削除
      .trim();

    console.log('✨ Cleaned title:', cleanTitle);

    // タイトルが長すぎる場合は切り詰める
    const finalTitle = cleanTitle.length > 20 ? cleanTitle.substring(0, 20) + '...' : cleanTitle;
    
    console.log('✅ Final title:', finalTitle);

    return {
      title: finalTitle || 'メモ' // フォールバック
    };

  } catch (error) {
    console.error('❌ Error generating title:', error);
    
    // エラー時のフォールバック：内容の最初の部分を使用
    const fallbackTitle = content.trim().substring(0, 20);
    console.log('🔄 Using fallback title:', fallbackTitle);
    
    return {
      title: fallbackTitle || 'メモ',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * 複数のメモ内容からバッチでタイトルを生成する
 * @param contents メモ内容の配列
 * @returns 生成されたタイトルの配列
 */
export async function generateTitlesFromContents(contents: string[]): Promise<TitleGenerationResult[]> {
  const results: TitleGenerationResult[] = [];
  
  for (const content of contents) {
    const result = await generateTitleFromContent(content);
    results.push(result);
  }
  
  return results;
} 