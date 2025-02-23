// src/components/Hero/Hero.jsx
function Hero() {
  return (
    <div className="relative">
      {/* Split background */}
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-white"></div>
        <div className="w-1/2 bg-[#FFF176]"></div> {/* Light yellow color */}
      </div>

      {/* Content */}
      <div className="relative py-32 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="underline">My Store</span>
          </h1>
          <h2 className="text-4xl font-bold mb-6">Your Shopping</h2>
          <h2 className="text-4xl font-bold mb-8">Destination</h2>
          <p className="text-gray-600 text-lg">
            Discover a wide range of products tailored just for you. Shop with
            ease and find exactly what you need.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
