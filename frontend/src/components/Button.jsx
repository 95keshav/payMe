export const Button = ({ label, onClick }) => {
  return (
    <>
      <button
        className="w-full text-white bg-gray-800 hover:bg-gray-900 rounded-lg focus:outline-none font-medium px-5 py-2.5 mt-2 mb-2"
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};
