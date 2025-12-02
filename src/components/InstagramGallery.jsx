const galleryItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1603570429218-4eb6e1f0d137",
    link: "https://instagram.com/jagdambajewellers",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1606312618325-36d00450d8e8",
    link: "https://instagram.com/jagdambajewellers",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1603570417987-5bb1f3c8e47a",
    link: "https://instagram.com/jagdambajewellers",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1589120478440-bac4589a9f2f",
    link: "https://instagram.com/jagdambajewellers",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1615828059590-30ef3b1098fd",
    link: "https://instagram.com/jagdambajewellers",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1611251135341-cb6f63f9e1dc",
    link: "https://instagram.com/jagdambajewellers",
  },
];

const InstagramGallery = () => {
  return (
    <section className="bg-[#fffaf0] py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Moments on Instagram</h2>
        <p className="text-gray-600 mb-10">Real people. Real elegance. Follow us for more!</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item) => (
            <a
              href={item.link}
              key={item.id}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={`${item.image}?auto=format&fit=crop&w=600&q=80`}
                alt="Instagram Post"
                className="w-full h-60 object-cover transform group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <span className="text-white font-medium text-lg">View on Instagram</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
