import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('Gemini API key not found. AI features will be disabled.');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const geminiModel = genAI?.getGenerativeModel({ 
  model: 'gemini-1.5-flash-latest' 
});

// API制限チェック用の状態管理
let isApiOverloaded = false;
let lastOverloadTime = 0;
const OVERLOAD_COOLDOWN = 60000; // 1分間のクールダウン

// APIの状態をチェック
const checkApiStatus = () => {
  const now = Date.now();
  if (isApiOverloaded && (now - lastOverloadTime) > OVERLOAD_COOLDOWN) {
    isApiOverloaded = false;
    console.log('🔄 API制限のクールダウンが終了しました');
  }
  return !isApiOverloaded;
};

// エラーハンドリングを強化した共通関数
const handleApiError = (error: any, operation: string) => {
  console.error(`❌ Error in ${operation}:`, error);
  
  if (error.message?.includes('503') || error.message?.includes('overloaded')) {
    isApiOverloaded = true;
    lastOverloadTime = Date.now();
    console.warn('🚫 Gemini API が過負荷状態です。1分後に再試行してください。');
    throw new Error('API_OVERLOADED');
  } else if (error.message?.includes('429')) {
    console.warn('⚡ API使用制限に達しました。しばらく待ってから再試行してください。');
    throw new Error('RATE_LIMITED');
  } else if (error.message?.includes('API key')) {
    console.warn('🔑 API key の問題があります。');
    throw new Error('API_KEY_INVALID');
  }
  
  throw new Error('API_ERROR');
};

// AI機能のヘルパー関数
export const aiService = {
  // メモを要約する
  async summarizeNote(content: string): Promise<string> {
    if (!geminiModel || !checkApiStatus()) {
      throw new Error('Gemini API is not available');
    }

    const prompt = `Please summarize the following note in 2-3 sentences. Focus on the key points and main ideas:\n\n${content}`;
    
    try {
      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      handleApiError(error, 'summarizing note');
      return ''; // 型エラー修正: フォールバック値を返す
    }
  },

  // メモからタグを生成する
  async generateTags(content: string): Promise<string[]> {
    if (!geminiModel || !checkApiStatus()) {
      throw new Error('Gemini API is not available');
    }

    const prompt = `Generate 3-5 relevant tags for the following note content. Return only the tags as a comma-separated list:\n\n${content}`;
    
    try {
      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      const tagsText = response.text();
      return tagsText.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    } catch (error) {
      handleApiError(error, 'generating tags');
      return [];
    }
  },

  // メモを改善する提案
  async improveNote(content: string): Promise<string> {
    if (!geminiModel || !checkApiStatus()) {
      throw new Error('Gemini API is not available');
    }

    const prompt = `Please suggest improvements for the following note. Provide specific suggestions for clarity, organization, and completeness:\n\n${content}`;
    
    try {
      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      handleApiError(error, 'improving note');
      return ''; // 型エラー修正: フォールバック値を返す
    }
  },

  // メモからマインドマップのノードを生成
  async generateMindMapNodes(content: string): Promise<any[]> {
    if (!geminiModel || !checkApiStatus()) {
      throw new Error('Gemini API is not available');
    }

    const prompt = `Based on the following note content, generate a mind map structure. Return a JSON array of nodes with "id", "label", and "children" properties. Keep it hierarchical and logical:\n\n${content}`;
    
    try {
      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      const jsonText = response.text();
      
      // JSON部分を抽出（AIがマークダウンで返す場合に対応）
      const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // フォールバック：シンプルな構造を返す
      return [
        { id: '1', label: 'Main Topic', children: [] },
        { id: '2', label: 'Key Points', children: [] }
      ];
    } catch (error) {
      handleApiError(error, 'generating mind map');
      return [
        { id: '1', label: 'Main Topic', children: [] },
        { id: '2', label: 'Key Points', children: [] }
      ];
    }
  },

  // チャットボット応答
  async chatResponse(message: string, context?: string): Promise<string> {
    console.log('🤖 Gemini chatResponse called with message length:', message.length);
    console.log('🤖 Message preview:', message.substring(0, 100) + '...');
    
    if (!geminiModel) {
      console.error('❌ Gemini API is not configured');
      throw new Error('GEMINI_NOT_CONFIGURED');
    }

    if (!checkApiStatus()) {
      console.warn('⚠️ API is currently overloaded, skipping request');
      throw new Error('API_OVERLOADED');
    }

    const prompt = context 
      ? `Based on this note context: "${context}"\n\nUser asks: ${message}\n\nProvide a helpful response:`
      : `User asks: ${message}\n\nProvide a helpful response:`;
    
    console.log('📤 Sending to Gemini API...');
    
    try {
      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();
      
      console.log('📥 Gemini API response received, length:', responseText.length);
      console.log('📥 Response preview:', responseText.substring(0, 100) + '...');
      
      return responseText;
    } catch (error) {
      handleApiError(error, 'generating chat response');
      return ''; // 型エラー修正: フォールバック値を返す
    }
  },

  // アイデアを深める（新機能）
  async deepenIdea(title: string, content: string): Promise<string> {
    if (!geminiModel || !checkApiStatus()) {
      throw new Error('Gemini API is not available');
    }

    const noteContent = content || title;
    const prompt = `このアイデアを深めるのを手伝ってください：

タイトル: ${title}
内容: ${noteContent}

以下の観点から具体的な提案をしてください：
1. このアイデアの可能性や応用例
2. 関連する概念や分野
3. 実装・実現に向けた具体的なステップ
4. 潜在的な課題や注意点
5. さらに探求すべき方向性

日本語で、建設的で実用的なアドバイスをお願いします。`;
    
    try {
      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      handleApiError(error, 'deepening idea');
      return ''; // 型エラー修正: フォールバック値を返す
    }
  }
};

// AI機能が利用可能かチェック
export const isAIEnabled = (): boolean => {
  return !!geminiModel && checkApiStatus();
};

// API状態の詳細情報を取得
export const getApiStatus = () => {
  return {
    hasApiKey: !!apiKey,
    hasModel: !!geminiModel,
    isOverloaded: isApiOverloaded,
    isAvailable: isAIEnabled(),
    cooldownRemaining: isApiOverloaded ? Math.max(0, OVERLOAD_COOLDOWN - (Date.now() - lastOverloadTime)) : 0
  };
}; 