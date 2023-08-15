import React from 'react'

const BarLoader = () => {
  return (
    <div className='w-full flex justify-center items-center'>
        <div className='w-32 h-12 bg-[#d5e2f3] rounded-md absolute animation_down'>
            <div className='flex flex-col-reverse w-full h-full'>
                <div className='rounded-full m-1 h-2 bg-blue-700 animation'></div>
            </div>
        </div>
    </div>
  )
}

export default BarLoader