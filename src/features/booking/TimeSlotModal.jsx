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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-xl w-[88%] flex flex-col   max-h-[80vh] max-w-2xl p-4 sm:p-5">
        <h2 className="text-lg sm:text-xl font-semibold mb-5 text-center ">
          აირჩიეთ დრო
        </h2>
        <div className="flex-1 overflow-y-auto mb-4 pr-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
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
                  className={`border rounded-lg p-3 text-sm sm:text-base transition ${
                    selectedSlots[0]?.label === option.label
                      ? "bg-[#5D9028] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {option.label}
                </button>
              )),
            )}
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-6 text-center ">
          სტუდენტს შეუძლია მაქსიმუმ 2 დროის მონაკვეთის არჩევა.
        </p>

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-between">
          <button
            onClick={onClose}
            className="w-full sm:w-auto border border-gray-300 px-5 py-2.5 rounded-lg hover:bg-gray-100 transition"
          >
            გაუქმება
          </button>

          <button
            disabled={selectedSlots.length === 0}
            onClick={onContinue}
            className="bg-[#5D9028] text-white px-4 py-2 rounded-lg hover:bg-[#4A7A20] transitionw-full sm:w-auto bg-[#5D9028] text-white px-5 py-2.5 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            გაგრძელება
          </button>
        </div>
      </div>
    </div>
  );
}
