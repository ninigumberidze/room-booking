import Header from "./Header";

export default function ProfileHeader({ userName, onProfileClick, children }) {
  return (
    <>
      <Header userName={userName} onProfileClick={onProfileClick} />
      <div className="max-w-6xl mx-auto p-8">{children}</div>
    </>
  );
}
