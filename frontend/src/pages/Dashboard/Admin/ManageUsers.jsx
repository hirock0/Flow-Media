import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast";
import useUsers from "../../../hooks/useUsers";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import axios from "axios";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, isLoading, refetch] = useUsers();
  const handleRoleChange = async (user, newRole) => {
    try {
      await axiosSecure.patch(`/api/users/role/${user._id}`, { role: newRole });
      // Optionally refetch users or update state
      refetch();
      alert("user role updated");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteUser = (uid) => {
    toast.custom((t) => (
      <div className="bg-white p-2 rounded shadow-lg flex flex-col md:flex-row items-center gap-3">
        <span className="text-[var(--background)]">
          Are you sure you want to delete?
        </span>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={async () => {
              toast.dismiss(t.id);
              await axios.delete(
                `${import.meta.env.VITE_FLOW_MRDIA_API}/api/user/${uid}`
              );
              toast.success("Deleted successfully!");
              refetch();
            }}
          >
            Delete
          </button>
          <button
            className="bg-green-500 px-2 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Manage Users</title>
      </Helmet>
      <div className="mt-10">
        <h4 className="text-2xl font-bold  mb-8 uppercase">User data</h4>

        <div className="overflow-x-auto rounded-box  border-base-content/5 bg-[var(--secondary)]">
          <table className="table border">
            {/* head */}
            <thead>
              <tr className="text-[var(--text)]">
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Subscribtion</th>
                <th>Role</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td className="uppercase">{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        user?.subscribe === "active"
                          ? "bg-green-50 text-green-800"
                          : user?.subscribe === "expired"
                          ? "bg-red-50 text-red-800"
                          : "bg-yellow-50 text-yellow-800"
                      }`}
                    >
                      {/* Status Dot */}
                      <span
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          user?.subscribe === "active"
                            ? "bg-green-600"
                            : user?.subscribe === "expired"
                            ? "bg-red-600"
                            : "bg-yellow-600"
                        }`}
                      ></span>

                      {/* Status Text */}
                      {user?.subscribe === "active"
                        ? "Active"
                        : user?.subscribe === "expired"
                        ? "Expired"
                        : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <select
                      value={user?.role}
                      onChange={(e) => handleRoleChange(user, e.target.value)}
                      className="bg-[var(--secondary)] border rounded px-2 py-1"
                    >
                      <option value="admin">Admin</option>
                      <option value="affiliate">Affiliate</option>
                      <option value="user">User</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user?.uid)}
                      className="bg-red-500 hover:bg-red-600 py-1.5 px-4 cursor-pointer"
                    >
                      <MdDeleteForever className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
