export const About = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          About Have You Seen?
        </h1>
        <p className="mt-4 text-lg leading-6 text-gray-600">
          This application is an efficient Have You Seen poster we use to find
          people and other loved beings.
        </p>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our mission is to make the world a better place by enabling seamless
            and efficient interactions through technology.
          </p>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900">Our Team</h2>
          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {/* You can repeat this section for each team member */}
            <div className="bg-white rounded-lg shadow-lg">
              <img
                className="w-full mx-auto aspect-square"
                src="https://via.placeholder.com/100"
                alt="Team member name"
              />
              <div className="p-2">
                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  Karthick Ragavendran
                </h3>
                <p className="mt-2 text-gray-600">Fullstack Engineer</p>
                <p className="mt-3 text-gray-500">
                  Passionate about building cutting-edge applications.
                </p>
              </div>
            </div>
            {/* Repeat for other team members */}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Feel free to get in touch with us at{' '}
            <a
              href="mailto:info@example.com"
              className="text-blue-600 underline"
            >
              info@example.com
            </a>
            , or find us on social media.
          </p>
        </div>
      </div>
    </div>
  )
}
