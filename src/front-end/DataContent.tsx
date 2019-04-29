import React from 'react'

export default ({
  objKey,
  val,
  index
}: {
  objKey: string
  val: string | JSX.Element[]
  index: number
}): JSX.Element => {
  const rootClassName: string[] = ['flex']
  const breakAllStyle: React.CSSProperties = { wordBreak: 'break-all' }

  if (index !== 0) {
    rootClassName.push('border-t')
  }

  return (
    <div className={rootClassName.join(' ')}>
      <div className="p-2 font-mono text-xs text-purple-dark whitespace-no-wrap w-32 flex-no-shrink">
        {objKey}
      </div>
      <div
        className="p-2 font-mono text-xs text-blue-dark flex-grow"
        style={breakAllStyle}
      >
        {val}
      </div>
    </div>
  )
}
