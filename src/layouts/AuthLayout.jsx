import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  console.log("AuthLayout rendered");
  return (
    <div className="min-h-screen flex flex-col">
        <Outlet />
    </div>
  );
}