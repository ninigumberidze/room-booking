import FemaleIcon from "../../components/Icons/FemaleIcon";
import MaleIcon from "../../components/Icons/MaleIcon";

export default function ProfileInfoCard({
  firstName,
  lastName,
  birthDate,
  status,
  gender,
  extraFields = [],
}) {
  return (
    <div className="flex gap-8 mb-6">
      <div className="border-2 border-[#1A71B7] rounded-lg p-10 bg-white flex items-center justify-center">
        {gender === "female" ? <FemaleIcon /> : <MaleIcon />}
      </div>

      <div className="text-left border-2 border-[#1A71B7] rounded-lg bg-white flex-1 p-6">
        <div className="space-y-4 text-lg">
          <p>
            <span className="font-bold">სახელი:</span> {firstName}
          </p>

          <p>
            <span className="font-bold">გვარი:</span> {lastName}
          </p>

          <p>
            <span className="font-bold">დაბადების თარიღი:</span> {birthDate}
          </p>

          <p>
            <span className="font-bold">სტატუსი:</span> {status}
          </p>

          {extraFields.map((field) => (
            <p key={field.label}>
              <span className="font-bold">{field.label}:</span> {field.value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
