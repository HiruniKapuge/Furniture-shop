import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import Title from '../components/Title';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* About Us Section */}
      <section className="text-center pt-8 border-t border-gray-200" aria-labelledby="about-heading">
        <Title text1={'ABOUT'} text2={'US'} id="about-heading" />
        <div className="my-12 px-4 sm:px-6 flex flex-col md:flex-row gap-8 md:gap-16 animate-fade-in">
          <img
            className="w-full md:max-w-[450px] rounded-lg shadow-md object-cover"
            src={assets.About}
            alt="New Sisira Furniture Shop showroom in Kamburupitiya"
            loading="lazy"
          />
          <div className="flex flex-col justify-center gap-6 md:w-1/2 text-gray-700 text-base leading-relaxed">
            <p>
              Welcome to <span className="font-semibold text-pink-700">New Sisira Furniture Shop</span>, your trusted destination for high-quality, stylish furniture in Kamburupitiya. Since our founding, we’ve been dedicated to transforming homes and offices with elegant, durable, and functional pieces.
            </p>
            <p>
              Whether you’re seeking modern designs or timeless classics, our curated collection caters to every style and budget. We source the finest materials and uphold exceptional craftsmanship to ensure every piece brings comfort and beauty to your space.
            </p>
            <p>
              At New Sisira, customer satisfaction is our priority. Our friendly team is here to guide you in selecting the perfect furniture, making your shopping experience seamless and enjoyable. Thank you for choosing us to furnish your living spaces!
            </p>
            <div>
              <b className="text-lg text-gray-800">Our Mission</b>
              <p className="mt-2">
                To enrich lives with affordable, high-quality furniture that blends comfort, style, and functionality. We strive to deliver exceptional service, foster lasting relationships, and innovate to meet our community’s evolving needs.
              </p>
            </div>
            <Link
              to="/collection"
              className="inline-block mt-4 px-6 py-3 bg-pink-700 text-white rounded-md hover:bg-pink-800 transition-colors text-center font-medium"
              aria-label="Explore our furniture collection"
            >
              Explore Our Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="text-center pt-8 border-t border-gray-200" aria-labelledby="why-choose-heading">
        <Title text1={'WHY'} text2={'CHOOSE US'} id="why-choose-heading" />
        <div className="my-12 px-4 sm:px-6 flex flex-col md:flex-row gap-6 mb-20 animate-fade-in">
          <div
            className="border border-gray-200 rounded-lg px-6 sm:px-10 py-8 sm:py-12 flex flex-col gap-4 bg-gray-50 hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
            onMouseEnter={(e) => e.currentTarget.classList.add('scale-105')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('scale-105')}
          >
            <h3 className="text-lg font-semibold text-gray-800">Quality</h3>
            <p className="text-gray-700">
              We use premium materials and innovative designs to create furniture that’s built to last, ensuring both durability and aesthetic appeal.
            </p>
          </div>
          <div
            className="border border-gray-200 rounded-lg px-6 sm:px-10 py-8 sm:py-12 flex flex-col gap-4 bg-gray-50 hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
            onMouseEnter={(e) => e.currentTarget.classList.add('scale-105')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('scale-105')}
          >
            <h3 className="text-lg font-semibold text-gray-800">Convenience</h3>
            <p className="text-gray-700">
              Enjoy a seamless shopping experience with our user-friendly website, flexible delivery options, and personalized support, making furnishing your space effortless.
            </p>
          </div>
          <div
            className="border border-gray-200 rounded-lg px-6 sm:px-10 py-8 sm:py-12 flex flex-col gap-4 bg-gray-50 hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
            onMouseEnter={(e) => e.currentTarget.classList.add('scale-105')}
            onMouseLeave={(e) => e.currentTarget.classList.remove('scale-105')}
          >
            <h3 className="text-lg font-semibold text-gray-800">Exceptional Customer Service</h3>
            <p className="text-gray-700">
              Our dedicated team is always ready to assist, ensuring a smooth and enjoyable shopping experience tailored to your needs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;