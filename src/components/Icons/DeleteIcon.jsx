const DeleteIcon = ({ className, color = "#1A71B7" }) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.66667 5H15V15.8333C15 16.2936 14.6269 16.6667 14.1667 16.6667H2.5C2.03977 16.6667 1.66667 16.2936 1.66667 15.8333V5ZM4.16667 2.5V0.833333C4.16667 0.3731 4.53977 0 5 0H11.6667C12.1269 0 12.5 0.3731 12.5 0.833333V2.5H16.6667V4.16667H0V2.5H4.16667ZM5.83333 1.66667V2.5H10.8333V1.66667H5.83333ZM5.83333 8.33333V13.3333H7.5V8.33333H5.83333ZM9.16667 8.33333V13.3333H10.8333V8.33333H9.16667Z"
        fill="#5D9028"
      />
    </svg>
  );
};

export default DeleteIcon;
