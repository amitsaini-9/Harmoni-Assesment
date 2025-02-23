// src/components/DiscoverSection/DiscoverSection.jsx
function DiscoverSection() {
  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">
          Discover Your Next Favorite Item
        </h2>
        <p className="text-lg mb-8">
          Browse our exclusive collection and find the perfect product tailored
          just for you.
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors">
            Shop
          </button>
          <button className="border border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default DiscoverSection;
