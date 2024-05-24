"use client";

import { setProfile } from "@/redux/ProfileSlice";
import { SignOutButton, SignedOut, useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const getUserProfile = useCallback(async () => {
    if (user) {
      const res = await axios.get("/api/user");
      dispatch(setProfile(res.data.user));
    }
  }, [dispatch, user]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <div className="shadow-sm">
      <div className="navbar bg-base-100 max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64"
            >
              {user && (
                <>
                  <li>
                    <Link href={"/tracking"}>Tracking</Link>
                  </li>
                  <li>
                    <Link href={"/collection"}>Collection</Link>
                  </li>
                </>
              )}
              <li>
                <Link href={"/info"}>Info</Link>
              </li>
              <li>
                <Link href={"/about"}>About</Link>
              </li>
              <li>
                <Link href={"/feedback"}>Feedback</Link>
              </li>
            </ul>
          </div>
          <Link href={"/"} className="text-sm md:text-xl">
            Diabetes Prediction{" "}
            <span className="hidden sm:inline-block">🩺</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 md:gap-3">
            {user && (
              <>
                <li>
                  <Link href={"/tracking"}>Tracking</Link>
                </li>
                <li>
                  <Link href={"/collection"}>Collection</Link>
                </li>
              </>
            )}
            <li>
              <Link href={"/info"}>Info</Link>
            </li>
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <li>
              <Link href={"/feedback"}>Feedback</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-2">
          {!user ? (
            <>
              <Link href={"/sign-up"}>
                <button className="btn btn-xs btn-outline btn-neutral">
                  Sign Up
                </button>
              </Link>
              <Link href={"/sign-in"}>
                <button className="btn btn-xs btn-active btn-neutral">
                  Sign In
                </button>
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Image
                    src={
                      auth?.imageUrl ||
                      "https://avatars.githubusercontent.com/u/33460?v=4"
                    }
                    alt={`${auth?.fullName}'s profile`}
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href={"/profile"} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <SignOutButton>
                    <span>Sign Out</span>
                  </SignOutButton>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
