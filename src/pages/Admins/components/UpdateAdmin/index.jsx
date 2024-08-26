import { useState, useEffect } from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi2';
// import { Link } from 'react-router-dom';
import { TfiEmail } from 'react-icons/tfi';
import { SlLock } from 'react-icons/sl';
import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNav } from '../../../../slices/usersSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Layout from '../../../../components/Layout';


function UpdateAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateAdminForm, setUpdateAdminForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: null
  });

  const [isFilePicked, setIsFilePicked] = useState(false);

  async function createAdminUser(e) {
    e.preventDefault();

    if (
      updateAdminForm.fullName === '' ||
      updateAdminForm.email === '' ||
      updateAdminForm.password === '' ||
      updateAdminForm.confirmPassword === ''
    ) {
      toast.error('please fill in all fields', { duration: 3000 });
      return;
    }

    if (updateAdminForm.password !== updateAdminForm.confirmPassword) {
      toast.error(`'password' and 'confirmPassword' do not match`, {
        duration: 3000
      });
      return;
    }

    if (
      updateAdminForm.password.length < 6 ||
      updateAdminForm.confirmPassword.length < 6
    ) {
      toast.error('passwords must be at least 6 characters', {
        duration: 3000
      });
      return;
    }

    if (!isFilePicked || updateAdminForm.selectedImageFile === null) {
      toast.error(
        'you have not selected a profile picture, please select one',
        {
          duration: 3000
        }
      );
      return;
    }

    console.log(updateAdminForm);

    const formData = new FormData();
    formData.append('profileImage', updateAdminForm.profileImage);

    // console.log(formData);
    console.log(updateAdminForm.profileImage);

    const toastId = toast.loading('creating admin account...');

    try {
      const updatedUser = await axios.post(
        'http://localhost:5000/api/admins/register-admin', // this is the endpoint for creating a new user
        {
          fullName: updateAdminForm.fullName,
          email: updateAdminForm.email,
          password: updateAdminForm.password,
          profileImage: updateAdminForm.profileImage
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTg3YTI4NjJiNmE3NTgyZDQwNTQ1YzUiLCJ1c2VyRW1haWwiOiJva3BhaW5tb2FuZHJld0BnbWFpbC5jb20iLCJpYXQiOjE3MDM3NDA1MDgsImV4cCI6MTcwMzc0NDEwOH0.ZciIvPr5tpRTyUk20cgeSrweqYQhZja6P1rPO7c0Ylk`,
            // Email: `okpainmoandrew@gmail.com`
          }
        }
      );

      console.log(updatedUser);

      if (
        updatedUser
        // &&
        // updatedUser.data.requestStatus === 'admin account created successfully'
      ) {
        toast.success('admin account created successfully', {
          id: toastId,
          duration: 4000
        });
      }

      setUpdateAdminForm({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: null
      });

      // localStorage.setItem('userToken', `${updatedUser.data.token}`);
      // localStorage.setItem('userEmail', `${updatedUser.data.user.email}`);
      // const userToken = localStorage.getItem('userToken');
      // const userEmail = localStorage.getItem('userEmail');
      // console.log(userToken, userEmail);
      // const userName = updatedUser.data.user.fullName;
      // console.log(userName);
      // localStorage.setItem('userName', `${userName}`);

      setTimeout(() => {
        navigate('/admins');
      }, 2000);
    } catch (error) {
      toast.error('error creating user', { id: toastId, duration: 3000 });
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(setNav('Admin'));
  }, []);

  return (
    <Layout>
      <div>
        <div
          onClick={() => navigate(-1)}
          className="return-button-wrapper cursor-pointer flex gap-3 items-center poppins"
        >
          <HiOutlineChevronLeft className="text-[16px]" />
          <span className="font-[600]">Back</span>
        </div>
        <section className="mt-16 mx-auto">
          <h2 className="text-2xl sm:text-3xl poppins text-center font-[500]">
            Update admin account
          </h2>
          <form
            //   onSubmit={submitHandler}
            className="xsm:w-[500px] xsm:mx-auto flex flex-col mt-10 auth-form"
          >
            <section className="flex flex-col gap-6">
              <div className="auth-form-input flex flex-col">
                <label
                  htmlFor="fullName"
                  className="text-left w-full mb-3 poppins"
                >
                  Full name
                </label>
                <section className="w-full relative">
                  <div
                    className="rounded-[5px] absolute shadow text-center w-[40px] sm:w-[45px] h-full flex items-center justify-center text-[18px]
               text-gray-500"
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.1) -1px -1px 12px 1px'
                    }}
                  >
                    <HiOutlineUser />
                  </div>
                  <input
                    id="fullName"
                    className="text-gray-500 outline-none pl-[50px] sm:pl-[60px] py-3.5 px-4 w-full rounded-[5px] text-[14px]"
                    type="text"
                    placeholder="enter full name"
                    value={updateAdminForm.fullName}
                    onChange={(e) => {
                      setUpdateAdminForm({
                        ...updateAdminForm,
                        fullName: e.target.value
                      });
                    }}
                    required
                  />
                </section>
              </div>
              <div className="auth-form-input flex flex-col">
                <label
                  htmlFor="email"
                  className="text-left w-full mb-3 poppins"
                >
                  Email
                </label>
                <section className="w-full relative">
                  <div
                    className="rounded-[5px] absolute shadow text-center w-[40px] sm:w-[45px] h-full flex items-center justify-center text-[18px]
               text-gray-500"
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.1) -1px -1px 12px 1px'
                    }}
                  >
                    <TfiEmail />
                  </div>
                  <input
                    className="text-gray-500 outline-none pl-[50px] sm:pl-[60px] py-3.5 px-4 w-full rounded-[5px] text-[14px]"
                    type="email"
                    placeholder="youremail@email.com"
                    required
                    value={updateAdminForm.email}
                    onChange={(e) => {
                      setUpdateAdminForm({
                        ...updateAdminForm,
                        email: e.target.value
                      });
                    }}
                    id="email"
                  />
                </section>
              </div>
              <div className="auth-form-input flex flex-col">
                <label
                  htmlFor="password"
                  className="text-left w-full mb-3 poppins"
                >
                  Password
                </label>
                <section className="w-full relative">
                  <div
                    className="rounded-[5px] absolute shadow text-center w-[40px] sm:w-[45px] h-full flex items-center justify-center text-[18px]
               text-gray-500"
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.1) -1px -1px 12px 1px'
                    }}
                  >
                    <SlLock />
                  </div>
                  <input
                    className="text-gray-500 outline-none pl-[50px] sm:pl-[60px] py-3.5 px-4 w-full rounded-[5px] text-[14px]"
                    type="password"
                    placeholder="Password"
                    value={updateAdminForm.password}
                    onChange={(e) => {
                      setUpdateAdminForm({
                        ...updateAdminForm,
                        password: e.target.value
                      });
                    }}
                    id="password"
                    required
                  />
                </section>
              </div>
              <div className="auth-form-input flex flex-col">
                <label
                  htmlFor="confirmPassword"
                  className="text-left w-full mb-3 poppins"
                >
                  Confirm Password
                </label>
                <section className="w-full relative">
                  <div
                    className="rounded-[5px] absolute shadow text-center w-[40px] sm:w-[45px] h-full flex items-center justify-center text-[18px]
               text-gray-500"
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.1) -1px -1px 12px 1px'
                    }}
                  >
                    <SlLock />
                  </div>
                  <input
                    className="text-gray-500 outline-none pl-[50px] sm:pl-[60px] py-3.5 px-4 w-full rounded-[5px] text-[14px]"
                    type="password"
                    placeholder="confirm password"
                    value={updateAdminForm.confirmPassword}
                    onChange={(e) => {
                      setUpdateAdminForm({
                        ...updateAdminForm,
                        confirmPassword: e.target.value
                      });
                    }}
                    id="confirmPassword"
                    required
                  />
                </section>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="text-left w-full mb-3 poppins"
                >
                  Profile image
                </label>
                <input
                  type="file"
                  id="profileImage"
                  multiple
                  onChange={(e) => {
                    setUpdateAdminForm({
                      ...updateAdminForm,
                      profileImage: e.target.files[0]
                    });
                    setIsFilePicked(true);
                  }}
                />
              </div>
            </section>
            {/* <Link
            className="mt-3 text-right underline text-[12px]"
            to="/forgot-password"
          >
            Forget Password
          </Link> */}

            <button
              className="mt-10 btn auth-submit-btn poppins py-4"
              type="submit"
              onClick={createAdminUser}
            >
              Create admin
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
}

export default UpdateAdmin;
