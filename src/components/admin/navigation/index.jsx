import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className="sb-sidenav-menu">
        <div className="nav">
            <div className="sb-sidenav-menu-heading"></div>
            <Link to={'/dashboard'} className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                Dashboard
            </Link>                            
            <div className="sb-sidenav-menu-heading">Main Menu</div>
            <Link to={'/category'} className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                Category
            </Link>
            <Link to={'/post'} className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                Post
            </Link>
            <Link to={'/comment'} className="nav-link">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                Comment
            </Link>
        </div>
    </div>
  )
}

export default Navigation