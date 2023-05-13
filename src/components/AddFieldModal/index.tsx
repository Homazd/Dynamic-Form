import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Group,
  TextInput,
  Select,
  Checkbox,
} from "@mantine/core";
import { useState } from "react";

export interface inputProps {
    handleFieldDetail: any;
}
const AddFieldModal = ({handleFieldDetail} : inputProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState("عنوان فیلد");
  const [descriptiveLabel, setDescriptiveLabel] = useState("عنوان نمایشی");

  const fieldDetail = {
    title,
    descriptiveLabel,
    checked,
  }

  const handleOnTitle = (event: any) => {
    console.log(event.target.value);
    let data = event.target.value;
    setTitle(data);
    console.log(title);
  };
  const handleOnDescreptiveLabel = (event: any) => {
    console.log(event.target.value);
    let data = event.target.value;
    setDescriptiveLabel(data);
    console.log(descriptiveLabel);
  };

  const handleOnAddNewField = (e) => {
    console.log(fieldDetail);
    handleFieldDetail(fieldDetail)
    e.preventDefault();
    // let newField = { title, descriptiveLabel, checked };
    // setDetail([...detail, newField]);
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="افزودن فیلد">
        <TextInput
          label="لطفا عنوان فیلد را وارد کنید "
          placeholder="عنوان فیلد"
          onChange={(event) => handleOnTitle(event)}
        />
        <TextInput
          mt={20}
          label="لطفا عنوان نمایشی فیلد را وارد کنید "
          placeholder="عنوان نمایشی فیلد"
          onChange={(event) => handleOnDescreptiveLabel(event)}
        />
        <Select
          label="Your favorite framework/library"
          placeholder="Pick one"
          data={[
            { value: "react", label: "React" },
            { value: "ng", label: "Angular" },
            { value: "svelte", label: "Svelte" },
            { value: "vue", label: "Vue" },
          ]}
        />
        <Checkbox
          label="فیلد اجباری باشد"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
        <Button
          onClick={handleOnAddNewField}
        >
          Submit
        </Button>
      </Modal>
      <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group>
    </>
  );
};
export default AddFieldModal;
