export default function Loading() {
  return (
    <div className="px-4 py-6 md:px-8 lg:px-16 xl:px-24">
      <div className="animate-pulse">
        <div className="h-8 w-32 bg-gray-200 rounded mb-6" />
        <div className="h-10 w-48 bg-gray-200 rounded mx-auto mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 rounded-lg" />
          <div className="h-64 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
