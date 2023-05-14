import "./App.css";
// Hooks
import { useEffect, useState } from "react";
import AddFieldModal from "./components/AddFieldModal";
// Mantine components
import {
  Checkbox,
  Input,
  Select,
  Textarea,
  Text,
  NumberInput,
  TextInput,
  Box,
  Button,
  Container,
  Radio,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker } from "@mantine/dates";
// Types
import { IDetail } from "./types/detail.type";

function App() {
  const [detail, setDetail]: [IDetail[], any] = useState([]);
  const [inputFields, setInputFields] = useState([...detail]);
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState(["React", "Angular", "Svelte", "Vue"]);
  const [val, setVal] = useState<string | null>(null);
  const [dateValue, setDateValue] = useState(new Date());
  const [stringValue, setStringValue] = useState("");
  const [numberVal, setNumberVal] = useState<number | "">(0);
  const [radioChecked, setRadioChecked] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editorTarget, setEditorTarget]: [IDetail, any] = useState();

  // const [datePickvalue, setDatePickValue] = useState<[Date, Date]>([
  //   new Date(2021, 11, 1),
  //   new Date(2021, 11, 5),
  // ]);

  const form = useForm({
    initialValues: { email: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  useEffect(() => {
    console.log("inputFieldetd is", detail);
  }, []);
  const handleFormChange = (index: number, event: any) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(inputFields);
  };
  const changeEditStatus = (index: number) => {
    if (index !== undefined) {
      const target: IDetail = inputFields[index];
      setEditorTarget(target);
    }
    setEditing(!editing);
  };

  const removeFields = (index: number) => {
    let data = inputFields;
    data.splice(index, 1);
    setDetail(data);
  };

  const handleFieldDetail = (detail: IDetail) => {
    console.log(inputFields);
    console.log("detail is", detail);
    setInputFields([...inputFields, detail]);
  };

  return (
    <>
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          textAlign: "center",
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          },
        })}
      >
        <form onSubmit={submit}>
          <Text>"لیست فرم ها"</Text>
          <Container>
            {inputFields.map((input, index) => {
              return (
                <Box
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                    justifyContent: "center",
                    borderRadius: theme.radius.md,
                    display: "flex",
                  })}
                >
                  <Input.Wrapper
                    label={input.title}
                    required={input.checked}
                    ta="center"
                    changeEditStatus={changeEditStatus} 
                    onChange={(event) => handleFormChange(index, event)}
                  >
                    {input.selectValue === "number" && (
                      <NumberInput
                        key={Math.random().toString(16).slice(2)}
                        defaultValue={18}
                        placeholder={input.descriptiveLabel}
                        withAsterisk
                        value={numberVal}
                        onChange={setNumberVal}
                      />
                    )}
                    {input.selectValue === "Date" && (
                      <DatePicker
                        label={input.title}
                        value={dateValue}
                        onChange={setDateValue}
                      />
                    )}
                    {/* {input.selectValue === "DateRange" && (
                  <DateRangePicker
                    label="Book hotel"
                    placeholder="Pick dates range"
                    value={datePickvalue}
                    onChange={setDatePickValue}
                  /> */}
                    {/* )} */}
                    {input.selectValue === "CheckBox" && (
                      <Checkbox
                        label={input.descriptiveLabel}
                        checked={checked}
                        onChange={(event) =>
                          setChecked(event.currentTarget.checked)
                        }
                      />
                    )}
                    {input.selectValue === "Select" && (
                      <Select
                        label={input.title}
                        data={data}
                        placeholder="Select items"
                        nothingFound="Nothing found"
                        searchable
                        value={val}
                        onChange={(event) => setVal(event)}
                      />
                      // <Select
                      //   label=
                      //   placeholder={input.descriptiveLabel}
                      //   data={[
                      //     { value: "react", label: "React" },
                      //     { value: "ng", label: "Angular" },
                      //     { value: "svelte", label: "Svelte" },
                      //     { value: "vue", label: "Vue" },
                      //   ]}
                      // />
                    )}
                    {input.selectValue === "text" && (
                      <Textarea
                        placeholder={input.descriptiveLabel}
                        autosize
                        minRows={2}
                        maxRows={4}
                      />
                    )}
                    {input.selectValue === "string" && (
                      <TextInput
                        key={Math.random().toString(16).slice(2)}
                        value={stringValue}
                        placeholder={input.descriptiveLabel}
                        onChange={(e: any) =>
                          setStringValue(e.currentTarget.value)
                        }
                      />
                    )}
                    {input.selectValue === "Radio" && (
                      <Radio
                        checked={radioChecked}
                        onChange={(event) =>
                          setRadioChecked(event.currentTarget.checked)
                        }
                      />
                    )}
                    {input.title === "email" ||
                      (input.title === "Email" && (
                        <TextInput
                          mt="sm"
                          label="Email"
                          placeholder="Email"
                          {...form.getInputProps("email")}
                        />
                      ))}
                  </Input.Wrapper>
                  <Button
                    mt={25}
                    ml={5}
                    variant="light"
                    onClick={() => removeFields(index)}
                  >
                    Remove
                  </Button>
                </Box>
              );
            })}
          </Container>
        </form>
        <AddFieldModal handleFieldDetail={handleFieldDetail} />
        <Button color="lime" radius="lg" onClick={submit}>
          Submit
        </Button>
      </Box>
    </>
  );
}
export default App;
