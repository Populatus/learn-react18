import React, { useCallback, useState, useTransition } from 'React'
import View from './view'
const App: React.FC = () => {
  const [count, setCount] = useState(0)
  const [renderCount, setRenderCount] = useState(0)
  const [isStartTransition, setIsStartTransition] = useState(false)
  const [isPending, startTransition] = useTransition()
  const onRangeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCount(+e.target.value)
      if (isStartTransition) {
        startTransition(() => {
          setRenderCount(+e.target.value)
        })
      }
      else {
        setRenderCount(+e.target.value)
      }
    },
    [isStartTransition, startTransition],
  )
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isStartTransition}
          onChange={(e) => {
            setIsStartTransition(e.target.checked)
          }}
        />
        useTransition
      </label>
      <input
        type="range"
        min="0"
        max="600"
        step="1"
        value={count}
        onChange={onRangeChange}
        style={{
          display: 'block',
        }}
      />
      <h3>
        input:{count} {isPending ? ' Loading...' : null}
      </h3>
      <View count={renderCount} />
    </div>
  )
}
export default App
