"use client";
import { useState } from "react";

import Link from "next/link";

const Dashboard = () => {
  const user = { name: "Abhinav", email: "abhinav@mail.com" };
  const urls = [
    { title: "He1", url: "https://example.com" },
    { title: "He1", url: "https://google.com" },
    { title: "He1", url: "https://github.com" },
    { title: "He1", url: "https://nextjs.org" },
    { title: "He1", url: "https://example.com" },
    { title: "He1", url: "https://google.com" },
    { title: "He1", url: "https://github.com" },
    { title: "He1", url: "https://nextjs.org" },
    { title: "He1", url: "https://example.com" },
    { title: "He1", url: "https://google.com" },
    { title: "He1", url: "https://github.com" },
    { title: "He1", url: "https://nextjs.org" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // Calculate total pages
  const totalPages = Math.ceil(urls.length / itemsPerPage);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = urls.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="flex flex-col items-center justify-start p-16 min-h-screen gap-10 bg-gray-100 border">
      <div className="shadow-md w-1/2 p-4 flex justify-center rounded-lg">
        <div className="border-2 border-[#27667B] rounded-lg bg-gray-200 w-full flex flex-col items-stretch p-5 gap-y-4">
          <pre>Name : {user.name}</pre>
          <pre>Email : {user.email}</pre>
        </div>
      </div>

      <div className="shadow-md w-1/2 p-4 flex flex-col justify-center items-center gap-y-4 rounded-lg">
        <div className="border-2 border-[#27667B] rounded-lg bg-gray-200 w-full flex flex-col items-stretch p-5 gap-y-4 h-[300px] overflow-hidden">
          <h3 className="font-bold text-[#143D60]">Files Shared</h3>
          <ul className="list-disc p-4 space-y-2 h-full overflow-y-auto">
            {currentItems.length > 0 ? (
              currentItems.map((url, index) => (
                <li key={index} className="text-blue-600 underline">
                  <Link href={url.url} target="_blank">
                    {url.title}: {url.url}
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No files shared yet.</p>
            )}
          </ul>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            &lt;
          </button>

          <span className="text-sm flex items-center justify-center w-24">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
