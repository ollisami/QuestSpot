import React from 'react'

const ScoopedBoxFrame = (
  { 
    id,
    children,
    textContent,
    clickEvent,
    radius,
    type = 'box',
    primaryColor = '#375244',
    borderColor = '#ffffff',
    textColor = '#ffffff',
  }) => {

  //original id's in the order that they are used
  const ids = [
    'm', 'b', 'c', '#c', '#b', '#m',
    'mb', 'bb', 'cb', '#cb', '#bb', '#mb',
    'mc', 'bc', 'cc', '#cc', '#bc', '#mc'
  ]
  //18 total, is there a more elegant solution?
  const uid = ids.map(i => i + id)

  const renderBox = () => {
    if ( type !== 'box') return null
    return (
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
              <rect className="borderStart" id={uid[7]} />
              <circle id={uid[8]} r={radius} fill='#000' />
              <use href={uid[9]} x='100%' />
              <use href={uid[9]} y='100%' />
              <use href={uid[9]} x='100%' y='100%' />
            </mask>
            <use href={uid[10]} mask={`url(${uid[11]})`} fill={borderColor} />

            <mask id={uid[12]} fill='#fff'>
              <rect className="borderEnd" id={uid[13]} />
              <circle id={uid[14]} r={radius + 3} fill='#000' />
              <use href={uid[15]} x='100%' />
              <use href={uid[15]} y='100%' />
              <use href={uid[15]} x='100%' y='100%' />
            </mask>
            <use href={uid[16]} mask={`url(${uid[17]})`} fill={primaryColor} />
            <rect className="imagePlaceholder" y={radius} />
          </svg>
    )
  }

  const renderTop = () => {
    if ( type !== 'top') return null
    return (
          <svg>
            <mask id={uid[0]} fill='#fff'>
              <rect id={uid[1]} width='100%' height='100%' />
              <circle id={uid[2]} r={radius} fill='#000' />
              <use href={uid[3]} x='100%' />>
            </mask>
            <use href={uid[4]} mask={`url(${uid[5]})`} fill={primaryColor} />


            <mask id={uid[6]} fill='#fff'>
              <rect className="borderStart" id={uid[7]} />
              <circle id={uid[8]} r={radius} fill='#000' />
              <use href={uid[9]} x='100%' />
            </mask>
            <use href={uid[10]} mask={`url(${uid[11]})`} fill={borderColor} />

            <mask id={uid[12]} fill='#fff'>
              <rect className="borderEnd" id={uid[13]} />
              <circle id={uid[14]} r={radius + 3} fill='#000' />
              <use href={uid[15]} x='100%' />
            </mask>
            <use href={uid[16]} mask={`url(${uid[17]})`} fill={primaryColor} />
            <rect className="imagePlaceholder" y={radius} />
          </svg>
    )
  }

  const renderBottom = () => {
    if ( type !== 'bottom') return null
    return (
      <svg>
        <mask id={uid[0]} fill='#fff'>
          <rect id={uid[1]} width='100%' height='100%' />
          <circle id={uid[2]} r={radius}  cy='100%' fill='#000'  />
          <use href={uid[3]} x='100%'/>
        </mask>
        <use href={uid[4]} mask={`url(${uid[5]})`} fill={primaryColor} />


        <mask id={uid[6]} fill='#fff'>
          <rect className="borderStart" id={uid[7]} />
          <circle id={uid[8]} r={radius} cy='100%' fill='#000' />
          <use href={uid[9]} x='100%'/>
        </mask>
        <use href={uid[10]} mask={`url(${uid[11]})`} fill={borderColor} />

        <mask id={uid[12]} fill='#fff'>
          <rect className="borderEnd" id={uid[13]} />
          <circle id={uid[14]} r={radius + 3} fill='#000' cy='100%' />
          <use href={uid[15]} x='100%' />
        </mask>
        <use href={uid[16]} mask={`url(${uid[17]})`} fill={primaryColor} />
        <rect className="imagePlaceholder" y={radius} />
      </svg>
    )
  }

  return (
    <div className={clickEvent ? "scoopedBoxClickable" : "scoopedBox"} onClick={clickEvent} >
      <div className={"frameBox"}>
        {renderBox()}
        {renderTop()}
        {renderBottom()}
        {children ? children : <p style={{color: textColor}}>{textContent}</p>}
      </div>
    </div>
  )
}

export default ScoopedBoxFrame