// components/AdminRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../components/authContext.jsx';

const AdminRoute = () => {
  const { user, loading } = useAuth();

  console.log('🔒 AdminRoute check:', { 
    loading, 
    user: user?.email, 
    role: user?.role 
  });


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-lg text-gray-700">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
