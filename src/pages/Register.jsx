import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EyeIcon from "../components/Icons/EyeIcon";
import EyeOffIcon from "../components/Icons/EyeOffIcon";
import { useEffect } from "react";
import OTPModal from "../shared/components/OTPModal";
import AuthLayout from "../components/Layout/AuthLayout";
import { authService } from "../services/authService";
import SuccessModal from "../shared/components/SuccessModal";
import TermsModal from "../shared/components/TermsModal";

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
    confirmPassword: "",
    agree: false,
  });
  const [resendTimer, setResendTimer] = useState(60);
  const [verificationToken, setVerificationToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const maxBirthDate = new Date();
  maxBirthDate.setFullYear(maxBirthDate.getFullYear() - 17);
  const maxDate = maxBirthDate.toISOString().split("T")[0];
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  useEffect(() => {
    if (!showOtpModal) return;

    if (resendTimer === 0) return;

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [showOtpModal, resendTimer]);
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
      return "გთხოვთ შეავსოთ ყველა ველი";
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return "ელ-ფოსტის ფორმატი არასწორია";
    }
    if (form.password.length < 6) {
      return "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო";
    }
    if (!form.agree) {
      return "გთხოვთ დაეთანხმოთ მომსახურების პირობებს";
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
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        birthDate: form.birthDate,
        gender: form.gender === "male" ? 0 : 1,
        phoneNumber: form.phone,
        email: form.email,
        userType:
          form.faculty === "სტუდენტი" ? 0 : form.faculty === "ლექტორი" ? 1 : 3,
        password: form.password,
        reenteredPassword: form.password,
      };

      const { data } = await authService.register(payload);

      setVerificationToken(data.verificationToken);
      setResendTimer(data.resendCooldownSeconds);
      setShowOtpModal(true);
    } catch (err) {
      setError(err.response?.data?.detail || "რეგისტრაცია ვერ შესრულდა");
    }
  };
  const handleOtpVerify = async () => {
    try {
      const enteredCode = otp.join("");
      const { data } = await authService.verifyEmailOtp({
        verificationToken,
        otp: enteredCode,
      });
      switch (data.status) {
        case 1:
          setOtpError("");
          setShowOtpModal(false);
          setShowSuccessModal(true);
          break;
        case 2:
          setOtpError("OTP კოდი არასწორია");
          break;
        case 3:
          setOtpError("OTP კოდის ვადა ამოიწურა");
          break;
        default:
          setOtpError("OTP კოდი არასწორია");
      }
    } catch (err) {
      setOtpError(err.response?.data?.detail || "OTP კოდი არასწორია");
    }
  };
  return (
    <AuthLayout>
      <div className="w-full flex items-center justify-center ">
        <div className="w-full bg-white p-8 rounded-2xl shadow-lg border-2 border-[#5D9028]">
          <h2 className="text-3xl text-center text-[#5D9028] mb-6">
            რეგისტრაცია
          </h2>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6  pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ">
              <input
                type="date"
                name="birthDate"
                onChange={handleChange}
                className="input"
                max={maxDate}
              />
              <select name="gender" onChange={handleChange} className="input">
                <option value="">სქესი</option>
                <option value="male">მამრობითი</option>
                <option value="female">მდედრობითი</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 ">
              <select name="faculty" onChange={handleChange} className="input">
                <option value="">სტატუსი</option>
                <option>სტუდენტი</option>
                <option>ლექტორი</option>
              </select>
              <input
                name="phone"
                placeholder="ტელეფონი"
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
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
                გაეცანით, გაიგეთ და ეთანხმებით მომსახურების პირობებს (Terms and
                Conditions) და მონაცემთა დაცვის პოლიტიკას (Privacy Policy).
              </button>
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

      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />

      <SuccessModal
        open={showSuccessModal}
        title="რეგისტრაცია წარმატებით დასრულდა"
        description="თქვენი ანგარიში წარმატებით გააქტიურდა."
        buttonText="სისტემაში შესვლა"
        onClose={() => {
          setShowSuccessModal(false);
          navigate("/");
        }}
      />

      <OTPModal
        open={showOtpModal}
        otp={otp}
        onClose={() => setShowOtpModal(false)}
        setOtp={setOtp}
        error={otpError}
        resendTimer={resendTimer}
        onConfirm={handleOtpVerify}
        setError={setOtpError}
        onResend={async () => {
          try {
            await authService.resendEmailOtp;
            const { data } = await authService.resendEmailOtp({
              verificationToken,
            });

            setOtp(["", "", "", ""]);
            setOtpError("");
            setResendTimer(data.retryAfterSeconds || 60);
          } catch (err) {}
        }}
      />
    </AuthLayout>
  );
}
