import { useEffect } from 'react'
import { useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export const useScrollAnimation = (threshold = 0.1) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: false, // This ensures animations play every time
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden') // Reset animation when out of view
    }
  }, [controls, inView])

  return { ref, controls }
}
