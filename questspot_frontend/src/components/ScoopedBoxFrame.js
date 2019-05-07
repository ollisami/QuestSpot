import React from 'react'

const ScoopedBoxFrame = ({ id, radius, type, width, height }) => {
  const frameStyle = {
    padding: radius + 1,
    width: width,
    height: height
  }

  //original ids in the order that they are used
  const ids = [
    'm', 'b', 'c', '#c', '#b', '#m',
    'mb', 'bb', 'cb', '#cb', '#bb', '#mb', 
    'mc', 'bc', 'cc', '#cc', '#bc', '#mc'
  ]
  //18 total, is there a more elegant solution?
  const uid = ids.map(i => i + id)
  console.log(uid)

  // colors can be specified when calling the component
    let primaryColor = '#28a745'
    let borderColor = '#ffffff'

  if (type === 'cancelButton') {
    primaryColor = '#ff0000'
  }

  return (
    <div className="scoopedBox" style={frameStyle}>
    <p>SCOOPITY SCOOP</p>
      <div className="scoopedBoxInner">
        <svg>
          <mask id={uid[0]} fill='#fff'>
            <rect id={uid[1]} width='100%' height='100%' />
            <circle id={uid[2]} r={radius} fill='#000' />
            <use href={uid[3]} x='100%' />
            <use href={uid[3]} y='100%' />
            <use href={uid[3]} x='100%' y='100%' />
          </mask>
          <use href={uid[4]} mask={`url(${uid[5]})`} fill={primaryColor} />

          <mask id={uid[6]} fill='#fff'>
            <rect className='borderStart'id={uid[7]} x='6px' y='6px'/>
            <circle id={uid[8]} r={radius + 6} fill='#000' />
            <use href={uid[9]} x='100%' />
            <use href={uid[9]} y='100%' />
            <use href={uid[9]} x='100%' y='100%' />
          </mask>
          <use href={uid[10]} mask={`url(${uid[11]})`} fill={borderColor}/>

          <mask id={uid[12]} fill='#fff'>
            <rect className='borderEnd'id={uid[13]} x='10px' y='10px'/>
            <circle id={uid[14]} r={radius + 10} fill='#000' />
            <use href={uid[15]} x='100%' />
            <use href={uid[15]} y='100%' />
            <use href={uid[15]} x='100%' y='100%' />
          </mask>
          <use href={uid[16]} mask={`url(${uid[17]})`} fill={primaryColor} />
        </svg>
      </div>
    </div>
  )
}

export default ScoopedBoxFrame