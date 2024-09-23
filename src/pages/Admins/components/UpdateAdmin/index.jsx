import { useState, useEffect } from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi2';
import { TfiEmail } from 'react-icons/tfi';
import { SlLock } from 'react-icons/sl';
import { HiOutlineUser } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNav } from '../../../../slices/usersSlice';
import FadeLoader from 'react-spinners/FadeLoader';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../../../components/Layout';
import { getAccessToken, getUserInfo } from '../../../../utils/tokenUtils';
import { showModal } from '../../../../slices/modalSlice';

function UpdateAdmin() {
  const { adminId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [updateAdminForm, setUpdateAdminForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: null
  });

  // const [isFilePicked, setIsFilePicked] = useState(false);
  // const toastId = toast.loading('creating admin account...');
  // Fetch admin profile data on mount
  useEffect(() => {
    const toastId = toast.loading('Signing you in...');

    async function fetchAdminProfile() {
      try {
        const accessToken = getAccessToken();
        const userInfo = getUserInfo();

        if (!accessToken || !adminId) {
          dispatch(
            showModal({
              title: 'Authentication Error',
              message:
                'Access token or user email is missing. Please log in again.'
            })
          );
          setIsLoading(false);
          return;
        }

        console.log('Fetching profile for adminId: ', adminId);

        const response = await axios.get(
          `http://localhost:3001/api/v1/admin/get-admin-profile/${adminId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              email: userInfo.email,
              'Content-Type': 'application/json'
            }
          }
        );

        const profileData = response.data.response.adminProfile;

        setUpdateAdminForm({
          fullName: profileData.fullName,
          email: profileData.email,
          password: '',
          confirmPassword: ''
        });

        toast.success('Profile fetched successfully', { id: toastId });
      } catch (error) {
        console.error('Error fetching admin profile: ', error);
        toast.error(error?.response?.data?.message || 'Something went wrong.', {
          id: toastId
        });
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAdminProfile();
    dispatch(setNav('/admins'));
  }, [dispatch, adminId]);

  async function updateAdminProfile(e) {
    e.preventDefault();

    if (
      updateAdminForm.fullName === '' ||
      updateAdminForm.email === '' ||
      updateAdminForm.password === '' ||
      updateAdminForm.confirmPassword === ''
    ) {
      toast.error('Please fill in all fields', { duration: 3000 });
      return;
    }

    if (updateAdminForm.password !== updateAdminForm.confirmPassword) {
      toast.error(`Passwords don't match`, { duration: 3000 });
      return;
    }

    if (updateAdminForm.password.length < 6) {
      toast.error('Password must be at least 6 characters', { duration: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append('fullName', updateAdminForm.fullName);
    formData.append('email', updateAdminForm.email);
    formData.append('password', updateAdminForm.password);
    if (updateAdminForm.profileImage) {
      formData.append('profileImage', updateAdminForm.profileImage);
    }

    const toastId = toast.loading('Updating admin profile...');

    try {
      const accessToken = getAccessToken();
      const userInfo = getUserInfo();
      const userEmail = userInfo?.email;

      console.log('Access Token:', accessToken);
      console.log('User Info:', userInfo);
      console.log('User Email:', userEmail);

      if (!accessToken || !adminId) {
        dispatch(
          showModal({
            title: 'Authentication Error',
            message:
              'Access token or user email is missing. Please log in again.'
          })
        );
        // setIsLoading(false);
        return;
      }

      await axios.post(
        'http://localhost:3001/api/v1/admin/update-admin',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Email: userInfo.email,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      toast.success('Admin profile updated successfully', {
        id: toastId,
        duration: 4000
      });
      navigate('/admins');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        'Something went wrong. Please try again.';
      dispatch(
        showModal({
          title: 'Error',
          message: errorMessage
        })
      );
      toast.dismiss(toastId);
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="spinner flex justify-center items-center pt-[100px]">
          <FadeLoader
            color={'#10ACF5'}
            loading={true}
            height={40}
            width={2}
            radius={10}
            margin={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </Layout>
    );
  }

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
          <form className="xsm:w-[500px] xsm:mx-auto flex flex-col mt-10 auth-form">
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
                    className="rounded-[5px] absolute shadow text-center w-[40px] sm:w-[45px] h-full flex items-center justify-center text-[18px] text-gray-500"
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
                    placeholder="Enter full name"
                    value={updateAdminForm.fullName || ''}
                    onChange={(e) =>
                      setUpdateAdminForm({
                        ...updateAdminForm,
                        fullName: e.target.value
                      })
                    }
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
                    className="rounded-[5px] absolute shadow text-center w-[40px] sm:w-[45px] h-full flex items-center justify-center text-[18px] text-gray-500"
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
                    value={updateAdminForm.email || ''}
                    onChange={(e) =>
                      setUpdateAdminForm({
                        ...updateAdminForm,
                        email: e.target.value
                      })
                    }
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
                    value={updateAdminForm.password || ''}
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
                    value={updateAdminForm.confirmPassword || ''}
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
                    // setIsFilePicked(true);
                  }}
                />
              </div>
            </section>
            <button
              className="mt-10 btn auth-submit-btn poppins py-4"
              type="submit"
              onClick={updateAdminProfile}
            >
              Update Admin
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
}

export default UpdateAdmin;
