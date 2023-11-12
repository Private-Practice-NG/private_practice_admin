import React from "react";
import HomeAdmins from "../components/HomeAdmins";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { useAdminsMutation } from "../slices/usersApiSlice";
import { setAdmins } from "../slices/usersSlice";
const Admins = () => {
  const dispatch = useDispatch();
  const [users, { isLoading }] = useAdminsMutation();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await users().unwrap();
        dispatch(setAdmins( res.data ));
      } catch (error) {
        console.log(error?.data?.message || error.error);
      }
    }
    fetchData();
  }, []);

  const { admins } = useSelector((state) => state.users);
  return (
    <HomeAdmins admins = {admins}/>
  );
};

export default Admins;
