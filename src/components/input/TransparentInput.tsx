interface TransparentInputProps {
    classNames?: string;
    type: string;
    placeholder: string;
    value: any;
    max?: number;
    setValue: React.Dispatch<React.SetStateAction<any>>;
  }
  
  const TransparentInput = ({
    classNames,
    type,
    placeholder,
    value,
    max,
    setValue,
  }: TransparentInputProps) => {
    return (
      <input
        className={`w-full text-front bg-transparent focus:outline-none ${classNames}`}
        placeholder={placeholder}
        type={type}
        min={0}
        max={max}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  };
  
  export default TransparentInput;
  