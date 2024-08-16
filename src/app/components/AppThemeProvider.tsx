"use client"

import { ThemeProvider, createTheme } from '@mui/material'
import React from 'react'

const AppThemeProvider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const theme = createTheme(
        {   
            palette: {
                primary: {
                    main: '#3F51B5',
                },
                secondary: {
                    main: '#8BC34A', 
                },
                error: {
                    main: '#FF5722', 
                },
                background: {
                    default: '#F5F5F5', 
                    paper: '#FFFFFF', 
                },
                text: {
                    primary: '#212121', 
                    secondary: '#757575', 
                },
            },                      
            typography : {
                fontFamily: 'Roboto, sans-serif',
            },
            
        }
    )



  return (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
  )
}

export default AppThemeProvider