// import React from "react";
import HomeAdmins from "../components/HomeAdmins";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAdminsMutation } from "../slices/usersApiSlice";
import { setAdmins } from "../slices/usersSlice";
import { setNav } from "../slices/usersSlice";
import FadeLoader from "react-spinners/FadeLoader";

const override = {
  margin: "0 auto",
  width: "100%",
  top: "35%",
  left: "35%",
};
const Admins = () => {
  const dispatch = useDispatch();
  const [users, { isLoading }] = useAdminsMutation();

  useEffect(() => {
    dispatch(setNav("Admin"));
    async function fetchData() {
      try {
        const res = await users().unwrap();
        dispatch(setAdmins(res.data));
      } catch (error) {
        console.log(error?.data?.message || error.error);
      }
    }
    fetchData();
  }, []);

  const { admins } = useSelector((state) => state.users);
  return (
    <>
      {isLoading ? (
        <>
          <div className="spinner">
            <FadeLoader
              color={"#10ACF5"}
              loading={isLoading}
              cssOverride={override}
              size={300}
              height={50}
              width={5}
              radius={10}
              margin={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </>
      ) : (
        <>
          <HomeAdmins admins={admins} />
        </>
      )}
    </>
  );
};

export default Admins;
