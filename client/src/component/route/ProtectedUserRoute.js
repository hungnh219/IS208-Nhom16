import React, { Fragment } from 'react'
import { Route,Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedUserRoute = () => {

    const { isAuthenticated, loading, user } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading === false
             &&
                    (
                       isAuthenticated === false ?
                          <Navigate to='/login' />:  <Outlet  />                   
                       )
                       // console.log("xac thuc thanh cong")
                    }
            
              
        </Fragment>
    )
}

export default ProtectedUserRoute