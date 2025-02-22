import { useState } from "react";

const academicFilters = ["Study Night", "KHK Talk"];
const socialFilters = ["Limited Invites", "KHK Only", "Big Party", "Party", "Karaoke", "Sports"];
const allEvents = [
  { id: 1, name: "Math Study Night", type: "Academic", category: "Study Night", date: "Feb 15" },
  { id: 2, name: "KHK Speaker Series", type: "Academic", category: "KHK Talk", date: "Feb 20" },
  { id: 3, name: "Big Party", type: "Social", category: "Big Party", date: "Feb 25" },
];

const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filteredEvents = selectedFilter
    ? allEvents.filter((event) => event.category === selectedFilter)
    : allEvents;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Events</h1>

      {/* Filter Section */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div className="flex gap-2 flex-wrap">
          {[...academicFilters, ...socialFilters].map((filter) => (
            <button
              key={filter}
              className={`px-3 py-2 border rounded ${
                selectedFilter === filter ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => setSelectedFilter(selectedFilter === filter ? null : filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white shadow-md rounded-lg p-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
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

export default Events;
