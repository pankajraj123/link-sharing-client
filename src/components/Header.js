import React from 'react'


function Header(props) {
  return (
    <div>
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
      <div>Linksharing</div>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
        <div>{props.data}</div>
      </form>
    </div>
</nav>
    </div>
  )
}

export default Header