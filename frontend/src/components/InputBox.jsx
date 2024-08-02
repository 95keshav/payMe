/* eslint-disable react/prop-types */
export const InputBox = ({ label, placeholder, type, onChangeHandler }) => {
  return (
    <div>
      <div className="font-medium text-sm text-left py-2">{label}</div>
      <input
        onChange={onChangeHandler}
        type={type}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    </div>
  );
};
