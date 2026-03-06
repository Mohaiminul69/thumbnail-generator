import CppIcon from "./icons/CPPIcon";
import JavaScriptIcon from "./icons/JavascriptIcon";
import RubyIcon from "./icons/RubyIcon";
import PythonIcon from "./icons/PythonIcon";

const StackIcons = () => {
  const icons = {
    "C++": <CppIcon className="drop-shadow-[0_6px_15px_rgba(0,0,0,0.8)]" />,
    "Java Script": (
      <JavaScriptIcon className="p-0.5 drop-shadow-[0_6px_15px_rgba(0,0,0,0.8)]" />
    ),
    Ruby: <RubyIcon className="drop-shadow-[0_6px_15px_rgba(0,0,0,0.8)]" />,
    Python: <PythonIcon className="drop-shadow-[0_6px_15px_rgba(0,0,0,0.8)]" />,
  };

  return (
    <div className="flex items-end gap-7 text-white text-2xl font-bold">
      {Object.entries(icons).map(([name, icon], idx) => (
        <div key={idx} className="flex flex-col items-center space-y-3">
          <div className="flex size-16 items-center justify-center">{icon}</div>
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
};

export default StackIcons;
