import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EyeIcon from "../components/Icons/EyeIcon";
import EyeOffIcon from "../components/Icons/EyeOffIcon";
import AuthLayout from "../components/Layout/AuthLayout";
import bgImage from "../assets/images/background-image.png";
import logo from "../assets/images/logo.png";
import NoticeIcon from "../components/Icons/NoticeIcon";
import RetryIcon from "../components/Icons/RetryIcon";
import { authService } from "../services/authService";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [resetToken, setResetToken] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (step !== 2 || resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleEmailSubmit = async () => {
    setError("");

    if (!email) {
      setError("შეიყვანეთ ელ-ფოსტა");
      return;
    }

    try {
      const { data } = await authService.forgotPassword({
        email,
      });

      console.log("FORGOT PASSWORD:", data);

      setResetToken(data.resetToken);
      setResendTimer(data.resendCooldownSeconds || 60);

      setStep(2);
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("BACKEND RESPONSE:", err.response?.data);
      console.log("VALIDATION ERRORS:", err.response?.data?.errors);
      console.log(err.response?.data?.errors?.Email);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("მეილის ფორმატი არასწორია ან მომხმარებელი არ არსებობს");
      }
    }
  };

  const handleOtpSubmit = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      setError("შეიყვანეთ OTP კოდი");
      return;
    }

    setError("");
    setStep(3);
  };

  const handlePasswordSubmit = async () => {
    setError("");

    if (otp.some((d) => d === "")) {
      setError("შეიყვანეთ OTP კოდი");
      return;
    }

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

    try {
      const { data } = await authService.resetPassword({
        resetToken,
        otp: otp.join(""),
        newPassword: password,
        reenteredPassword: confirmPassword,
      });

      switch (data.status) {
        case 1:
          setStep(3);
          setTimeout(() => navigate("/"), 2000);
          break;
        case 2:
          setError("არასწორი სესია");
          break;
        case 3:
          setError("სესიის ვადა ამოიწურა");
          break;
        case 4:
          setError("კოდის ვადა ამოიწურა");
          break;
        case 5:
          setError("OTP კოდი არასწორია");
          break;
        case 6:
          setError("მცდელობების ლიმიტი ამოიწურა");
          break;
        case 7:
          setError("მომხმარებელი ვერ ახდენს პაროლის აღდგენას");
          break;
        default:
          setError("დაფიქსირდა შეცდომა");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "პაროლის შეცვლა ვერ მოხერხდა");
    }
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
    <AuthLayout>
      <div className="w-full  bg-white p-6 rounded-xl border-2 border-[#1A71B7]">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-600 p-3 rounded-lg text-sm mb-5">
            {error}
          </div>
        )}

        {step === 1 && (
          <>
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-[#1A71B7] text-center mb-10">
              შექმენით პაროლი
            </h1>
            <label className="block text-left text-gray-500 mb-2">
              ელ-ფოსტა
            </label>

            <div className="relative mb-8">
              <input
                type="email"
                placeholder="შეიყვანეთ ელ-ფოსტა"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full  h-12 sm:h-14 border-2 border-blue-400 rounded-lg p-4 pr-14 focus:outline-none"
              />
            </div>

            <button
              onClick={handleEmailSubmit}
              className="w-full bg-[#1A71B7] hover:bg-blue-700 transition text-white rounded-lg py-3 text-lg font-medium mb-8"
            >
              გადამოწმება
            </button>

            <div className="flex flex-shrink-0 items-start gap-2  text-black">
              <NoticeIcon height="30" width="30" />
              <div className="flex  flex-col">
                <p className="mb-6 text-left  text-gray-800 font-extrabold">
                  იმ შემთხვევაში, თუ თქვენ ელ-ფოსტის მისამართი სწორად ჩაწერეთ
                  სისტემაში, თქვენ მიიღებთ ინსტრუქციას პაროლის შეცვლის შესახებ.
                </p>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm text-center text-gray-500 text-left mb-6">
              OTP კოდი გაიგზავნა თქვენს ელ-ფოსტაზე. გთხოვთ შეიყვანოთ მიღებული
              კოდი.
            </p>

            <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  className="w-12 h-12  sm:w-14 sm:h-14  md:w-16 md:h-16  border-2 border-[#1A71B7]  rounded-lg  text-center   text-lg  sm:text-xl  md:text-2xl   focus:outline-none focus:ring-2   focus:ring-[#1A71B7]"
                />
              ))}
            </div>

            <div className="flex justify-center items-center gap-3 text-sm text-gray-500 mb-6">
              <button
                disabled={resendTimer > 0}
                onClick={async () => {
                  console.log("RESET TOKEN:", resetToken);
                  try {
                    const { data } = await authService.resendPasswordResetOtp({
                      resetToken,
                    });
                    setOtp(["", "", "", ""]);
                    setError("");
                    setResendTimer(data.resendCooldownSeconds || 60);
                  } catch (err) {
                    setError("კოდის ხელახლა გაგზავნა ვერ მოხერხდა");
                  }
                }}
                className={`transition ${
                  resendTimer > 0
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:opacity-70 cursor-pointer"
                }`}
              >
                <RetryIcon />
              </button>
              <span>00:{resendTimer.toString().padStart(2, "0")}</span>
            </div>

            <label className="block text-gray-500 mb-2 text-left">
              ახალი პაროლი
            </label>
            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 sm:h-14 border-2 border-[#1A71B7] rounded-lg p-4 pr-14 focus:outline-none"
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
            <div className="relative mb-6">
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
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            <div className="text-xs sm:text-sm leading-7 mb-6 text-left text-gray-500">
              <ul className="list-disc ml-6">
                <li>მინიმუმ 8 სიმბოლო</li>
                <li>ერთი დიდი ასო</li>
                <li>ერთი პატარა ასო</li>
                <li>ერთი ციფრი</li>
                <li>სპეციალური სიმბოლო</li>
              </ul>
            </div>

            <button
              onClick={handlePasswordSubmit}
              className="w-full bg-[#1A71B7] hover:bg-blue-700 transition text-white rounded-lg py-4 text-lg font-medium"
            >
              დადასტურება
            </button>
          </>
        )}

        {/* {step === 3 && (
          <>
            <label className="block text-gray-500 mb-2 text-left">პაროლი</label>

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
        )} */}

        {/* {step === 4 && (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              პაროლი წარმატებით განახლდა
            </h2>

            <p className="text-gray-500">გადამისამართება ავტორიზაციაზე...</p>
          </div>
        )} */}

        {step === 3 && (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              პაროლი წარმატებით განახლდა
            </h2>
            <p className="text-gray-500">გადამისამართება ავტორიზაციაზე...</p>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
