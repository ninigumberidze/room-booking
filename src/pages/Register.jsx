import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    // 🔥 Save user (fake DB)
    localStorage.setItem("user", JSON.stringify(form));

    // go to login
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT IMAGE */}
      <div className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d')",
        }}
      />

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg border border-green-500">

          <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
            რეგისტრაცია
          </h2>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Row 1 */}
            <div className="grid grid-cols-2 gap-3">
              <input
                name="firstName"
                placeholder="სახელი"
                onChange={handleChange}
                className="input"
              />
              <input
                name="lastName"
                placeholder="გვარი"
                onChange={handleChange}
                className="input"
              />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-3">
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

            {/* Row 3 */}
            <div className="grid grid-cols-2 gap-3">
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

            {/* Email */}
            <input
              name="email"
              placeholder="ელ-ფოსტა"
              onChange={handleChange}
              className="input"
            />

            {/* Password */}
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
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              >
                👁
              </span>
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                name="agree"
                onChange={handleChange}
              />
              ვეთანხმები წესებს (Terms & Conditions)
            </label>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
            >
              რეგისტრაცია
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}