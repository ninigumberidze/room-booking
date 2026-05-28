import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "../components/Icons/PersonIcon";
import EyeIcon from "../components/Icons/EyeIcon";
import EyeOffIcon from "../components/Icons/EyeOffIcon";
import bgImage from "../assets/images/background-image.png";
import logo from "../assets/images/logo.png";
export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    faculty: "",
    phone: "",
    email: "",
    password: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.birthDate ||
      !form.gender ||
      !form.faculty ||
      !form.phone ||
      !form.email ||
      !form.password
    ) {
      return "Please fill all fields";
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return "Invalid email format";
    }

    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (!form.agree) {
      return "You must accept terms";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    localStorage.setItem("user", JSON.stringify(form));

    setSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

      <div className="w-1/2 pl-8 pr-8 flex flex-col justify-center">
        <div className="pl-12 pr-12">
          <div className="flex items-center gap-4 mb-12">
            <img src={logo} alt="Logo" className="w-lg" />
            <p className="text-md font-bold text-left text-[#1A71B7]">
              ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი
            </p>
          </div>

          <div className="w-full flex items-center justify-center ">
            <div className="w-full bg-white p-8 rounded-2xl shadow-lg border-2 border-[#5D9028]">
              <h2 className="text-2xl text-center text-[#5D9028] mb-6">
                რეგისტრაცია
              </h2>

              {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6  pb-6">
                <div className="grid grid-cols-2 gap-8 ">
                  <input
                    name="firstName"
                    placeholder="სახელი"
                    onChange={handleChange}
                    className="input pl-12"
                  />

                  <input
                    name="lastName"
                    placeholder="გვარი"
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-8 ">
                  <input
                    type="date"
                    name="birthDate"
                    onChange={handleChange}
                    className="input"
                  />

                  <select
                    name="gender"
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">სქესი</option>
                    <option value="male">მამრობითი</option>
                    <option value="female">მდედრობითი</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-8 ">
                  <select
                    name="faculty"
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">სტატუსი</option>
                    <option>სტუდენტი</option>
                    <option>ლექტორი</option>
                    <option>ადმინისტრატორი</option>
                  </select>

                  <input
                    name="phone"
                    placeholder="ტელეფონი"
                    onChange={handleChange}
                    className="input"
                  />
                </div>

                <div className="grid grid-cols-2 gap-8 ">
                  <input
                    name="email"
                    placeholder="ელ-ფოსტა"
                    onChange={handleChange}
                    className="input"
                  />

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="პაროლი"
                      onChange={handleChange}
                      className="input pr-10"
                    />

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-4 cursor-pointer text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOffIcon color="#5D9028" />
                      ) : (
                        <EyeIcon color="#5D9028" />
                      )}
                    </span>
                  </div>
                </div>

                <label className="flex items-start   gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="agree"
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded-full border-[#1A71B7] text-[#1A71B7] focus:ring-[#1A71B7]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-gray-600 text-left"
                  >
                    ვებ-სისტემაში რეგისტრაციის დასრულებით თქვენ ადასტურებთ, რომ
                    გაეცანით, გაიგეთ და ეთანხმებით მომსახურების პირობებს (Terms
                    and Conditions) და მონაცემთა დაცვის პოლიტიკას (Privacy
                    Policy).
                  </button>{" "}
                </label>

                <button
                  type="submit"
                  className="w-full bg-[#5D9028]  text-white p-3  rounded-lg hover:bg-green-800"
                >
                  რეგისტრაცია
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {success && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-[600px] text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-3">
              რეგისტრაცია წარმატებით დასრულდა!
            </h2>

            <p className="text-gray-600">
              თქვენი ანგარიშის სრულად გასააქტიურებლად, გთხოვთ შეამოწმოთ თქვენი
              ელექტრონული ფოსტა. მიღებულ წერილში დაგხვდებათ ერთჯერადი კოდი.
            </p>

            <p className="text-sm text-gray-400 mt-3">
              გთხოვთ, დაბრუნდეთ აპლიკაციაში, შეიყვანოთ აღნიშნული კოდი შესაბამის
              pop-up ფანჯარაში და დააჭიროთ „შენახვა“ ღილაკს. კოდის სწორად
              შეყვანის შემდეგ თქვენი ანგარიში წარმატებით გააქტიურდება.
            </p>
          </div>
        </div>
      )}

      {showTerms && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[700px] max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center border-b p-5">
              <h2 className="text-2xl font-bold text-green-700">
                მომსახურების პირობები
              </h2>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh] text-sm leading-7 text-gray-700">
              <p className="mb-5 text-left">
                უნივერსიტეტის აუდიტორიების დაჯავშნის სისტემის გამოყენებით,
                მომხმარებელი ეთანხმება მომსახურების პირობებს.
              </p>

              <p className="mb-5 text-left">
                მომხმარებელი პასუხისმგებელია თავისი ანგარიშის უსაფრთხოებაზე და
                ვალდებულია არ გადასცეს ავტორიზაციის მონაცემები სხვა პირს.
              </p>

              <p className="mb-5 text-left">
                მომხმარებლის პერსონალური მონაცემები დაცულია უნივერსიტეტის
                პოლიტიკის შესაბამისად.
              </p>

              <p className="mb-5 text-left">
                სისტემაში რეგისტრაციით, თქვენ ადასტურებთ, რომ გაეცანით და
                ეთანხმებით ყველა პირობას.
              </p>
            </div>

            <div className="border-t p-5 flex justify-end">
              <button
                onClick={() => setShowTerms(false)}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                დახურვა
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
