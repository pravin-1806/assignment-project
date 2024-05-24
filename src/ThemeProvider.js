import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const ThemeProvider = ({children}) => {

  const ThemeMode=useSelector(store=>store.Theme.mode);

  useEffect(() => {
    if (ThemeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [ThemeMode]);

  return (
    <div>
      {children}
    </div>
  )
}

export default ThemeProvider
