import { Outlet } from 'react-router-dom';
import Navigtionbar from './Navigationbar';
function Layout() {
  return (
    <div className="App">
      <Navigtionbar />
      <main className="Content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
