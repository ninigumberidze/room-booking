import bgImage from "../../assets/images/background-image.png";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 md:px-8 py-8">
        <div className="w-full max-w-xl">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 sm:gap-3 mb-8 md:mb-12 cursor-pointer"
          >
            <img
              src={logo}
              alt="Logo"
              className="w-14 sm:w-16 md:w-20 h-auto flex-shrink-0"
            />

            <p className="text-base sm:text-lg md:text-xl font-semibold text-[#1A71B7] leading-tight">
              ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
