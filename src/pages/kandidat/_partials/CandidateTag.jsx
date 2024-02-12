const checkColor = (status) => {
  if (status === "sent") {
    return "secondary";
  } else if (status === "review") {
    return "primary";
  } else if (status === "qualify") {
    return "green-custom";
  } else if (status === "failed") {
    return "red-custom";
  } else if (status === "expired") {
    return "gray-custom";
  }
};

function CandidateTag() {
  return (
    <div className={`self-end font-bold`}>
      <div
        className={`text-${checkColor(status)} bg-${checkColor(
          status
        )} bg-opacity-20 text-center rounded-full capitalize w-32 max-w-xs py-2`}
      >
        {status}
      </div>
    </div>
  );
}

export default CandidateTag;
