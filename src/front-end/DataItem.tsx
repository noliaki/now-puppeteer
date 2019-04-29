import React, { useEffect } from 'react'
import DataContent from './DataContent'

function createContent(obj: any): JSX.Element[] {
  return Object.keys(obj).map(
    (key: string, index: number): JSX.Element => {
      const val: JSX.Element[] | string =
        typeof obj[key] === 'object' ? createContent(obj[key]) : obj[key]

      return (
        <DataContent
          objKey={key}
          val={val}
          index={index}
          key={`DataContent-${index}`}
        />
      )
    }
  )
}

export default ({ item, index }: { item: any; index: number }): JSX.Element => {
  const notFoundError: boolean = item.status === 404
  const baseClasses: string[] = ['w-full', 'text-left']

  useEffect(() => {}, [item, index])

  if (index !== 0) {
    baseClasses.push('mt-4')
  }

  if (notFoundError) {
    baseClasses.push('border-red-dark border-4 bg-red-lighter')
  } else {
    baseClasses.push('border')
  }

  const content: JSX.Element[] = createContent(item)

  return <div className={baseClasses.join(' ')}>{content}</div>
}
