import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './App.tsx'

import './index.css'
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core'

const theme = createTheme({
  fontFamily: "Inter",
  primaryColor: 'black',
  colors: {
    'black': [
      "#000000",
      "#1C1C1C",
      "#383838",
      "#555555",
      "#717171",
      "#8D8D8D",
      "#AAAAAA",
      "#C6C6C6",
      "#E2E2E2",
      "#FFFFFF"
    ]    
  },
  primaryShade: 0
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
)
