import Header from "./Header";

export default function ProfileHeader({ userName, onProfileClick, children }) {
  return (
    <>
      <Header userName={userName} onProfileClick={onProfileClick} />
    </>
  );
}
