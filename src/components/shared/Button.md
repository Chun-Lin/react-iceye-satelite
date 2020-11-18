```js
<Button
  width="60px"
  height="30px"
  borderRadius="20px"
  border="none"
  backgroundColor="orange"
  onClick={() => alert('Submitted!')}
>
  Submit
</Button>
```

### Extended by styled-components

```jsx
import styled from 'styled-components'
import Button from './Button'

const ModifiedButton = styled(Button)`
  width: 200px;
  height: 25px;
  border-radius: 100px;
  border: none;

  &:hover {
    background-color: orange;
  }
`

;<ModifiedButton onClick={() => alert('This is a modified button!')}>
  Modified Button
</ModifiedButton>
```
