import React from 'react'
import loading from '../Infinity.gif'

const Spinner = () => {

    return (
      <div className='text-center my-5'>
        <img src={loading} alt='An infinity spinner GIF' />
      </div>
    )
}

export default Spinner