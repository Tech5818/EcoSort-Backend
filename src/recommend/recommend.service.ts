import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecommendService {
  async getRecommendByText(text: string) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_SECRET);

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'text/plain',
    };

    const history = [
      {
        role: 'user',
        parts: [{ text: '앞으로 모든 질문에 한국어로 대답해줘' }],
      },
      {
        role: 'model',
        parts: [
          {
            text: '알겠습니다! 앞으로 모든 질문에 한국어로 답변 드리겠습니다. 무엇을 궁금해하시나요? 😊 \n',
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: '내가 영어나 한국어로 물체를 말하면 이후에 그걸로 업사이클링 할 수 있는 제품의 이름과 업사이클링의 방법을 설명해줘',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: '좋아요!  어떤 물체로 업사이클링을 하고 싶으신가요? 영어나 한국어로 말씀해주세요.  😊 \n\n예를 들어, \n\n* "낡은 청바지"\n* "깨진 찻잔"\n* "플라스틱 병" \n\n등을 말씀해주시면 그 물체로 어떤 제품을 만들 수 있는지, 어떻게 업사이클링 할 수 있는지 자세히 알려드리겠습니다. \n',
          },
        ],
      },
      {
        role: 'user',
        parts: [
          { text: '내가 물체나 재료에 대해서 질문하면' },
          { text: '너는 업사이클링 아이디어' },
          {
            text: '그리고 그 업사이클링 아이디어를 어떤식으로 만들 수 있는지 간단하게 50자 이내로 설명해줘',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: '알겠습니다!  어떤 물체나 재료에 대해 궁금하신가요? 물건을 말씀해주시면 업사이클링 아이디어와 간단한 제작 설명을 50자 이내로 드릴게요! 😊 \n',
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: '업사이클링 아이디어의 제목과 어떤식으로 만들고 활용하는지 간단하게 50자로 설명해줘',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: '네, 알겠습니다! 어떤 물건으로 업사이클링을 하고 싶으신가요? 물건의 종류를 알려주시면 업사이클링 아이디어 제목과 간단한 제작 설명을 50자 이내로 드릴게요! 😊 \n',
          },
        ],
      },
      {
        role: 'user',
        parts: [
          {
            text: '그리고 답변을 MD 형식으로 아이디어 제목을 ##, 그리고 만드는 과정이나 활용하는 설명을 50자 이내로 표현해줘',
          },
        ],
      },
      {
        role: 'model',
        parts: [
          {
            text: '알겠습니다!  어떤 물건으로 업사이클링을 하고 싶으신가요? 물건의 종류를 알려주시면 MD 형식으로 업사이클링 아이디어 제목과 간단한 제작 설명을 50자 이내로 드릴게요! 😊 \n\n\n',
          },
        ],
      },
    ];

    const chatSession = model.startChat({
      generationConfig,
      history,
    });

    const result = await chatSession.sendMessage(text);

    return result.response.text();
  }
}
