import MailIcon from "../../components/Icons/MailIcon";
import PhoneIcon from "../../components/Icons/PhoneIcon";

export default function ContactCard({ email, phone }) {
  return (
    <div className="border-2 border-[#1A71B7] rounded-lg bg-white p-6 mb-6">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-left font-semibold text-[#1A71B7] mb-3">
            ელექტრონული ფოსტა
          </h3>

          <div className="border-2 border-[#1A71B7] rounded px-4 py-2 flex items-center gap-2">
            <MailIcon />

            <span>{email}</span>
          </div>
        </div>

        <div>
          <h3 className="text-left font-semibold text-[#1A71B7] mb-3">
            ტელეფონის ნომერი
          </h3>

          <div className="border-2 border-[#1A71B7] rounded px-4 py-2 flex items-center gap-2">
            <PhoneIcon />

            <span>{phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
