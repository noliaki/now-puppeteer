import React, { useEffect } from 'react'

export default ({
  basicAuthUserName,
  basicAuthPassword,
  setBasicAuthUserName,
  setBasicAuthPassword
}: {
  basicAuthUserName: string
  basicAuthPassword: string
  setBasicAuthUserName: React.Dispatch<React.SetStateAction<string>>
  setBasicAuthPassword: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  useEffect(() => {}, [
    basicAuthUserName,
    basicAuthPassword,
    setBasicAuthUserName,
    setBasicAuthPassword
  ])

  return (
    <form className="w-full mt-2">
      <div className="md:flex md:items-center mb-6">
        <div className="w-48">
          <label
            className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            Basic auth User Name
          </label>
        </div>
        <div className="w-1/3">
          <input
            className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"
            id="inline-full-name"
            type="text"
            placeholder="input Basic auth User Name"
            value={basicAuthUserName}
            onChange={event => setBasicAuthUserName(event.target.value)}
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="w-48">
          <label
            className="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-username"
          >
            Basic auth Password
          </label>
        </div>
        <div className="w-1/3">
          <input
            className="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-purple"
            id="inline-username"
            type="text"
            placeholder="input Basic auth Password"
            value={basicAuthPassword}
            onChange={event => setBasicAuthPassword(event.target.value)}
          />
        </div>
      </div>
    </form>
  )
}
