import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">KHK Portal</h1>
        <div>
          <Link className="mx-2" to="/dashboard">Dashboard</Link>
          <Link className="mx-2" to="/profile">Profile</Link>
          <Link className="mx-2" to="/events">Events</Link>
          <Link className="mx-2" to="/financial">Finance</Link>
          <Link className="mx-2" to="/materials">Materials</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
