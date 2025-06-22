export default function SearchForm({ name, setName, email, setEmail, phone, setPhone, onSubmit }) {
  return (
    <div id="searchFormContent" className="mt-4">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label htmlFor="search_name" className="block text-gray-300 text-sm font-medium mb-2">
              Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-user text-gray-500" />
              </div>
              <input
                value={name}
                onChange={setName}
                type="text"
                id="search_name"
                name="search_name"
                className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Search by name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="search_email" className="block text-gray-300 text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-envelope text-gray-500" />
              </div>
              <input
                value={email}
                onChange={setEmail}
                type="text"
                id="search_email"
                name="search_email"
                className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Search by email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="search_phone" className="block text-gray-300 text-sm font-medium mb-2">
              Phone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-phone text-gray-500" />
              </div>
              <input
                value={phone}
                onChange={setPhone}
                type="text"
                id="search_phone"
                name="search_phone"
                className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Search by phone"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 text-right">
          <button
            type="submit"
            className="cursor-pointer px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
          >
            <i className="fas fa-search mr-2" /> Search
          </button>
        </div>
      </form>
    </div>
  );
}
