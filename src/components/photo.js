import React from 'react'

const Photo = (props) => {
  return (
    <div className={props.selected ? 'photo selected' : 'photo'} onClick={() => props.handleClick(props.photo.id)}>
      <div className='photo-container'>
        <div className='photo-frame'>
          <img className='photo-img' alt={props.photo.name} src={props.photo.raw} />
        </div>
      </div>
      <div className='photo-name'>{props.photo.name}</div>
      <div className='photo-album'>{props.photo.album}</div> 
      {props.selected && <div className='photo-checkmark'><span className='icon selected' /></div>}
    </div>
  )
}

export default Photo
