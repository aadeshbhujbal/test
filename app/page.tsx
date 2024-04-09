"use client";
import Image from "next/image";
import React, { useState, useEffect, ReactNode } from "react";

interface UserData {
  fullName: ReactNode;
  address: ReactNode;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

const Home: React.FC = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((data) => {
        const users = data.results.map((user: any) => {
          const fullName = `${user.name.title} ${user.name.first} ${user.name.last}`;
          const email = user.email;
          const address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`;

          return {
            ...user,
            fullName,
            email,
            address,
          };
        });

        setUsersData(users);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center  bg-blue-200">
      <div className=" py-4 text-white justify-center mx-auto  text-lg max-w-full bg-blue-900 w-full">
        <p className=" mx-auto flex justify-center"> User List</p>
      </div>
      <div className="flex flex-col flex-wrap md:flex-row py-6  gap-4 justify-center">
        {usersData.map((user, index) => (
          <div
            key={index}
            className=" bg-white rounded-xl max-w-xl shadow-md overflow-hidden p-4 self-center justify-center"
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0 self-center">
                <Image
                  className="h-48 rounded-lg w-full self-center  md:w-48"
                  src={user.picture.large}
                  alt="User"
                  width={150}
                  height={150}
                />
              </div>
              <div className="px-8 flex">
                <div className="h-full border-l border-gray-300 mr-4 md:mr-8 !w-1"></div>
                <div className="">
                  <h2 className="text-2xl font-semibold mb-2 text-black">
                    {user.fullName}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="text-gray-600">
                    <strong>Address:</strong> {user.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
