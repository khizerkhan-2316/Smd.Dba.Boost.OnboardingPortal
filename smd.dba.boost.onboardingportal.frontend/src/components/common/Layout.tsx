import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <main className="App">
      <h1>This is the layout</h1>

      <Outlet />
    </main>
  );
}

export default Layout;
