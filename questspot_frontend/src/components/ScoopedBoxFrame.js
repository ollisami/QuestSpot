import React from 'react'

const ScoopedBoxFrame = (
  { id, children, textContent, clickEvent, radius, type, top, width, height }) => {
  //const [primaryColorState, setPrimaryColor] = useState('28a745')

  //specifiable values/colors and their default values 
  let primaryColor = '#156327'
  let borderColor = '#ffffff'
  let textColor = '#ffffff'


  /*const changeColor = () => {
    const colors = [primaryColor, '#202020']
    if (primaryColor === colors[0]){
      setPrimaryColor(colors[1])
    } else if (primaryColor === colors[1]){
      setPrimaryColor(colors[0])
    }
  }*/

  let frameType = 'frameBox'
  let clickable = false;


  if (type === 'cancelButton') {
    textContent = 'CANCEL'
    frameType = 'buttonBox'
    primaryColor = '#aa0000'
    clickable = true;
  }

  else if (type === 'submitButton') {
    textContent = 'SUBMIT'
    frameType = 'buttonBox'
    primaryColor = '#0000aa'
    clickable = true;
  }

  else if (type === 'profileCard') {
    frameType = 'profileCardBox'
    primaryColor = '#f7f0e2'
    borderColor = '#425346'
    textColor = '#000000'

  }

  else if (type === 'newsCard') {
    primaryColor = '#f7f0e2'
    borderColor = '#425346'
    textColor = '#000000'
  }

  let clickability = 'scoopedBox'
  if (clickable) {
    clickability = 'scoopedBoxClickable'
  } 

  const frameStyle = {
    top: top,
    padding: radius + 4,
    width: width,
    height: height,
    color: textColor,
    //pointer-events: none; React doesn't support these prefixes apparently
  }

  console.log(frameStyle)

  //original id's in the order that they are used
  const ids = [
    'm', 'b', 'c', '#c', '#b', '#m',
    'mb', 'bb', 'cb', '#cb', '#bb', '#mb',
    'mc', 'bc', 'cc', '#cc', '#bc', '#mc'
  ]
  //18 total, is there a more elegant solution?
  const uid = ids.map(i => i + id)

  return (
    <div className={clickability}
      onClick={clickEvent} >

      <div className={frameType}>
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
        {children ? children : <p>{textContent}</p>}
      </div>
    </div>
  )
}

export default ScoopedBoxFrame