import { useState } from "react";

const documents = [
  { name: "KHK Constitution", link: "/docs/constitution.pdf" },
  { name: "By-Laws", link: "/docs/bylaws.pdf" },
  { name: "Deep Dives", link: "/docs/deepdives.pdf" },
];

const KHKMaterials = () => {
  const [search, setSearch] = useState("");

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">KHK Materials</h1>
      <input
        type="text"
        placeholder="Search documents..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="bg-white shadow-md rounded-lg p-4">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc, index) => (
            <li key={index} className="py-2 border-b last:border-none">
              <a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {doc.name}
              </a>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No documents found.</p>
        )}
      </ul>
    </div>
  );
};

export default KHKMaterials;
