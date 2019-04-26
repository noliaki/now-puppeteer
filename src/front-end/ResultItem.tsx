import React from 'react'
import ResultData from './ResultData'

export default ({ result }: { result: any }): JSX.Element => {
  return (
    <div>
      <h3
        className="bg-grey p-2 rounded"
        style={{
          wordBreak: 'break-all'
        }}
      >
        {result.pageUrl}
      </h3>
      <div className="mt-2 text-center bg-grey-dark img-wrapper">
        <img
          src={`/api/screenshot/?url=${encodeURIComponent(result.pageUrl)}`}
          alt={result.pageUrl}
          className="max-w-full"
        />
      </div>
      <ResultData heading="meta" dataList={result.meta} />
    </div>
  )
}
