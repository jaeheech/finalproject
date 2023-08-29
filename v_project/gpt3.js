const axios = require('axios')

const apiKey = process.env.VUE_APP_chatgpt // OpenAI API 키를 환경 변수에서 가져옴

async function gpt3(input) {
  const prompt = `${input}`
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a professional Health Trainer.' },
      { role: 'user', content: prompt }
    ]
  }
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      data,
      { headers }
    )
    const answer = response.data.choices[0].message.content
    return answer
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error.message)
    return 'API 요청 중 오류가 발생했습니다.'
  }
}

module.exports = { gpt3 }
