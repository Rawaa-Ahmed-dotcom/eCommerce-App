const FormErrorMsg = ({ msg }: { msg: string }) => {
  return (
    <p className="text-[#2A2B37] bg-[#FCEDE9] border border-[#d3b1a9] p-[0.5em] rounded-lg text-[15px] leading-5.75">
      {msg}
    </p>
  );
};

export default FormErrorMsg;
