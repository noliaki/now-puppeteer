import React from 'react'

export default ({
  objKey,
  val,
  index
}: {
  objKey: string
  val: string | any
  index: number
}): JSX.Element => {
  const rootClassName: string[] = ['flex']

  if (index !== 0) {
    rootClassName.push('border-t')
  }

  const content =
    objKey !== 'headers' ? (
      <div
        className="p-2 font-mono text-xs text-blue-dark flex-grow"
        style={{ wordBreak: 'break-all' }}
      >
        {val}
      </div>
    ) : (
      <div>
        {Object.keys(val).map(
          (hKey, hVal, hIndex): JSX.Element => (
            <div className="flex bg-red-lighter" key={'header-' + hIndex}>
              <div className="p-2 font-mono text-xs text-purple-dark w-32 flex-no-shrink">
                {hKey}
              </div>
              <div
                className="p-2 font-mono text-xs text-blue-dark flex-grow"
                style={{ wordBreak: 'break-all' }}
              >
                {hVal}
              </div>
            </div>
          )
        )}
      </div>
    )

  return (
    <div className={rootClassName.join(' ')}>
      <div className="p-2 font-mono text-xs text-purple-dark whitespace-no-wrap w-32 flex-no-shrink">
        {objKey}
      </div>
      {content}
    </div>
  )
}
