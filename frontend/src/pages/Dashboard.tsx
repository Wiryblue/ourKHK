import { Link } from "react-router-dom";

const upcomingEvents = [
  { id: 1, name: "Math Study Night", date: "Feb 15", type: "Academic" },
  { id: 2, name: "Big Party", date: "Feb 25", type: "Social" },
];

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the KHK Portal</h1>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Link to="/profile" className="p-4 bg-blue-500 text-white rounded-lg text-center">My Profile</Link>
        <Link to="/events" className="p-4 bg-green-500 text-white rounded-lg text-center">Upcoming Events</Link>
        <Link to="/financial" className="p-4 bg-red-500 text-white rounded-lg text-center">Financials</Link>
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <div key={event.id} className="py-2 border-b last:border-none">
              <p className="font-bold">{event.name}</p>
              <p className="text-gray-600">{event.date} - {event.type}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
