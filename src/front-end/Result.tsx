import React, { useEffect } from 'react'

import ResultItem from './ResultItem'

export default ({ results }: { results: any[] }): JSX.Element | null => {
  useEffect(() => {}, [results])

  if (!results.length) return null

  return (
    <div className="mt-20">
      <h1 className="text-center mb-20 border-b">Result</h1>
      {results.map(
        (result: any, index: number): JSX.Element => (
          <ResultItem result={result} key={index} />
        )
      )}
    </div>
  )
}
