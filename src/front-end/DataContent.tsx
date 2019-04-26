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
  const breakAllStyle: React.CSSProperties = { wordBreak: 'break-all' }

  if (index !== 0) {
    rootClassName.push('border-t')
  }

  const content =
    objKey !== 'headers' ? (
      <div
        className="p-2 font-mono text-xs text-blue-dark flex-grow"
        style={breakAllStyle}
      >
        {val}
      </div>
    ) : (
      <div className="flex-grow">
        {Object.keys(val).map(
          (hKey, hIndex): JSX.Element => {
            const containerClassName: string =
              hIndex !== 0 ? 'flex border-t' : 'flex'
            return (
              <div className={containerClassName} key={'header-' + hIndex}>
                <div className="p-2 font-mono text-xs text-purple-dark w-32 flex-no-shrink">
                  {hKey}
                </div>
                <div
                  className="p-2 font-mono text-xs text-blue-dark flex-grow"
                  style={breakAllStyle}
                >
                  {val[hKey]}
                </div>
              </div>
            )
          }
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
