const TeamSelect = ({
  label,
  value,
  onChange,
  options
}) => {
  return (
    <div>

      <label className="block mb-2 text-white">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="
          w-full
          p-3
          rounded-lg
          bg-slate-800
          text-white
          border
          border-slate-600
        "
      >
        <option value="">
          Select
        </option>

        {options.map((item) => (
          <option key={item}>
            {item}
          </option>
        ))}

      </select>

    </div>
  );
};

export default TeamSelect;