export default function QRModal({ open, onClose, qrImage }) {
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
          src={`data:image/png;base64,${qrImage}`}
          alt="QR Code"
          className="mx-auto w-40 h-40"
        />
      </div>
    </div>
  );
}
