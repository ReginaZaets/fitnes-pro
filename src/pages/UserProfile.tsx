import { Outlet } from "react-router-dom";

import Profile from "../components/common/Profile";

const UserProfile = () => {
  return (
    <>
      <main>
       <Profile/>
        <Outlet />
      </main>
    </>
  );
};

export default UserProfile;
