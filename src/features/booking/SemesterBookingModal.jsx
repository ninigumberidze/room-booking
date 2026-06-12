export default function SemesterBookingModal({
  open,
  data,
  setData,
  maxDate,
  onClose,
  onContinue,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[600px]">
        <h2 className="text-xl font-semibold mb-5">სემესტრული ჯავშანი</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="საგნის დასახელება"
            value={data.title}
            onChange={(e) =>
              setData({
                ...data,
                title: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />
          <select
            value={data.weekDay}
            onChange={(e) =>
              setData({
                ...data,
                weekDay: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="">აირჩიეთ დღე</option>

            <option value="monday">ორშაბათი</option>
            <option value="tuesday">სამშაბათი</option>
            <option value="wednesday">ოთხშაბათი</option>
            <option value="thursday">ხუთშაბათი</option>
            <option value="friday">პარასკევი</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={data.startDate}
              min={new Date().toISOString().split("T")[0]}
              max={maxDate}
              onChange={(e) =>
                setData({
                  ...data,
                  startDate: e.target.value,
                })
              }
              className="border rounded-lg p-3"
            />

            <input
              type="date"
              value={data.endDate}
              min={data.startDate}
              max={maxDate}
              max={data.maxDate}
              onChange={(e) => setData({ ...data, endDate: e.target.value })}
              className="border rounded-lg p-3"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="border px-4 py-2 rounded-lg">
            გაუქმება
          </button>

          <button
            onClick={onContinue}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            დროის არჩევა
          </button>
        </div>
      </div>
    </div>
  );
}
