import React, { useState } from 'react'
import Textarea from './Textarea'
import BasicAuthInput from './BasicAuthInput'
import BtnAnalyze from './BtnAnalyze'
import Loading from './Loading'
import Result from './Result'

import analyze from './analyze'

export default (): JSX.Element => {
  const [inputText, setInputText] = useState('')
  const [results, setResult] = useState([])
  const [basicAuthUserName, setBasicAuthUserName] = useState('')
  const [basicAuthPassword, setBasicAuthPassword] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const onAnalyze = async (): Promise<void> => {
    if (isFetching) {
      return
    }

    setIsFetching(true)
    setResult([])

    const body: any = {
      urls: inputText
        .replace(/\r\n/gm, '\n')
        .replace(/\r/gm, '\n')
        .split(/\n/)
        .filter(url => url)
    }

    if (basicAuthUserName || basicAuthPassword) {
      body.basicAuth = {
        userName: basicAuthUserName,
        password: basicAuthPassword
      }
    }

    const result = await analyze(JSON.stringify(body)).catch(alert)
    console.log(result)
    setResult(JSON.parse(JSON.stringify(result)))
    setIsFetching(false)
  }

  return (
    <div className="container mx-auto mt-20 mb-20">
      <Textarea inputText={inputText} setInputText={setInputText} />
      <BasicAuthInput
        basicAuthUserName={basicAuthUserName}
        basicAuthPassword={basicAuthPassword}
        setBasicAuthUserName={setBasicAuthUserName}
        setBasicAuthPassword={setBasicAuthPassword}
      />
      <BtnAnalyze isFetching={isFetching} onAnalyze={onAnalyze} />
      <Loading isFetching={isFetching} />

      <Result results={results} />
    </div>
  )
}
