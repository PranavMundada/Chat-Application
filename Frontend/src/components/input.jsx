function Input({ Ref, id, placeholder, submit }) {
  return (
    <div className="flex justify-between mt-5">
      <input
        ref={Ref}
        type="text"
        name={id}
        id={id}
        placeholder={placeholder}
        className="border-1 w-400 h-15"
      />
      <input
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          submit();
        }}
        value="submit"
        className="border-1 h-15  w-30"
      />
    </div>
  );
}

export default Input;
