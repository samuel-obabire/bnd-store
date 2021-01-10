import { useEffect, useState } from 'react'

const withMediaQuery = (Component, media) => ({ ...props }) => {
  const [isMobile, setIsMobile] = useState()

  const mql = window.matchMedia(media)

  useEffect(() => {
    const isMobile = e => {
      setIsMobile(e.matches)
    }

    mql.addEventListener('change', isMobile)

    return () => mql.removeEventListener('change', isMobile)
  })

  return <Component {...props} isMobile={isMobile ?? mql.matches} />
}

export default withMediaQuery
