import "./App.css";
import { useEffect, useState } from "react";
import AddFieldModal from "./components/AddFieldModal";
import { Input } from "@mantine/core";

function App() {
  const [detail, setDetail] = useState([
    {
      title: "عنوان فیلد",
      descriptiveLabel: "عنوان نمایشی",
      checked: false,
    },
  ]);
  const [inputFields, setInputFields] = useState([...detail]);

  useEffect(() => {
    console.log(inputFields);
    console.log(detail);
  }, []);
  const handleFormChange = (index: number, event: any) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(detail);
  };
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setDetail(data);
  };

  const handleFieldDetail = (detail) => {
    console.log(inputFields);
    console.log("detail is", detail);
    setDetail([...inputFields, detail]);
  };

  return (
    <>
      <form onSubmit={submit}>
        {detail.map((input, index) => {
          return (
            <div key={index}>
              <Input.Wrapper
                label={input.title}
                required
                maw={320}
                mx="auto"
                onChange={(event) => handleFormChange(index, event)}
              >
                <Input<any> id={index} placeholder={input.descriptiveLabel} />
              </Input.Wrapper>
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          );
        })}
      </form>
      <AddFieldModal handleFieldDetail={handleFieldDetail} />
      {/* <button onClick={addFields}>Add More ...</button> */}
      <button onClick={submit}>Submit</button>
    </>
  );
}

export default App;
