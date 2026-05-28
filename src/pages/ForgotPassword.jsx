import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EyeIcon from "../components/Icons/EyeIcon";
import EyeOffIcon from "../components/Icons/EyeOffIcon";

import bgImage from "../assets/images/background-image.png";
import logo from "../assets/images/logo.png";
import NoticeIcon from "../components/Icons/NoticeIcon";
import RetryIcon from "../components/Icons/RetryIcon";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [step, timer]);

  // 🔹 STEP 1
  const handleEmailSubmit = () => {
    setError("");

    if (!email) {
      setError("შეიყვანეთ ელ-ფოსტა");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("ელ-ფოსტის ფორმატი არასწორია");
      return;
    }

    setStep(2);
  };

  const handleOtpSubmit = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp !== "1111") {
      setError("OTP კოდი არასწორია");
      return;
    }

    setError("");
    setStep(3);
  };

  const handlePasswordSubmit = () => {
    setError("");

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError("პაროლი არ აკმაყოფილებს მოთხოვნებს");
      return;
    }

    if (password !== confirmPassword) {
      setError("პაროლები არ ემთხვევა");
      return;
    }

    setStep(4);

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];

    updatedOtp[index] = value;

    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

      <div className="w-1/2 bg-white pl-8 pr-8   flex flex-col justify-center">
        <div className="pl-12 pr-12">
          <div className="flex items-center gap-4 mb-12">
            <img src={logo} alt="Logo" className="w-lg" />
            <p className="text-md font-bold text-left text-[#1A71B7]">
              ივანე ჯავახიშვილის სახელობის თბილისის სახელმწიფო უნივერსიტეტი
            </p>
          </div>

          <div className="w-full  bg-white p-12 rounded-xl border-2 border-[#1A71B7]">
            <h1 className="text-3xl  text-[#1A71B7] text-center mb-10">
              შექმენით პაროლი
            </h1>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-600 p-3 rounded-lg text-sm mb-5">
                {error}
              </div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <>
                <label className="block text-left text-gray-500 mb-2">
                  ელ-ფოსტა
                </label>

                <div className="relative mb-8">
                  <input
                    type="email"
                    placeholder="შეიყვანეთ ელ-ფოსტა"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-blue-400 rounded-lg p-4 pr-14 focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleEmailSubmit}
                  className="w-full bg-[#1A71B7] hover:bg-blue-700 transition text-white rounded-lg py-3 text-lg font-medium mb-8"
                >
                  გადამოწმება
                </button>

                {/* INFO */}
                <div className="flex flex-shrink-0 items-start gap-2 text-sm leading-7 text-black">
                  <NoticeIcon height="20" width="20" />
                  <div className="flex  flex-col">
                    <p className="mb-6 text-left text-black-800 font-medium">
                      იმ შემთხვევაში, თუ თქვენ ელ-ფოსტის მისამართი სწორად
                      ჩაწერეთ სისტემაში, თქვენ მიიღებთ ინსტრუქციას პაროლის
                      შეცვლის შესახებ.
                    </p>

                    <p className="text-left">
                      გთხოვთ, შეამოწმოთ ინსტრუქციის ახალი პაროლის დასაყენებლად.
                    </p>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <label className="block text-left text-gray-500 mb-2">
                  ელ-ფოსტა
                </label>

                <div className="relative mb-6">
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full border-2 border-[#1A71B7] rounded-lg p-4 pr-14 bg-gray-50"
                  />
                </div>

                <button
                  onClick={handleOtpSubmit}
                  className="w-full bg-[#1A71B7] hover:bg-[#155a90] transition text-white rounded-lg py-4 text-lg font-medium mb-8"
                >
                  გაგრძელება
                </button>

                <div className="flex justify-center gap-4 mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      className="w-16 h-16 border-2 border-[#1A71B7] rounded-lg text-center text-2xl"
                    />
                  ))}
                </div>

                <div className="flex justify-center items-center gap-3 text-sm text-gray-500 mb-8">
                  <button onClick={() => setTimer(60)}>{<RetryIcon />}</button>

                  <span>
                    00:
                    {timer.toString().padStart(2, "0")}
                  </span>
                </div>

                <div className="text-sm leading-7">
                  <p className="mb-6">OTP კოდი გაიგზავნა თქვენს ელ-ფოსტაზე.</p>

                  <p>გთხოვთ შეიყვანოთ მიღებული კოდი.</p>
                </div>
              </>
            )}

            {/* STEP 3 PASSWORD */}

            {step === 3 && (
              <>
                <label className="block text-gray-500 mb-2 text-left">
                  პაროლი
                </label>

                <div className="relative mb-6">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-2 border-[#1A71B7] rounded-lg p-4 pr-14 focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>

                <label className="block text-gray-500 mb-2 text-left">
                  გაიმეორეთ პაროლი
                </label>

                <div className="relative mb-8">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border-2 border-[#1A71B7] rounded-lg p-4 pr-14 focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-4"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>

                <button
                  onClick={handlePasswordSubmit}
                  className="w-full bg-[#1A71B7] hover:bg-blue-700 transition text-white rounded-lg py-4 text-lg font-medium mb-8"
                >
                  დადასტურება
                </button>

                <div className="text-sm leading-7">
                  <p className="mb-3 text-left">
                    თქვენი ანგარიშის უსაფრთხოების უზრუნველსაყოფად, პაროლი უნდა
                    აკმაყოფილებდეს შემდეგ მოთხოვნებს:
                  </p>

                  <ul className="list-disc ml-6 text-left ">
                    <li>მინიმუმ 8 სიმბოლო</li>

                    <li>ერთი დიდი ასო</li>

                    <li>ერთი პატარა ასო</li>

                    <li>ერთი ციფრი</li>

                    <li>სპეციალური სიმბოლო</li>
                  </ul>
                </div>
              </>
            )}

            {/* STEP 4 SUCCESS */}

            {step === 4 && (
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-green-700 mb-2">
                  პაროლი წარმატებით განახლდა
                </h2>

                <p className="text-gray-500">
                  გადამისამართება ავტორიზაციაზე...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
