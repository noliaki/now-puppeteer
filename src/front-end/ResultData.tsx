import React, { useState, useEffect } from 'react'
import Disclosure from './Disclosure'
import DataItem from './DataItem'

export default ({
  heading,
  dataList
}: {
  heading: string
  dataList: any[]
}): JSX.Element => {
  const [showData, setShowData] = useState(true)
  const [filterText, setFilterText] = useState('')

  useEffect(() => {}, [showData, filterText, heading, dataList])

  const pattern: RegExp = new RegExp(filterText, 'i')
  const filteredData: any[] = filterText
    ? dataList.filter(item => pattern.test(JSON.stringify(item)))
    : dataList

  const dataItems: JSX.Element[] = filteredData.map(
    (item: any, index: number) => (
      <DataItem item={item} index={index} key={`DataItem-${index}`} />
    )
  )

  const klass: string = showData ? 'flex' : 'flex -active'

  return (
    <div className="mt-6">
      <h3 className={klass}>
        <button
          type="button"
          className="flex-no-shrink"
          onClick={(event: React.MouseEvent): void => {
            event.preventDefault()
            setShowData(!showData)
          }}
        >
          <span className="icon">
            <span className="icon-line" />
            <span className="icon-line" />
          </span>
          <span className="ml-1">{heading}</span>
        </button>
        <input
          type="text"
          value={filterText}
          onChange={(event: React.ChangeEvent): void => {
            setFilterText((event.target as HTMLInputElement).value)
          }}
          placeholder="filter"
          className="ml-auto shadow appearance-none border rounded max-w-xs py-2 px-3 text-sm text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
        />
      </h3>
      <div className="pt-4">
        <Disclosure showData={showData}>{dataItems}</Disclosure>
      </div>
    </div>
  )
}
