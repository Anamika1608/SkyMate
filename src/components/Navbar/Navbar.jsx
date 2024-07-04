import ThemeSwitcher from "./Theme"

export default function Navbar() {
  return (
    <div className="shadow-md flex flex-wrap items-center p-3 bg-[#d9f0ff] ">
      <a className="text-lg font-medium text-blue-700 sm:text-3xl sm:ml-2" href="/">SkyMate</a>
      <div className="ml-auto flex items-center mx-0  sm:mx-auto ">
        <input type="text" placeholder="Enter location" className="text-center p-1 rounded-xl w-36 text-base sm:p-2 sm:rounded-2xl sm:w-auto" />
        <button className="btn ml-2 w-20 pt-0 pl-0 pr-0 pl-0 rounded-xl hover:bg-[#FDE4C0] text-sm sm:text-base sm:w-20">Search</button>
      </div>
      <div className="p-2 hidden sm:block">
        <ThemeSwitcher />
      </div>
    </div>
  )
}
