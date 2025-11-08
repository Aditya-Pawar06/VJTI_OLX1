import React from 'react';

const ProfileHeader = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p><strong>Username:</strong> johndoe</p>
      <p><strong>Rating:</strong> ⭐⭐⭐⭐ 4.5/5</p>
    </div>
  );
};

export default ProfileHeader;
