import FemaleIcon from "../../components/Icons/FemaleIcon";
import MaleIcon from "../../components/Icons/MaleIcon";
import { GENDER, USER_TYPE_LABEL } from "../../shared/utils/constants";
export default function ProfileInfoCard({
  firstName,
  lastName,
  birthDate,
  status,
  gender,
  extraFields = [],
  color,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-6">
      <div
        className=" border-2 rounded-xl bg-white flex items-center justify-center p-6 sm:p-8 md:p-10 self-center md:self-auto "
        style={{ borderColor: color }}
      >
        {gender?.toLowerCase() === "female" ? <FemaleIcon /> : <MaleIcon />}
      </div>

      <div
        className="text-left flex-1 border-2 rounded-xl  rounded-lg bg-white flex-1 sm:p-6 p-5"
        style={{ borderColor: color }}
      >
        <div className="space-y-3 text-sm sm:text-base md:text-lg">
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
