const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 p-1 py-3 bg-secondary w-16 justify-center rounded-tr-2xl rounded-bl-2xl rounded-br-2xl">
      <div className="w-2 h-2 bg-secondary-foreground rounded-full animate-bounce" />{" "}
      <div className="w-2 h-2 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-.3s]" />
      <div className="w-2 h-2 bg-secondary-foreground rounded-full animate-bounce [animation-delay:-.5s]" />
    </div>
  );
};

export default TypingIndicator;
