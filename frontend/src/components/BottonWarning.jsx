import { Link } from "react-router-dom";

export const ButtonWarning = ({ warningText, warningLinkText, warningLink }) => {
  return (
    <div className="flex justify-center text-sm py-2">
      <p>{warningText}</p>
      <Link className="pointer underline pl-1 cursor-pointer" to={warningLink}>
        {warningLinkText}
      </Link>
    </div>
  );
};
