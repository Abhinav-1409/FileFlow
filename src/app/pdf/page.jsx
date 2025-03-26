import ImagesToPDF from "@/components/ImageToPdf";

export default function pdf() {
  return (
    <div className="min-h-screen  w-3/4 flex justify-center mt-10 mx-auto m-1 space-y-4">
      <ImagesToPDF/>
    </div>
  );
}