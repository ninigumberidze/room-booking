import Header from "./Header";

export default function ProfileHeader({
  userName,
  onProfileClick,
  onLogoutClick,
  children,
}) {
  return (
    <>
      <Header
        userName={userName}
        onProfileClick={onProfileClick}
        onLogoutClick={onLogoutClick}
      />

      <div className="max-w-6xl mx-auto p-8">{children}</div>
    </>
  );
}
