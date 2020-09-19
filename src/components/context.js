import React, { useState, createContext, useEffect } from 'react'
import axios from 'axios'
import api from './api'

const PhotoContext = createContext()

const PhotoProvider = (props) => {
  const [photos, setPhotos] = useState([])
  const [selectedPhotos, setSelectedPhotos] = useState([])
  const [selectedFiles, setSelectedFiles] = useState([])
  const [preview, setPreview] = useState([])
  const [limit, setLimit] = useState(25)
  const [skip, setSkip] = useState(0)
  const [end, setEnd] = useState(false)
  const [modal, setModal] = useState(false)
  const [album, setAlbum] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, type: 'success', message: '' })

  const getPhotos = () => {  
    if (loading) return
    setLoading(true)

    const postData = {
      skip: skip,
      limit: limit
    }
    
    axios
      .post(api.photosList, postData)
      .then(response => {
        setPhotos(photos => photos.concat(response.data.documents))
        setSkip(count => parseInt(count) + parseInt(response.data.count))
        if (response.data.count < limit) {
          setEnd(true)
        }
        setLoading(false)
      })
      .catch(() => {
        setToast({
          show: true,
          type: 'error',
          message: 'There is something wrong'
        })
        setLoading(false)
      })
  }

  const uploadPhotos = () => {
    if (loading) return
    setLoading(true)

    let formData = new FormData()
    formData.append('album', album)
    
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('documents', selectedFiles[i])
    }
  
    axios
      .put(api.photos, formData)
      .then(() => {
        setPreview([])
        setSelectedFiles(undefined)
        setAlbum('')
        setEnd(false)
        setModal(false)
        setToast({
          show: true,
          type: 'success',
          message: 'Photos have successfully uploaded'
        })
        setLoading(false)
      })
      .catch(() => {
        setModal(false)
        setToast({
          show: true,
          type: 'error',
          message: 'Photos have not successfully uploaded'
        })
        setLoading(false)
      })
  }

  const deletePhotos = () => {
    if (loading) return
    setLoading(true)

    const newPhotos = photos.filter((p) => !selectedPhotos.includes(p.id))
    const deletePhotos = photos.filter((p) => selectedPhotos.includes(p.id))
    let formData = []
  
    for (let i = 0; i < deletePhotos.length; i++) {
      const item = deletePhotos[i]
      if (formData) {        
        let current = 0
        const check = formData.some((f, j) => {
          current = j
          return f.album === item.album
        })
        if (check) {
          formData[current].documents += `, ${item.name}`
        } else {
          formData.push({
            album: item.album,
            documents: item.name
          })
        }
      } else {
        formData.push({
          album: item.album,
          documents: item.name
        })
      }
    }
  
    axios({
      url: api.photos,
      method: 'DELETE',
      data: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => {
        setPhotos(newPhotos)
        setSelectedPhotos([])
        setToast({
          show: true,
          type: 'success',
          message: 'Photos have successfully deleted'
        })
        setLoading(false)
      })
      .catch(() => {
        setToast({
          show: true,
          type: 'error',
          message: 'Photos have not successfully deleted'
        })
        setLoading(false)
      })
  }

  useEffect(() => {
    getPhotos()
  }, [limit])

  return (
    <PhotoContext.Provider value={{ photos, setPhotos, getPhotos, uploadPhotos, deletePhotos, selectedPhotos, setSelectedPhotos, selectedFiles, setSelectedFiles, preview, setPreview, limit, setLimit, skip, setSkip, end, setEnd, modal, setModal, album, setAlbum, toast, setToast }}>
      {props.children}
    </PhotoContext.Provider>
  )
}

export { PhotoContext, PhotoProvider }
