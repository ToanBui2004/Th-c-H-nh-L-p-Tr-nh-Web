import '../styles/globals.css'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    try {
      var s = document.createElement('script')
      s.src = '/js/main.js'
      s.defer = true
      s.setAttribute('data-loaded-by', 'next-main')
      document.body.appendChild(s)
      return () => { try { document.body.removeChild(s) } catch (e) {} }
    } catch (e) {
      // ignore in non-browser
    }
  }, [])

  return <Component {...pageProps} />
}
