import React, { Fragment } from 'react'
import { Route,Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedAdminRoute = () => {

    const { isAuthenticated, loading, user } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading === false
             &&
                    (      
                        (isAuthenticated === true  && user.role == 'admin') ?
                        <Outlet  />:
                            <Navigate to="/" />  

                       )
                       // console.log("xac thuc thanh cong")
                    }
            
              
        </Fragment>
    )
}

export default ProtectedAdminRoute