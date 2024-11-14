import React from 'react';

const SearchBox = ({ onSearch }) => {
  return (
    <div className="mb-4 w-full custom-md:w-64">
      <input
        type="text"
        placeholder="Search..."
        onChange={onSearch}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default SearchBox;