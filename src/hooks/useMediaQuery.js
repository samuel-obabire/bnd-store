import { useEffect, useState } from 'react'

const useMediaQuery = mediaQuery => {
  const [isMedia, setIsmedia] = useState()

  const mql = window.matchMedia(mediaQuery)

  useEffect(() => {
    const isMedia = e => {
      setIsmedia(e.matches)
    }

    mql.addEventListener('change', isMedia)

    return () => mql.removeEventListener('change', isMedia)
  }, [])

  return isMedia ?? mql.matches
}

export default useMediaQuery
