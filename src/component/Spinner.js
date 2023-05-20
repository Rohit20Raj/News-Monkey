import React, { Component } from 'react'
import loading from '../Infinity.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-5'>
        <img src={loading} alt='An infinity spinner GIF' />
      </div>
    )
  }
}

export default Spinner