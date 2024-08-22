import { useState } from "react"
import ThemeSwitcher from "./Theme"

export default function Navbar() {
  const [search, setSearch] = useState("");

  const SearchTracker = (e) => {
    setSearch(e.target.value);
  }

  const GetData = (e) => {
    // e.preventDefault();
    console.log("hi");
    console.log(search);
  }

  return (
    <div className="shadow-md flex flex-wrap items-center p-1 bg-[#d9f0ff] ">
      <a className="text-2xl font-medium text-blue-700 sm:text-3xl sm:ml-3" href="/">SkyMate</a>
      <div className="ml-auto flex items-center mx-0  sm:mx-auto hidden sm:block ">
        <form >
          <input type="text" placeholder="Enter location" className="text-center p-1 rounded-xl w-36 text-base sm:p-2 sm:rounded-2xl sm:w-auto sm:text-base" onChange={SearchTracker} value={search} />
          <button className="btn bg-white ml-2 w-20 pt-0 pl-0 pr-0 pl-0 rounded-xl hover:bg-[#FFF0DA] text-sm sm:text-base sm:w-20" >Search</button>
        </form>
      </div>
      {/* <div className="p-2 hidden sm:block">
        <ThemeSwitcher />
      </div> */}
      <div className="p-2 ml-28 sm:ml-0">
      <button className="btn bg-white ml-5 w-20 pt-0 pl-0 pr-0 pl-0 rounded-xl hover:bg-[#FFF0DA] text-lg sm:text-base sm:w-20" >Login</button>
      </div>
    </div>
  )
}
