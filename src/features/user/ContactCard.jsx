import MailIcon from "../../components/Icons/MailIcon";
import PhoneIcon from "../../components/Icons/PhoneIcon";

export default function ContactCard({ email, phone, color = "#5D9028" }) {
  return (
    <div
      className="border-2 rounded-lg bg-white p-6 mb-6"
      style={{ borderColor: color }}
    >
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3
            className="text-left font-semibold  mb-3"
            style={{ color: color }}
          >
            ელექტრონული ფოსტა
          </h3>

          <div
            className="border-2  rounded px-4 py-2 flex items-center gap-2"
            style={{ borderColor: color }}
          >
            <MailIcon color={color} />

            <span>{email}</span>
          </div>
        </div>

        <div>
          <h3 className="text-left font-semibold mb-3" style={{ color: color }}>
            ტელეფონის ნომერი
          </h3>

          <div
            className="border-2  rounded px-4 py-2 flex items-center gap-2"
            style={{ borderColor: color }}
          >
            <PhoneIcon color={color} />

            <span>{phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
