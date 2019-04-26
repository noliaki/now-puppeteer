import React, { useEffect } from 'react'

export default ({
  isFetching,
  onAnalyze
}: {
  isFetching: Boolean
  onAnalyze: React.Dispatch<React.SetStateAction<void>>
}): JSX.Element => {
  const klass: string = isFetching
    ? 'shadow bg-purple hover:bg-purple-light focus:shadow-outline focus:outline-none text-white py-2 px-20 rounded-full opacity-50 cursor-not-allowed'
    : 'shadow bg-purple hover:bg-purple-light focus:shadow-outline focus:outline-none text-white py-2 px-20 rounded-full'

  useEffect(() => {
    console.log('update BTN')
  }, [isFetching])

  return (
    <div className="text-center mt-4">
      <button className={klass} type="button" onClick={event => onAnalyze()}>
        解 析
      </button>
    </div>
  )
}
