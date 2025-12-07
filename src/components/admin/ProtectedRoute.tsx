import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import React from "react";
import { Loader } from "../ui";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="p-10 flex justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
