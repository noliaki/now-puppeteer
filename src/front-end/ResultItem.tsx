import React, { useEffect } from 'react'
import ResultData from './ResultData'

export default ({
  result,
  index
}: {
  result: any
  index: number
}): JSX.Element => {
  useEffect(() => {}, [result])

  const wrapClassName: string = index !== 0 ? 'mt-20 pt-20 border-t-4' : ''

  return (
    <div className={wrapClassName}>
      <div
        className="bg-grey-lighter py-2 px-4 rounded-full border"
        style={{
          wordBreak: 'break-all'
        }}
      >
        <a href={result.pageUrl} target="_blank" rel="noopener noreferer">
          {result.pageUrl}
        </a>
      </div>
      <div className="mt-2 text-center bg-grey-dark img-wrapper border">
        <img
          src={`/api/screenshot/?url=${encodeURIComponent(result.pageUrl)}`}
          alt={result.pageUrl}
          className="max-w-full"
        />
      </div>
      <h3 className="bg-grey-lighter p-2 border mt-10">{result.title}</h3>
      <ResultData dataList={result.meta}>
        <>meta</>
      </ResultData>
      <ResultData dataList={result.responseError}>
        <>
          Response
          <span className="text-xs">(except for 2XX response)</span>
        </>
      </ResultData>
    </div>
  )
}
