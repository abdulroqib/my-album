import React, { useContext } from 'react'
import { PhotoContext } from './context'
import Photo from './photo'

const Photos = () => {
  const { photos, selectedPhotos, setSelectedPhotos } = useContext(PhotoContext)

  const _onClick = (id) => {
    if (selectedPhotos && selectedPhotos.includes(id)) {
      setSelectedPhotos(selectedPhotos => selectedPhotos.filter((p) => p !== id))
    } else {
      setSelectedPhotos(selectedPhotos => selectedPhotos.concat(id))
    }
  }

  return (
    <div className={selectedPhotos.length > 0 ? 'photos select-photos' : 'photos'}>
      {photos.map((photo, i) => (
        <Photo key={i} photo={photo} selected={selectedPhotos.includes(photo.id)} handleClick={_onClick} />
      ))}
    </div>
  )
}

export default Photos
