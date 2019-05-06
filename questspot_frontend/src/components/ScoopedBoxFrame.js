import React from 'react'

const ScoopedBoxFrame = ({ radius, type, width, height }) => {
  const frameStyle = {
    padding: radius + 1,
    width: width,
    height: height
  }
  // colors can be specified when calling the component
    let primaryColor = '#28a745'
    let borderColor = '#ffffff'

  if (type == 'cancelButton') {
    primaryColor = '#ff0000'
  }

  return (
    <div className="scoopedBox" style={frameStyle}>
    <p>SCOOPITY SCOOP</p>
      <div className="scoopedBoxInner">
        <svg>
          <mask id='m' fill='#fff'>
            <rect id='b' width='100%' height='100%' />
            <circle id='c' r={radius} fill='#000' />
            <use href='#c' x='100%' />
            <use href='#c' y='100%' />
            <use href='#c' x='100%' y='100%' />
          </mask>
          <use href='#b' mask='url(#m)' fill={primaryColor} />

          <mask id='mb' fill='#fff'>
            <rect id='bb' x='6px' y='6px' />
            <circle id='cb' r={radius + 6} fill='#000' />
            <use href='#cb' x='100%' />
            <use href='#cb' y='100%' />
            <use href='#cb' x='100%' y='100%' />
          </mask>
          <use href='#bb' mask='url(#mb)' fill={borderColor}/>

          <mask id='mc' fill='#fff'>
            <rect id='bc' x='10px' y='10px' />
            <circle id='cc' r={radius + 10} fill='#000' />
            <use href='#cc' x='100%' />
            <use href='#cc' y='100%' />
            <use href='#cc' x='100%' y='100%' />
          </mask>
          <use href='#bc' mask='url(#mc)' fill={primaryColor} />
        </svg>
      </div>
    </div>
  )
}

export default ScoopedBoxFrame