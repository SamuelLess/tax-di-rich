import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './App.tsx'

import './index.css'
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core'

const theme = createTheme({
  fontFamily: "Inter",
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
)
