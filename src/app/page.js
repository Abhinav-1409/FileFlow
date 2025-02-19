"use client"

export default function Home() {
  return (
    <div className="grid grid-cols-3  place-items-center justify-center gap-10 m-10">
      <div className="w-full  border rounded border-gray-900 m-4 p-2">
        Image Conversion
      </div>
      <div className="w-full row-span-1  border rounded border-gray-900 m-2 p-4">
        Image Compression
      </div>
      <div className="row-span-1 w-full border rounded border-gray-900 m-2 p-4">
        File sharing
      </div>
      <div className="row-span-1 w-full border rounded border-gray-900 m-2 p-4">
        url short
      </div>
      <div className="row-span-1 w-full border rounded border-gray-900 m-2 p-4">
        pdf text extract
      </div>
    </div>
  );
}
