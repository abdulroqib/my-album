import React, { useContext } from 'react'
import { PhotoContext } from './context'

const Modal = () => {
  const { uploadPhotos, selectedFiles, setSelectedFiles, preview, setPreview, modal, setModal, album, setAlbum, setToast } = useContext(PhotoContext)
  
  const changeFiles = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files)
      setPreview([])
      for (let i = 0; i < e.target.files.length; i++) {
        if (!e.target.files[i].type.includes('image')) {
          setSelectedFiles([])
          setPreview([])
          setToast({
            show: true,
            type: 'error',
            message: 'Only allow image files to be uploaded'
          })
          break
        }

        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[i])
        reader.onloadend = function (ef) {
          setPreview(preview => preview.concat(reader.result))
        }
      }
    }
  }

  const changeAlbum = (e) => {
    setAlbum(e.target.value)
  }

  return (
    <div className={`modal ${modal ? 'open' : ''}`}>
      <div className='modal-dialog'>
        <div className='modal-header'>
          <div>
            <h3>Upload Photos</h3>
          </div>
          <div><button onClick={() => setModal(!modal)}><span className='icon close' /> </button></div>
        </div>
        <div className='modal-content'>
          <div className='upload-container'>
            <input type='file' accept='image/*' multiple onChange={changeFiles} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <div className='selected-files'>
            {preview.length === 0 && <p>No files Selected</p>}
            <div className='preview'>
              {preview.map((thumbnail, i) => (
                <img key={i} src={thumbnail} alt={`file ${i}`} />
              ))}
            </div>
          </div>
        </div>
        <div className='modal-footer'>
          <div>
            <select onChange={changeAlbum}>
              <option value=''>Select Album</option>
              <option>Travel</option>
              <option>Personal</option>
              <option>Food</option>
              <option>Nature</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            {selectedFiles && album !== '' ? <button onClick={() => uploadPhotos()}><span className='icon upload' /> Upload</button> : <button className='disabled'><span className='icon upload' /> Upload</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
