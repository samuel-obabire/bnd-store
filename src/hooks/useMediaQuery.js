import { useEffect, useState } from 'react'

const useMediaQuery = mediaQuery => {
  const [isMedia, setIsmedia] = useState()
  const [vw, setVw] = useState(document.documentElement.clientWidth)
  const [vh, setVh] = useState(document.documentElement.clientHeight)

  const mql = window.matchMedia(mediaQuery)

  useEffect(() => {
    const reportWindowSize = e => {
      setVh(document.documentElement.clientHeight)
      setVw(document.documentElement.clientWidth)
    }

    const isMedia = e => {
      setIsmedia(e.matches)
    }

    window.addEventListener('resize', reportWindowSize)

    if (!mediaQuery)
      return () => window.removeEventListener('resize', reportWindowSize)

    mql.addEventListener('change', isMedia)

    return () => {
      mql.removeEventListener('change', isMedia)
      window.removeEventListener('resize', reportWindowSize)
    }
  }, [])

  return { isMedia: mediaQuery ? isMedia ?? mql.matches : null, vw, vh }
}

export default useMediaQuery
