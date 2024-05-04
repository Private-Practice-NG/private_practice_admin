import { useState } from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { TfiEmail } from 'react-icons/tfi';
import { SlLock } from 'react-icons/sl';
import { HiOutlineUser } from 'react-icons/hi2';

function CreateAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <Link
        to="/admins"
        className="return-button-wrapper flex gap-3 items-center poppins"
      >
        <HiOutlineChevronLeft className="text-[16px]" />
        <span className="font-[600]">Back</span>
      </Link>
      <section className="mt-16 mx-auto">
        <h2 className="text-2xl sm:text-3xl poppins text-center font-[500]">
          Create an admin account
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
                  style={{ boxShadow: 'rgba(0, 0, 0, 0.1) -1px -1px 12px 1px' }}
                >
                  <HiOutlineUser />
                </div>
                <input
                  id="fullName"
                  className="text-gray-500 outline-none pl-[50px] sm:pl-[60px] py-3.5 px-4 w-full rounded-[5px] text-[14px]"
                  type="text"
                  placeholder="enter full name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </section>
            </div>
            <div className="auth-form-input flex flex-col">
              <label
                htmlFor="fullName"
                className="text-left w-full mb-3 poppins"
              >
                Email
              </label>
              <section className="w-full relative">
                <div
                  className="rounded-[5px] absolute shadow text-center w-[40px] sm:w-[45px] h-full flex items-center justify-center text-[18px]
               text-gray-500"
                  style={{ boxShadow: 'rgba(0, 0, 0, 0.1) -1px -1px 12px 1px' }}
                >
                  <TfiEmail />
                </div>
                <input
                  className="text-gray-500 outline-none pl-[50px] sm:pl-[60px] py-3.5 px-4 w-full rounded-[5px] text-[14px]"
                  type="email"
                  placeholder="youremail@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </section>
            </div>
            <div className="auth-form-input flex flex-col">
              <label
                htmlFor="fullName"
                className="text-left w-full mb-3 poppins"
              >
                Password
              </label>
              <section className="w-full relative">
                <div
                  className="rounded-[5px] absolute shadow text-center w-[40px] sm:w-[45px] h-full flex items-center justify-center text-[18px]
               text-gray-500"
                  style={{ boxShadow: 'rgba(0, 0, 0, 0.1) -1px -1px 12px 1px' }}
                >
                  <SlLock />
                </div>
                <input
                  className="text-gray-500 outline-none pl-[50px] sm:pl-[60px] py-3.5 px-4 w-full rounded-[5px] text-[14px]"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </section>
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
          >
            Create admin
          </button>
        </form>
      </section>
    </div>
  );
}

export default CreateAdmin;
