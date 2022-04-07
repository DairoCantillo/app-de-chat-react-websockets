import { useEffect, useState } from "react";
import io from "socket.io-client";
const ENDPOINT = "https://socketsnodedeca.herokuapp.com/";

interface IData {
  name: string;
  message: string;
}
const socket = io(ENDPOINT);
const App = () => {
  const [response, setResponse] = useState<Array<IData> | any>([]);
  const [data, setData] = useState<IData>({
    name: "Deca",
    message: "",
  });
  const handleChangeMessageInput = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLTextAreaElement;
    setData({ ...data, message: target.value });
  };
  useEffect(() => {
    socket.on("message", (data) => {
      console.log("entra");
      setResponse((response: any) => [...response, data]);

      return () => socket.disconnect();
    });
  }, []);
  const handleClick = () => {
    if (data.message.length > 0) {
      socket.emit("message", {
        message: data.message,
        name: data.name,
      });
    }
    setData({ name: data.name, message: "" });
  };
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="App">
      <div id="chat-window">
        {response.map((element: IData, index: any) => {
          return (
            <p key={index}>
              {element.name} : {element.message}
            </p>
          );
        })}
      </div>
      <input
        value={data.message}
        onChange={handleChangeMessageInput}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Message"
      />
      <button type="submit" onClick={handleClick}>
        Send
      </button>
    </div>
  );
};

export default App;
