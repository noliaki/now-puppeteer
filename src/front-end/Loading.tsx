import React, { useEffect } from 'react'

export default ({
  isFetching
}: {
  isFetching: Boolean
}): JSX.Element | null => {
  useEffect(() => {}, [isFetching])

  return isFetching ? (
    <div className="mt-4">
      <div className="loading mx-auto" />
    </div>
  ) : null
}
