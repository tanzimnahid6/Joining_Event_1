
import Image from "next/image";
import Link from "next/link";
import SignInOut from "./auth/SignInOut";
import { SiEventstore } from "react-icons/si";
const Navbar = () => {
  return (
    <nav>
      <div className="container flex justify-between items-center py-4">
        <div className="nav-brand">
          <Link href="/" className="flex flex-col items-center">
            {/* <Image
              src="/logo2.png"
              alt="Eventry"
              width={135}
              height={100} /> */}
              <SiEventstore size={40} color="green" />
              <p className="text-yellow-500 font-bold">FIND YOUR EVENT</p>
          </Link>
        </div>

        <ul className="flex gap-4 text-[#9C9C9C]">
          <li><SignInOut></SignInOut></li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
