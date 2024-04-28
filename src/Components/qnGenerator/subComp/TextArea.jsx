import React from 'react'
import {Button, Input} from 'antd'
const {TextArea}=Input;

const Textarea = (props) => {
  const {num, ...others} =props;
  return (
    <div className='d-flex align-items-center gap-3 mt-3'>
      <Button disabled>{num}</Button>
      <TextArea
        placeholder="Enter the question"
        style={{ height: 120, resize: 'none',width:'50%' }}
        {...others}
      />
    </div>
  )
}

export default Textarea
 