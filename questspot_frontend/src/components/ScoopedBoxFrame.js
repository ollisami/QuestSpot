import React from 'react'

const ScoopedBoxFrame = ({ radius }) => {
  const frameStyle = {
    padding: radius + 1
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
          <use href='#b' mask='url(#m)' />

          <mask id='mb' fill='#fff'>
            <rect id='bb' x='6px' y='6px' />
            <circle id='cb' r={radius + 6} fill='#000' />
            <use href='#cb' x='100%' />
            <use href='#cb' y='100%' />
            <use href='#cb' x='100%' y='100%' />
          </mask>
          <use href='#bb' mask='url(#mb)' />

          <mask id='mc' fill='#fff'>
            <rect id='bc' x='10px' y='10px' />
            <circle id='cc' r={radius + 10} fill='#000' />
            <use href='#cc' x='100%' />
            <use href='#cc' y='100%' />
            <use href='#cc' x='100%' y='100%' />
          </mask>
          <use href='#bc' mask='url(#mc)' />
        </svg>
      </div>
    </div>
  )
}

export default ScoopedBoxFrame