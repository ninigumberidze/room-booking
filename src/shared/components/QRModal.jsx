export default function QRModal({ open, onClose, qrValue }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 rounded-lg text-center"
      >
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrValue}`}
          alt="QR"
          className="mx-auto"
        />

        <p className="mt-4 text-gray-500">კოდი: {qrValue}</p>
      </div>
    </div>
  );
}
