import React, { useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'

function noHeight(node: HTMLElement): void {
  node.style.maxHeight = '0px'
}

function fullHeight(node: HTMLElement): void {
  node.style.maxHeight = `${node.scrollHeight}px`
}

export default ({
  showData,
  children
}: {
  showData: Boolean
  children: JSX.Element[]
}): JSX.Element => {
  useEffect(() => {}, [showData, children])

  return (
    <CSSTransition
      in={showData}
      timeout={100}
      onEnter={noHeight}
      onEntered={fullHeight}
      onExit={fullHeight}
      onExited={noHeight}
    >
      <div className="disclosure">{children}</div>
    </CSSTransition>
  )
}
