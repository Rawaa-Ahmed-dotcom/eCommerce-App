import { Pencil } from "lucide-react";
import { useAppSelector } from "../store/hooks";
import { useProfile, useProfileImage } from "../Hooks/profile";
import { NavLink, Outlet, useLocation } from "react-router";
import { motion , AnimatePresence} from "motion/react";

const placeholderImage =
  "https://t3.ftcdn.net/jpg/16/22/17/64/360_F_1622176441_HhmUdRSNrwjLjUaOisFuBN9ZUdwoNk2K.jpg";

const ProfilePage = () => {
  const mutation = useProfileImage();
  const { token } = useAppSelector((state) => state.authState);
  const { data } = useProfile();
  const location = useLocation();
  const user = data?.user;
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("profileImage", selectedFile);
    mutation.mutate({ formData, token });
  };

  const imageURL =
    mutation.data?.url || user?.profileImg || placeholderImage;

  return (
    <main className="flex! flex-col px-16 py-20 items-center">
      <div className="flex flex-col items-center">
        <div>
          <input
            type="file"
            className="sr-only peer"
            accept="image/*"
            id="profile-pic"
            onChange={handleFileChange}
          />

          <div
            className={`w-32 h-32 rounded-full ${placeholderImage ? "bg-gray-500" : "bg-transparent"} flex items-center justify-center border-2 relative `}
          >
            <img
              src={imageURL}
              alt="profile-img"
              className="w-full h-full rounded-full object-fit"
            />
            <label
              htmlFor="profile-pic"
              className="w-8 h-8 rounded-full bg-[#416465] flex items-center justify-center absolute left-24 top-20 cursor-pointer"
            >
              <Pencil size={16} color="white" />
            </label>
          </div>
        </div>
        <h2 className="font-semibold text-[32px] text-[#131D21] capitalize mt-3">
          {user?.username}
        </h2>
        <p className="mt-0.5 text-[16px] font-normal font-[Inter] text-[#414848]">
          {user?.email}
        </p>
      </div>
      <section className="flex flex-col items-center mt-20 w-full">
        <div className="flex gap-20 items-center border-b border-b-[#C0C8C7] w-full justify-center relative uppercase">
          <NavLink to="/profile" end className="relative pb-3">
            {({ isActive }) => (
              <>
                <span
                  className={
                    isActive ? "text-[#416465] font-semibold" : "text-[#414848]"
                  }
                >
                  my profile
                </span>
                {isActive && (
                  <motion.div
                    layoutId="profile-tab-underline"
                    className="absolute -bottom-px left-0 right-0 h-0.5 bg-[#416465]"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </>
            )}
          </NavLink>

          <NavLink to="ordershistory" className="relative pb-3">
            {({ isActive }) => (
              <>
                <span
                  className={
                    isActive
                      ? "text-[#416465] font-semibold"
                      : "text-[#414848] "
                  }
                >
                  orders history
                </span>
                {isActive && (
                  <motion.div
                    layoutId="profile-tab-underline"
                    className="absolute -bottom-px left-0 right-0 h-0.5 bg-[#416465]"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </>
            )}
          </NavLink>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-[#F1FBFF] mt-5 rounded-xl min-h-screen"
          >
            <Outlet/>
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
};

export default ProfilePage;
