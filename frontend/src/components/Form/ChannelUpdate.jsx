import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ChannelUpdate = ({ refetch, channel, closeModal }) => {
  const axiosSecure = useAxiosSecure();

  // Set initial checkbox value based on existing channel type
  const [isFree, setIsFree] = useState(false);

  useEffect(() => {
    if (channel?.type === "free") {
      setIsFree(true);
    }
  }, [channel]);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      category: channel?.category,
      channelName: channel?.channelName,
      channelLogo: channel?.channelLogo,
      channelURL: channel?.channelURL,
    },
  });

  const handleUpdateChannel = async (data) => {
    const updatedData = {
      ...data,
      type: isFree ? "free" : "paid", // Always send type
    };

    try {
      const res = await axiosSecure.patch(`/api/update/${channel?._id}`, updatedData);
      refetch();
      closeModal(false);
      toast.success(res?.data?.message || "Channel updated successfully!");
    } catch (error) {
      toast.error(error.message || "Update failed.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center h-screen px-4">
      <div className="bg-[var(--secondary)] rounded-lg p-8 shadow-lg max-w-3xl w-full relative">
        <button
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100 bg-gray-100 transition-colors"
          onClick={() => closeModal(false)}
        >
          <IoClose className="text-red-500 hover:text-red-700 text-2xl" />
        </button>

        <h2 className="text-center text-xl font-bold mb-6 text-[var(--text)]">
          Update {channel?.channelName}
        </h2>

        <form
          onSubmit={handleSubmit(handleUpdateChannel)}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Channel Category */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="category"
              className="flex items-center justify-between text-[var(--text)]"
            >
              <span>Category</span>
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isFree}
                  onChange={(e) => setIsFree(e.target.checked)}
                />
                <span>Want to Free</span>
              </span>
            </label>
            <input
              type="text"
              name="category"
              className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
              defaultValue={channel?.category}
              disabled
            />
          </div>

          {/* Channel Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="channelName" className="text-[var(--text)]">
              Channel Name
            </label>
            <input
              type="text"
              name="channelName"
              {...register("channelName")}
              className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
              defaultValue={channel?.channelName}
            />
          </div>

          {/* Channel Logo */}
          <div className="flex flex-col gap-2">
            <label htmlFor="channelLogo" className="text-[var(--text)]">
              Channel Logo
            </label>
            <input
              type="text"
              name="channelLogo"
              {...register("channelLogo")}
              className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
              defaultValue={channel?.channelLogo}
            />
          </div>

          {/* Channel URL */}
          <div className="flex flex-col gap-2">
            <label htmlFor="channelURL" className="text-[var(--text)]">
              Channel URL
            </label>
            <input
              type="text"
              name="channelURL"
              {...register("channelURL")}
              className="w-full py-3 px-4 rounded-md border border-gray-300 focus:outline-none text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] bg-[var(--background)]"
              defaultValue={channel?.channelURL}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="primary-btn w-full col-span-1 lg:col-span-2 mt-4"
          >
            Update Channel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChannelUpdate;
