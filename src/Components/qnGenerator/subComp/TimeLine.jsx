import React from 'react'
import { Steps } from 'antd'

const TimeLine = () => {
    return (
        <div className='d-flex justify-content-end'>
            
            <Steps
                size='small'
                // status='error'
                progressDot
                current={0}
                items={[
                    {
                        title: 'Qn Generation'
                    },
                    {
                           title: 'Review'
                    },
                    {
                        title: 'Publish'
                    }
                ]}
                style={{ maxWidth: '450px' }}

            />
        </div>
    )
}

export default TimeLine
