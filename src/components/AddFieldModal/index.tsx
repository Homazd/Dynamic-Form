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
const AddFieldModal = ({ handleFieldDetail }: inputProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState("عنوان فیلد");
  const [descriptiveLabel, setDescriptiveLabel] = useState("عنوان نمایشی");
  const [selectValue, setSelectValue] = useState<string | null>(null);

  const fieldDetail = {
    title,
    descriptiveLabel,
    checked,
    selectValue,
  };
  const handleOnAddNewField = () => {
    console.log(fieldDetail);
    handleFieldDetail(fieldDetail);
    console.log("selectValue is", selectValue);

    close();
    // let newField = { title, descriptiveLabel, checked };
    // setDetail([...detail, newField]);
  };

  const handleOnTitle = (event: any) => {
    let data = event.target.value;
    setTitle(data);
  };
  const handleOnDescreptiveLabel = (event: any) => {
    let data = event.target.value;
    setDescriptiveLabel(data);
    console.log(descriptiveLabel);
  };
  return (
    <>
      <Modal dir="rtl" ta="justify" opened={opened} onClose={close} title="افزودن فیلد">
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
        mt={10}
          label="نوع داده"
          placeholder="یکی را انتخاب کنید"
          searchable
          dropdownPosition="bottom"
          data={[
            { value: "number", label: "عددی" },
            { value: "string", label: "رشته ای" },
            { value: "text", label: "توضیحات متنی" },
            { value: "Date", label: "تاریخ" },
            { value: "DateRange", label: "بازه تاریخی" },
            { value: "Select", label: "انتخاب از لیست" },
            { value: "Radio", label: "رادیویی" },
            { value: "CheckBox", label: "چک باکس" },
          ]}
          value={selectValue}
          onChange={(e) => setSelectValue(e)}
        />
        <Checkbox
        my={10}
          label="فیلد اجباری باشد"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />

        <Button variant="light" onClick={handleOnAddNewField}>Submit</Button>
      </Modal>
      <Group position="center">
        <Button color="teal" radius="lg" size="md" my={20} onClick={open}>افزودن فیلد جدید</Button>
      </Group>
    </>
  );
};

export default AddFieldModal;
