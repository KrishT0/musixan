import SearchBar from "./searchbar";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-2 shadow-sm">
      <h1 className="text-lg font-nunito font-bold">Musixan</h1>
      <div className="justify-center gap-10 flex items-center">
        <svg
          className="w-20 h-20 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 5a7 7 0 0 0-7 7v1.17c.313-.11.65-.17 1-.17h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H6a3 3 0 0 1-3-3v-6a9 9 0 0 1 18 0v6a3 3 0 0 1-3 3h-2a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h2c.35 0 .687.06 1 .17V12a7 7 0 0 0-7-7Z"
            clipRule="evenodd"
          />
        </svg>

        <div className="">
          <p className="text-2xl font-semibold text-center mt-8">
            Hear What You Want, When You Want
          </p>
          <p className="text-sm text-neutral-400 font-semibold text-center">
            Your music, your requests, our mission to keep the vibes going.
          </p>
          <p className="text-sm text-neutral-400 font-semibold text-center mb-8">
            We don&apos;t have every song. Yet. Request yours and we&apos;ll
            make it happen.
          </p>
        </div>
      </div>
      <SearchBar />
    </nav>
  );
}
