import bgImage from "../../assets/images/background-image.png";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
export default function AuthLayout({ children }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex">
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

      <div className="w-1/2 bg-white pl-8 pr-8 flex flex-col justify-center">
        <div className="pl-12 pr-12">
          <div
            className="flex items-center gap-4 mb-12"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Logo" className="w-lg" />

            <p className="text-md font-bold text-left text-[#1A71B7]">
              ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
