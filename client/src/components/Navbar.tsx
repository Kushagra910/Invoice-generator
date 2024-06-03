
import { Link } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import ProfileDrop from "./ProfileDrop";
import { useSelector } from "react-redux";

export const Navbar = () => {



  const {token} = useSelector((state:any) => (state.auth));

  return (
    <div className="flex items-center justify-between md:mx-20 pt-3  ">
      {/* logo,title */}
      <Link to="/login">
        <div className="flex gap-1  md:gap-2 items-center cursor-pointer">
          {/* img */}
          <p className="cusrsor-pointer font-extrabold text-xl md:text-3xl  ">INVOICE-GENERATOR</p>
        </div>
      </Link>


      <div className="flex  md:gap-5 items-center">
 
        {/* settings */}
        {token && (
          <span className="cursor-pointer">
            <IoIosSettings size={24}/>
          </span>
        )}
        
        {/* notification */}
        {token && (
          <span className="cursor-pointer">
            <IoIosNotifications size={24} />
          </span>
        )}

 
        {/* Login,signup,dashboard buttons*/}
        <div className="flex gap-x-4 items-center">

          {token === null && (
            <Link to="/login">
              <button className="border text-[12px] md:text-base border-richblack-700 bg-richblack-5 py-[6px] px-[8px] md:px-[12px]  md:py-[8px] text-richblack-900 font-bold rounded-md">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border text-[12px] md:text-base border-richblack-700 bg-richblack-5 py-[6px] px-[10px] md:px-[12px]  md:py-[8px] text-richblack-900 rounded-md font-bold">
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDrop />}
        </div>
      </div>
    </div>
  );
};
