import React, { useContext, useEffect } from 'react'
import { PhotoContext } from './context'

const Toast = () => {
  const { toast, setToast } = useContext(PhotoContext)

  useEffect(() => {
    const interval = setInterval(() => {
      setToast(t => !t.show)
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className={toast.show ? `toast show ${toast.type}` : 'toast'}>
      <div className='message'>
        {toast.message}
      </div>
    </div>
  )
}

export default Toast
