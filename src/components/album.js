import React, { useContext } from 'react'
import { PhotoContext } from './context'
import Photos from './photos'
import Modal from './modal'
import Toast from './toast'

function Album () {
  const { setPhotos, getPhotos, deletePhotos, selectedPhotos, limit, setLimit, setSkip, end, setEnd, modal, setModal } = useContext(PhotoContext)

  const changeLimit = (e) => {
    setLimit(e.target.value)
    setSkip(0)
    setPhotos([])
    setEnd(false)
  }

  const loadMore = () => {
    getPhotos()
  }

  return (
    <div className='App'>
      <div className='header'>
        <div className='left'>
          <h1>Photos</h1>
        </div>
        <div className='right'>
          {selectedPhotos.length > 0 && <div><button className='delete' onClick={() => deletePhotos()}><span className='icon delete' /> Delete {selectedPhotos.length} photos</button></div>}
          <div><button onClick={() => setModal(!modal)}><span className='icon upload' /> Upload</button></div>
          <div>
            <select onChange={changeLimit} value={limit}>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>
      <div className='content'>
        <Photos />
      </div>
      <div className='footer'>
        {!end && <button onClick={loadMore}>Load More</button>}
      </div>
      <Modal />
      <Toast />
    </div>
  )
}

export default Album
