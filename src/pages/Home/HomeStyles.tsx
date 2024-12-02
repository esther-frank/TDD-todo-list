import styled from 'styled-components'

const Home = styled.div<{ $theme?: 'light' | 'dark' }>`
  background-color: ${props =>
    props.$theme == 'light' ? 'white' : 'darkgreen'};
  height: 100vh;
`

const List = styled.ul<{ $theme?: string }>`
  list-style: none;
  padding: 0;
`

export { Home, List }
