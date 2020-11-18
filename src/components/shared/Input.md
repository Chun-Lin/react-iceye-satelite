```jsx
import React, { useState } from 'react'

const [inputValue, setInputValue] = useState('')

const onChangeHandler = e => {
  setInputValue(e.target.value)
}

;<Input
  width="300px"
  height="30px"
  onChange={onChangeHandler}
  value={inputValue}
/>
```
