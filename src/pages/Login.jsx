import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { authService } from "../services/authService";
import EyeIcon from "../components/Icons/EyeIcon";
import EyeOffIcon from "../components/Icons/EyeOffIcon";
import AuthLayout from "../components/Layout/AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const { login, setUser } = useAuthStore();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!form.email || !form.password) {
      return "All fields are required";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return "Invalid email format";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const { data } = await authService.login({
        email: form.email,
        password: form.password,
      });

      switch (data.status) {
        case 1:
          login({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            expiresAtUtc: data.expiresAtUtc,
          });

          const profileResponse = await authService.getProfile();

          console.log("PROFILE:", profileResponse.data);

          setUser(profileResponse.data);

          navigate("/dashboard");
          break;

        case 2:
          setError("ელ-ფოსტა ან პაროლი არასწორია");
          break;

        case 3:
          setError("გთხოვთ დაადასტუროთ ელ-ფოსტა");
          break;

        case 4:
          setError("ანგარიში არააქტიურია");
          break;

        default:
          setError("დაფიქსირდა შეცდომა");
      }
    } catch (err) {
      console.log(err);

      setError("ავტორიზაცია ვერ შესრულდა");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full  bg-white p-12 rounded-xl border-2 border-[#1A71B7]">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#1A71B7]">
          სისტემაში შესვლა
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 mb-6">
          <div className="text-left">
            <label className=" text-sm  font-medium text-gray-400">
              მომხმარებელი
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg border border-[#1A71B7] focus:outline-none focus:ring-2 focus:ring-[#1A71B7]"
            />
          </div>

          <div className="text-left">
            <label className="text-sm font-medium text-gray-400">პაროლი</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-lg border border-[#1A71B7] focus:outline-none focus:ring-2 focus:ring-[#1A71B7] pr-12"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-5 text-sm text-gray-500"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <span className="">
            <span
              onClick={() => navigate("/forgot-password")}
              className=" block w-full text-sm mb-6  text-[#1A71B7]  cursor-pointer hover:underline text-right"
            >
              დაგავიწყდა პაროლი?
            </span>
          </span>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-white font-medium transition 
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Logging in..." : "ავტორიზაცია"}
          </button>
        </form>

        <div className="mb-6 flex items-center gap-4 w-full">
          <div className="flex-1 h-px bg-[#8BC34A]"></div>

          <span className="text-black text-lg">ან</span>

          <div className="flex-1 h-px bg-[#8BC34A]"></div>
        </div>

        <div
          onClick={() => navigate("/register")}
          className=" rounded-xl border border-green-600 text-green-600 cursor-pointer p-3 text-center"
        >
          გაიარეთ სისტემაში რეგისტრაცია
        </div>
      </div>
    </AuthLayout>
  );
}
