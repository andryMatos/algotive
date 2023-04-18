import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({isAllowed, redirectPath, children}) => {

    if(!isAllowed){
        return <Navigate to={redirectPath} replace/>
    }else{
        return children ? children : <Outlet/>
    }

}

export default ProtectedRoutes;
