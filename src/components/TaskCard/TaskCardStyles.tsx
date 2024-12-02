import styled from 'styled-components'

const TaskCard = styled.div<{ $theme: string }>`
  background-color: ${props =>
    props.$theme === 'light' ? 'darkgreen' : 'white'};
  color: ${props => (props.$theme === 'light' ? 'white' : 'darkgreen')};
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 10px 10px;
  margin: 10px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
`

export { TaskCard }
