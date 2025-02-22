import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Major:</strong> {user?.major}</p>
      <p><strong>Delta Number:</strong> {user?.deltaNumber}</p>
      <p><strong>Parent:</strong> {user?.parent}</p>
      <p><strong>Children:</strong> {user?.children?.join(", ") || "None"}</p>
      <button className="mt-4 bg-green-500 text-white p-2 rounded">Update Profile</button>
    </div>
  );
};

export default UserProfile;
