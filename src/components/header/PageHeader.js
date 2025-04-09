import React from 'react'
import { useNavigate } from 'react-router-dom'


const PageHeader = ({children , hideGoBack,border}) => {
    const navigate = useNavigate()

    const navigateBackword = () => {
        navigate(-1)
    }

  return (
    <div className={`d-flex ${border ? 'border ' : ''}`}><i class={`bi pointer bi-arrow-left fs-4 ${hideGoBack?'d-none':''}`} onClick={()=> navigateBackword()}></i> <h1 className="text-center  w-100 text-shadow">{children}</h1></div>
  )
}

export default PageHeader