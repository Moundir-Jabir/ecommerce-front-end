import React from 'react'

const Layout = (props) => {
  const { title, description, classname, children } = props
  return (
    <div>
      <div className="p-5 mb-4 bg-light rounded-3 container-fluid py-5">
        <h1 className="display-5 fw-bold">{title}</h1>
        <p className="col-md-8 fs-4">{description}</p>
      </div>
      <div className={classname}>
        {children}
      </div>
    </div>
  )
}

export default Layout