import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.warn('OpenAI API key not found. AI features will be disabled.');
}

const openai = apiKey ? new OpenAI({ apiKey, dangerouslyAllowBrowser: true }) : undefined;

const MODEL = 'gpt-4o';
const MAX_TOKENS = 2048;

// API制限チェック用の状態管理
let isApiOverloaded = false;
let lastOverloadTime = 0;
const OVERLOAD_COOLDOWN = 60000; // 1分間のクールダウン

const checkApiStatus = () => {
  const now = Date.now();
  if (isApiOverloaded && (now - lastOverloadTime) > OVERLOAD_COOLDOWN) {
    isApiOverloaded = false;
    console.log('🔄 OpenAI API制限のクールダウンが終了しました');
  }
  return !isApiOverloaded;
};

const handleApiError = (error: any, operation: string) => {
  console.error(`❌ Error in ${operation}:`, error);
  const msg = error?.response?.data?.error?.message || error.message || String(error);
  if (msg.includes('overloaded') || msg.includes('503')) {
    isApiOverloaded = true;
    lastOverloadTime = Date.now();
    throw new Error('API_OVERLOADED');
  } else if (msg.includes('429')) {
    throw new Error('RATE_LIMITED');
  } else if (msg.includes('API key') || msg.includes('Unauthorized')) {
    throw new Error('API_KEY_INVALID');
  }
  throw new Error('API_ERROR');
};

export const openaiService = {
  async summarizeNote(content: string): Promise<string> {
    if (!openai || !checkApiStatus()) throw new Error('OpenAI API is not available');
    const prompt = `以下のメモを2-3文で要約してください。重要なポイントと主旨に集中してください。\n\n${content}`;
    try {
      const res = await openai.chat.completions.create({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 256,
        temperature: 0.5,
      });
      return res.choices[0].message?.content?.trim() || '';
    } catch (error) {
      handleApiError(error, 'summarizing note');
      return '';
    }
  },
  async generateTags(content: string): Promise<string[]> {
    if (!openai || !checkApiStatus()) throw new Error('OpenAI API is not available');
    const prompt = `次のメモ内容に関連するタグを3-5個生成してください。タグのみカンマ区切りで返してください。\n\n${content}`;
    try {
      const res = await openai.chat.completions.create({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 64,
        temperature: 0.5,
      });
      const tagsText = res.choices[0].message?.content || '';
      return tagsText.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0);
    } catch (error) {
      handleApiError(error, 'generating tags');
      return [];
    }
  },
  async improveNote(content: string): Promise<string> {
    if (!openai || !checkApiStatus()) throw new Error('OpenAI API is not available');
    const prompt = `次のメモの改善点を提案してください。明確さ、構成、完全性について具体的な提案をお願いします。\n\n${content}`;
    try {
      const res = await openai.chat.completions.create({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 256,
        temperature: 0.7,
      });
      return res.choices[0].message?.content?.trim() || '';
    } catch (error) {
      handleApiError(error, 'improving note');
      return '';
    }
  },
  async generateMindMapNodes(content: string): Promise<any[]> {
    if (!openai || !checkApiStatus()) throw new Error('OpenAI API is not available');
    const prompt = `次のメモ内容に基づき、マインドマップ構造を生成してください。"id"、"label"、"children"プロパティを持つノードのJSON配列で返してください。\n\n${content}`;
    try {
      const res = await openai.chat.completions.create({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 512,
        temperature: 0.5,
      });
      const jsonText = res.choices[0].message?.content || '';
      const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
      if (jsonMatch) return JSON.parse(jsonMatch[0]);
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
  async chatResponse(message: string, context?: string): Promise<string> {
    if (!openai) throw new Error('OPENAI_NOT_CONFIGURED');
    if (!checkApiStatus()) throw new Error('API_OVERLOADED');
    // ChatGPT公式風のsystem promptを追加
    const systemPrompt = `あなたはChatGPTのWeb版のように、ユーザーの質問に対して\n- できるだけ要素を分解し\n- 表やリスト、絵文字を多用し\n- 文章を羅列するのではなく、視覚的に整理して\n- Markdownで出力してください\n- 必要に応じて表やリスト、強調、引用、コードブロックも使ってください\n- 返答は日本語で`;
    const prompt = context
      ? `ノートの文脈: "${context}"\n\nユーザーの質問: ${message}\n\n有用な回答を日本語で返してください。`
      : `ユーザーの質問: ${message}\n\n有用な回答を日本語で返してください。`;
    try {
      const res = await openai.chat.completions.create({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: MAX_TOKENS,
        temperature: 0.7,
      });
      return res.choices[0].message?.content?.trim() || '';
    } catch (error) {
      handleApiError(error, 'generating chat response');
      return '';
    }
  },
  async deepenIdea(title: string, content: string): Promise<string> {
    if (!openai || !checkApiStatus()) throw new Error('OpenAI API is not available');
    const noteContent = content || title;
    const prompt = `このアイデアを深めるのを手伝ってください：\n\nタイトル: ${title}\n内容: ${noteContent}\n\n以下の観点から具体的な提案をしてください：\n1. このアイデアの可能性や応用例\n2. 関連する概念や分野\n3. 実装・実現に向けた具体的なステップ\n4. 潜在的な課題や注意点\n5. さらに探求すべき方向性\n\n日本語で、建設的で実用的なアドバイスをお願いします。`;
    try {
      const res = await openai.chat.completions.create({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 512,
        temperature: 0.7,
      });
      return res.choices[0].message?.content?.trim() || '';
    } catch (error) {
      handleApiError(error, 'deepening idea');
      return '';
    }
  }
};

export const isOpenAIEnabled = (): boolean => {
  return !!openai && checkApiStatus();
}; 