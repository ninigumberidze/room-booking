export default function TimeSlotModal({
  open,
  room,
  slots,
  selectedSlots,
  setSelectedSlots,
  onClose,
  onContinue,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[600px]">
        <h2 className="text-xl font-semibold mb-5">აირჩიეთ დრო</h2>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {slots.map((block) =>
            block.durationOptions.map((option) => (
              <button
                key={`${block.startBlock}-${option.duration}`}
                onClick={() =>
                  setSelectedSlots([
                    {
                      startBlock: block.startBlock,
                      blockCount: option.duration,
                      label: option.label,
                    },
                  ])
                }
                className={`border rounded-lg p-3 ${
                  selectedSlots[0]?.label === option.label
                    ? "bg-[#5D9028] text-white"
                    : ""
                }`}
              >
                {option.label}
              </button>
            )),
          )}
        </div>

        <p className="text-sm text-gray-500 mb-4">
          სტუდენტს შეუძლია მაქსიმუმ 2 დროის მონაკვეთის არჩევა.
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            გაუქმება
          </button>

          <button
            disabled={selectedSlots.length === 0}
            onClick={onContinue}
            className="bg-[#5D9028] text-white px-4 py-2 rounded"
          >
            გაგრძელება
          </button>
        </div>
      </div>
    </div>
  );
}
