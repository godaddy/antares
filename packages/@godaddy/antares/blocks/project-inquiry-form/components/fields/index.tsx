'use client';

import { useCallback } from 'react';
import {
  Box,
  Button,
  DatePicker,
  DatePickerCalendar,
  Detail,
  FieldError,
  Flex,
  Input,
  Label,
  Select,
  SelectItem,
  SelectOptions,
  Text,
  TextField
} from '@godaddy/antares';
import type { CalendarDate } from '@godaddy/antares/date';

const fields = [
  { name: 'fullName', label: 'Full name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone Number', type: 'tel', autoComplete: 'tel' }
] as const;

/** Names of the required contact fields rendered by the form. */
type FieldName = (typeof fields)[number]['name'];

interface FieldsProps {
  /** Current text field values. */
  values: Record<FieldName, string>;

  /** Current optional date. */
  dueDate: CalendarDate | null;

  /** Updates one text field. */
  onChange: (name: FieldName, value: string) => void;

  /** Clears the demo confirmation after a field changes. */
  onProjectTypeChange: () => void;

  /** Updates the optional date. */
  onDateChange: (value: CalendarDate | null) => void;

  /** Clears the optional date. */
  onClearDate: () => void;
}

interface ContactFieldProps {
  /** Field metadata used to render the contact input. */
  field: (typeof fields)[number];

  /** Current value for the contact input. */
  value: string;

  /** Updates the field value in the parent form. */
  onChange: (name: FieldName, value: string) => void;
}

/** Renders one required contact field from the form's field metadata. */
function ContactField({ field, value, onChange }: ContactFieldProps) {
  const handleChange = useCallback(
    function handleChange(nextValue: string) {
      onChange(field.name, nextValue);
    },
    [field.name, onChange]
  );

  return (
    <TextField
      name={field.name}
      type={field.type}
      value={value}
      isRequired
      validationBehavior="native"
      onChange={handleChange}
    >
      <Label>{field.label}</Label>
      <Input autoComplete={field.autoComplete} />
      <FieldError />
    </TextField>
  );
}

/** Composes the required contact fields with the optional project metadata. */
export function Fields({ values, dueDate, onChange, onProjectTypeChange, onDateChange, onClearDate }: FieldsProps) {
  return (
    <>
      {fields.map(function renderField(field) {
        return <ContactField key={field.name} field={field} value={values[field.name]} onChange={onChange} />;
      })}

      <Select name="projectType" defaultValue="airo" isRequired onChange={onProjectTypeChange}>
        <Label>Project type</Label>
        <Button slot="trigger" />
        <Detail slot="description">Choose the service that best fits your goals.</Detail>
        <SelectOptions popoverProps={{ 'aria-label': 'Project type' }}>
          <SelectItem id="airo">Airo App Builder</SelectItem>
          <SelectItem id="antares">GoDaddy Antares</SelectItem>
          <SelectItem id="none">None</SelectItem>
        </SelectOptions>
      </Select>

      <Flex direction="column" gap="sm">
        <DatePicker name="dueDate" value={dueDate} onChange={onDateChange}>
          <Label>Due date</Label>
          <Button slot="trigger" />
          <Text slot="description">Leave blank if there’s no set date.</Text>
          <DatePickerCalendar popoverProps={{ 'aria-label': 'Due date' }} />
        </DatePicker>
        {dueDate ? (
          <Box alignSelf="start">
            <Button type="button" variant="inline" onPress={onClearDate}>
              Clear date
            </Button>
          </Box>
        ) : null}
      </Flex>
    </>
  );
}

export type { FieldName };
