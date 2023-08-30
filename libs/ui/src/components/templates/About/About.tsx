import Link from 'next/link'

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

        <div className="mt-12 space-y-2">
          <h2 className="text-xl font-bold text-gray-900">Our Team</h2>
          <p className="mt-4">Um... Its just me for now.</p>
          <div>
            <div className="max-w-xs bg-white rounded-lg shadow-lg">
              <img
                className="object-cover w-full  mx-auto aspect-[3/4]"
                src="https://firebasestorage.googleapis.com/v0/b/karthick-haveyouseen.appspot.com/o/files%2FScreenshot_20221018-220853.jpg?alt=media&token=aa104dff-1611-4c21-ae69-b1981c5e86d2"
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
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900">Contact</h2>
          <p className="mt-4 text-lg text-gray-600">
            Feel free to get in touch with me through my{' '}
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/iamkarthickr/"
              className="text-blue-600 underline"
            >
              LinkedIn
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
