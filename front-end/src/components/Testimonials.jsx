import { testimonials } from "../Assest/assests";

const Testimonials = () => {
  return (
    <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
        They love us. You will too.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col max-w-md mx-auto md:mx-0 justify-between rounded-xl shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col px-6 pt-8 mb-10 space-y-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="text-gray-400 dark:text-gray-600 mb-4"
              >
                <path d="M7.17 6A5.992 5.992 0 0 0 2 12v7h7v-7H5.4c.43-1.72 1.86-3.1 3.6-3.6V6zm10 0A5.992 5.992 0 0 0 12 12v7h7v-7h-3.6c.43-1.72 1.86-3.1 3.6-3.6V6z" />
              </svg>
              <p className="text-gray-700 m-0" style={{ hyphens: "auto" }}>
                {testimonial.quote}
              </p>
            </div>
            <div className="flex space-x-2 bg-gray-50 px-6 pt-6 pb-6 rounded-b-xl">
              <div className="flex flex-col justify-center">
                <p className="font-semibold text-gray-900 m-0">
                  {testimonial.author}
                </p>
                <p className="text-gray-500 text-sm m-0 mt-1">
                  {testimonial.handle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
