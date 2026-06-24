import { useState } from "react";

export default function LecturerTimeModal({
  open,
  room,
  slots,
  selectedBlocks,
  setSelectedBlocks,
  onClose,
  onContinue,
}) {
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  if (!open) return null;

  const handleStartClick = (slot) => {
    setSelectedStart(slot.startBlock);
    setSelectedDuration(null);
  };

  const handleDurationClick = (option, startBlock) => {
    setSelectedDuration(option);

    const blocks = Array.from(
      { length: option.duration },
      (_, i) => startBlock + i,
    );
    setSelectedBlocks(blocks);
  };

  const selectedSlot = slots.find((s) => s.startBlock === selectedStart);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[650px]">
        <h2 className="text-xl font-semibold mb-5">აირჩიეთ დრო</h2>

        {slots.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            ამ დღეს თავისუფალი დრო არ არის
          </p>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-2">დაწყების დრო:</p>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {slots.map((slot) => (
                <button
                  key={slot.startBlock}
                  onClick={() => handleStartClick(slot)}
                  className={`border rounded-lg p-3 text-sm transition ${
                    selectedStart === slot.startBlock
                      ? "bg-[#1A71B7] text-white border-[#1A71B7]"
                      : "hover:border-[#1A71B7]"
                  }`}
                >
                  {slot.startsAt}
                </button>
              ))}
            </div>

            {selectedSlot && (
              <>
                <p className="text-sm text-gray-500 mb-2">ხანგრძლივობა:</p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {selectedSlot.durationOptions.map((opt) => (
                    <button
                      key={opt.duration}
                      onClick={() =>
                        handleDurationClick(opt, selectedSlot.startBlock)
                      }
                      className={`border rounded-lg p-3 text-sm transition ${
                        selectedDuration?.duration === opt.duration
                          ? "bg-[#1A71B7] text-white border-[#1A71B7]"
                          : "hover:border-[#1A71B7]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <div className="flex justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              setSelectedStart(null);
              setSelectedDuration(null);
            }}
            className="border px-4 py-2 rounded-lg"
          >
            გაუქმება
          </button>
          <button
            disabled={!selectedStart || !selectedDuration}
            onClick={() => {
              onContinue(selectedBlocks);
              setSelectedStart(null);
              setSelectedDuration(null);
            }}
            className="bg-[#1A71B7] text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            გაგრძელება
          </button>
        </div>
      </div>
    </div>
  );
}
