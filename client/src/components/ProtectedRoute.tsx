
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children} : any) => {

  const token = localStorage.getItem('token');

  if(token){
    return children;
  }
  else 
     return <Navigate to="/signin"/>
}

export default ProtectedRoute