import React, { useEffect } from 'react'

export default ({
  inputText,
  setInputText
}: {
  inputText: string
  setInputText: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  useEffect(() => {}, [inputText])

  return (
    <textarea
      className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
      rows={10}
      placeholder="input URL"
      onChange={event => setInputText(event.target.value)}
      value={inputText}
    />
  )
}
