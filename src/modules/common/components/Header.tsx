import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="py-8  bg-primary">
      <div className="w-[96%] text-white max-w-[1600px] mx-auto flex justify-between items-center">
        <Link className="w-25 md:block text-2xl" to="/">
          LoopFeed
        </Link>
        <div className="hidden md:flex justify-center gap-4  grow "></div>
        <div className="hidden md:block w-25"></div>
      </div>
    </header>
  );
}
