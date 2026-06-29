import Header from "./Header";

export default function ProfileHeader({
  userName,
  onProfileClick,
  children,
  color = "#5D9028",
}) {
  return (
    <>
      <Header
        userName={userName}
        onProfileClick={onProfileClick}
        color={color}
      />
    </>
  );
}
