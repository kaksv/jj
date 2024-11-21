export default function Hero() {
  return (
    <section className="py-12">
      <h1 className="text-4xl font-bold text-center">
        Find your next Project
        <br /> or Gig.
      </h1>
      {/* <p className="text-center text-gray-600 mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
        quidem error dignissimos cumque accusamus reprehenderit ex! Dolore at,
        laudantium vero labore, omnis deleniti vitae perferendis nostrum est
        veritatis eveniet praesentium.
      </p> */}
      <form className="flex gap-2 mt-4 max-w-xl mx-auto">
        <input
          type="search"
          className="border w-full py-2 px-4 rounded-full border-gray-400"
          placeholder="Search phrase..."
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full">
          Search
        </button>
      </form>
    </section>
  )
}
