import React from 'react'
import DataContent from './DataContent'

export default ({ item, index }: { item: any; index: number }): JSX.Element => {
  const notFoundError: boolean = item.status === 404
  const baseClasses: string[] = ['w-full', 'text-left']

  if (index !== 0) {
    baseClasses.push('mt-4')
  }

  if (notFoundError) {
    baseClasses.push('border-red-dark border-4 bg-red-lighter')
  } else {
    baseClasses.push('border')
  }

  const content = Object.keys(item).map(
    (key: string, index: number): JSX.Element => {
      return (
        <DataContent
          objKey={key}
          val={item[key]}
          index={index}
          key={`DataContent-${index}`}
        />
      )
    }
  )

  return <div className={baseClasses.join(' ')}>{content}</div>
}
