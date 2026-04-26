import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export function Brand() {
  return (
    <Link
      to="/"
      className="flex shrink-0 items-center gap-2 rounded-md outline-none ring-[#579dff] focus-visible:ring-2"
    >
      <img src={logo} alt="" className="h-8 w-8 brightness-0 invert" />
      <h1 className="logo__name m-0 text-[1.375rem] font-bold leading-none tracking-tight text-white">
        Tenma
      </h1>
    </Link>
  );
}