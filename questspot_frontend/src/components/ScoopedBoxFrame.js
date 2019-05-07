import React from 'react'

const ScoopedBoxFrame = ({ id, radius, type, width, height }) => {
  //original ids in the order that they are used
  const ids = [
    'm', 'b', 'c', '#c', '#b', '#m',
    'mb', 'bb', 'cb', '#cb', '#bb', '#mb', 
    'mc', 'bc', 'cc', '#cc', '#bc', '#mc'
  ]
  //18 total, is there a more elegant solution?
  const uid = ids.map(i => i + id)
  console.log(uid)

  //specifiable values/colors and their default values 
    let primaryColor = '#28a745'
    let borderColor = '#ffffff'
    let textColor = '#ffffff'

    let borEnd = 'borderEnd'
    let borEndX = '10px'
    let borSta = 'borderStart'
    let borStaX = '6px'

  if (type === 'cancelButton') {
    primaryColor = '#ff0000'
  } else if (type === 'profileCard') {
    primaryColor = '#f7f0e2'
    borderColor= '#425346'
    textColor= '#000000'

    //variales to make the ProfileCard reach to the edges 
    borEnd = 'borderEndToEdge'
    borEndX = '0px'
    borSta = 'borderStartToEdge'
    borStaX = '0px'
  }

  const frameStyle = {
    padding: radius + 1,
    width: width,
    height: height,
    color: textColor
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
            <rect className={borSta} id={uid[7]} x={borStaX} y='6px'/>
            <circle id={uid[8]} r={radius + 6} fill='#000' />
            <use href={uid[9]} x='100%' />
            <use href={uid[9]} y='100%' />
            <use href={uid[9]} x='100%' y='100%' />
          </mask>
          <use href={uid[10]} mask={`url(${uid[11]})`} fill={borderColor}/>

          <mask id={uid[12]} fill='#fff'>
            <rect className={borEnd} id={uid[13]} x={borEndX} y='10px' />
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