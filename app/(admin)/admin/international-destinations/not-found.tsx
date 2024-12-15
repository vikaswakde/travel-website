import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Destination Not Found</h2>
      <p className="text-gray-600 mb-4">
        Could not find the requested destination.
      </p>
      <Link
        href="/admin/international-destinations"
        className="text-blue-600 hover:text-blue-800"
      >
        Return to International Destinations
      </Link>
    </div>
  );
}
