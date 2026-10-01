import{i as e}from"./preload-helper-CYPGu_IH.js";import{F as t}from"./iframe-DDpw9Mv5.js";import{S as n,l as r,s as i,u as a}from"./blocks-DfRQu1mI.js";import{t as o}from"./mdx-react-shim-CurZKnCZ.js";import{n as s}from"./runtime-CJCwj6M8.js";import{n as c,t as l}from"./storybook-runtime-BT-zzefm.js";import{Preview as u,n as d,t as f}from"./project-inquiry-form.stories-D5KbW3Ba.js";function p(e){let t={h1:`h1`,p:`p`,...n(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(i,{of:d,name:`Overview`,id:`blocks-project-inquiry-form`}),`
`,(0,h.jsx)(t.h1,{id:`project-inquiry-form`,children:`Project inquiry form`}),`
`,(0,h.jsx)(t.p,{children:`A responsive project inquiry page with local file previews.`}),`
`,(0,h.jsx)(l,{block:{id:`project-inquiry-form`,installCommand:`npx shadcn@latest add godaddy/antares/blocks/project-inquiry-form`,files:[{path:`components/attached-files/index.module.css`,language:`css`,source:`.row {
  border: 1px solid var(--ux-box-border-color, #d0d5dd);
}

.details {
  min-inline-size: 0;
}

.fileName {
  overflow-wrap: anywhere;
}

.pickerButton {
  display: flex;
  inline-size: 100%;
  min-block-size: 5rem;
  padding: 0.75rem 1rem;
  border: 1px dashed var(--ux-box-border-color, #8d8d8d);
  border-radius: var(--ux-2jubes, 6px);
  background: var(--ux-box-backgroundColor, #f7f7f7);
  white-space: normal;
}
`},{path:`components/attached-files/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback, useId } from 'react';
import { Button, Detail, FileTrigger, Flex, Icon, Text } from '@godaddy/antares';
import { FilePreview } from '../file-preview/index.tsx';
import styles from './index.module.css';

export const acceptedTypes = ['application/pdf', 'image/jpeg', 'image/gif', 'image/png'];

interface AttachedFilesProps {
  /** Files currently selected in the form. */
  files: File[];

  /** Validation or reading error shared by both attachment entry points. */
  error: string;

  /** Sends the native selection to the form's shared file handler. */
  onSelect: (files: FileList | null) => void;

  /** Removes one attachment from the form. */
  onRemove: (file: File) => void;
}

export function fileKey(file: File) {
  return JSON.stringify([file.name, file.size, file.type, file.lastModified]);
}

const fileSizeFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

interface AttachmentRowProps {
  file: File;
  onRemove: (file: File) => void;
}

function AttachmentRow({ file, onRemove }: AttachmentRowProps) {
  const handleRemove = useCallback(
    function handleRemove() {
      onRemove(file);
    },
    [file, onRemove]
  );

  return (
    <Flex gap="md" padding="sm" rounding="md" alignItems="center" className={styles.row}>
      <FilePreview file={file} />
      <Flex direction="column" gap="sm" flex="1" className={styles.details}>
        <Text className={styles.fileName}>{file.name}</Text>
        <Detail size="sm">{fileSizeFormatter.format(file.size / (1024 * 1024))} MB</Detail>
      </Flex>
      <Button type="button" variant="minimal" size="sm" aria-label={\`Remove \${file.name}\`} onPress={handleRemove}>
        <Icon icon="x" aria-hidden="true" />
      </Button>
    </Flex>
  );
}

/** Presents the full-area file picker trigger and selected attachments. */
export function AttachedFiles({ files, error, onSelect, onRemove }: AttachedFilesProps) {
  const sizeHintId = useId();
  const formatHintId = useId();
  const errorId = useId();

  return (
    <Flex direction="column" gap="sm" role="group" aria-label="Attach files (required)">
      <Text>
        Attach files <span aria-hidden="true">*</span>
      </Text>

      <FileTrigger acceptedFileTypes={acceptedTypes} allowsMultiple onSelect={onSelect}>
        <Button
          type="button"
          variant="minimal"
          aria-label="Add files"
          aria-describedby={\`\${sizeHintId} \${formatHintId}\${error ? \` \${errorId}\` : ''}\`}
          className={styles.pickerButton}
        >
          <Flex direction="column" alignItems="center" gap="xs">
            <Flex alignItems="center" gap="xs">
              <Icon icon="add" aria-hidden="true" />
              <Text as="strong">Add files</Text>
              <Text>or drag them here.</Text>
            </Flex>
            <Detail id={sizeHintId} align="center" size="sm">
              The file must be less than 256MB
            </Detail>
          </Flex>
        </Button>
      </FileTrigger>

      <Detail id={formatHintId} align="center" size="sm">
        Supported formats: <strong>.pdf, .jpg, .gif, .png</strong>
      </Detail>

      {error ? (
        <Text id={errorId} role="alert" emphasis="critical">
          {error}
        </Text>
      ) : null}

      {files.map(function renderFile(file) {
        return <AttachmentRow key={fileKey(file)} file={file} onRemove={onRemove} />;
      })}
    </Flex>
  );
}
`},{path:`components/benefits/index.module.css`,language:`css`,source:`.list {
  margin: 0;
  padding: 0;
  list-style: none;
}
`},{path:`components/benefits/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback } from 'react';
import { Detail, Flex, Icon, Text } from '@godaddy/antares';
import styles from './index.module.css';

const benefits = [
  {
    title: 'Website Design Services',
    description: 'We’ll build your website so you can get back to focusing on your business.'
  },
  {
    title: 'Marketing Services',
    description: 'Our team of experts will create and manage your social media presence.'
  },
  {
    title: 'SEO Services',
    description: 'We’ll use Google’s best practices to help your site get the traffic it deserves.'
  }
] as const;

/** Lists the services that can support the visitor alongside the inquiry form. */
export function Benefits() {
  const renderBenefit = useCallback(function renderBenefit(benefit: (typeof benefits)[number]) {
    return (
      <Flex as="li" key={benefit.title} gap="sm" alignItems="start">
        <Icon icon="checkmark" width={18} height={18} aria-hidden="true" />
        <Flex direction="column" gap="xs">
          <Text as="strong">{benefit.title}</Text>
          <Detail size="sm">{benefit.description}</Detail>
        </Flex>
      </Flex>
    );
  }, []);

  return (
    <Flex as="ul" direction="column" gap="lg" aria-label="Services we can help with" className={styles.list}>
      {benefits.map(renderBenefit)}
    </Flex>
  );
}
`},{path:`components/drop-overlay/index.module.css`,language:`css`,source:`.overlay {
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px dashed var(--ux-f7kpiw, #00a4a6);
  border-radius: var(--ux-2jubes, 16px);
  background-color: rgba(216, 239, 239, 0.9);
  pointer-events: none;
  inset: 0;
}
`},{path:`components/drop-overlay/index.tsx`,language:`tsx`,source:`import { Box, Flex, Icon, Text } from '@godaddy/antares';
import styles from './index.module.css';

interface DropOverlayProps {
  /** Whether an accepted file is currently over the inquiry form. */
  isDropTarget: boolean;
}

/** Shows the green drop feedback while files are over the inquiry form. */
export function DropOverlay({ isDropTarget }: DropOverlayProps) {
  if (!isDropTarget) return null;

  return (
    <Box role="status" aria-live="polite" aria-label="Drop Files to upload." className={styles.overlay}>
      <Flex direction="column" alignItems="center" gap="sm" padding="xl">
        <Icon icon="upload" aria-hidden="true" />
        <Text as="strong">Drop Files to upload.</Text>
      </Flex>
    </Box>
  );
}
`},{path:`components/fields/index.tsx`,language:`tsx`,source:`'use client';

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
  field: (typeof fields)[number];
  value: string;
  onChange: (name: FieldName, value: string) => void;
}

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
  const handleDateChange = useCallback(
    function handleDateChange(value: CalendarDate | null) {
      onDateChange(value);
    },
    [onDateChange]
  );

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
        <DatePicker name="dueDate" value={dueDate} onChange={handleDateChange}>
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
`},{path:`components/file-preview/index.module.css`,language:`css`,source:`.preview {
  inline-size: 3.5rem;
  block-size: 3.5rem;
  flex-shrink: 0;
  object-fit: cover;
}
`},{path:`components/file-preview/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback, useEffect, useState } from 'react';
import { Box, Flex, Text } from '@godaddy/antares';
import styles from './index.module.css';

interface FilePreviewProps {
  /** Selected file to preview. */
  file: File;
}

/** Creates local image previews and gives non-image files a readable fallback. */
export function FilePreview({ file }: FilePreviewProps) {
  const [url, setUrl] = useState<string>();
  const [failed, setFailed] = useState(false);

  useEffect(
    function createPreview() {
      if (!file.type.startsWith('image/')) return;

      const next = URL.createObjectURL(file);
      setUrl(next);
      setFailed(false);

      return function releasePreview() {
        URL.revokeObjectURL(next);
      };
    },
    [file]
  );

  const handlePreviewError = useCallback(function handlePreviewError() {
    setFailed(true);
  }, []);

  if (url && !failed) {
    return (
      <Box
        as="img"
        src={url}
        alt={file.name}
        width={56}
        height={56}
        rounding="lg"
        className={styles.preview}
        onError={handlePreviewError}
      />
    );
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      rounding="lg"
      elevation="card"
      aria-hidden="true"
      className={styles.preview}
    >
      <Text>{file.type === 'application/pdf' ? 'PDF' : 'IMG'}</Text>
    </Flex>
  );
}
`},{path:`components/project-inquiry-form/index.module.css`,language:`css`,source:`.root {
  max-inline-size: 80rem;
  min-inline-size: 0;
  margin-inline: auto;
}

.columns {
  min-inline-size: 0;
}

.visualColumn {
  min-inline-size: 0;
}

.heroImage {
  display: block;
  inline-size: 100%;
  block-size: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.form {
  position: relative;
  min-inline-size: 0;
}

.dropZone {
  inline-size: 100%;
  max-inline-size: 100%;
  min-inline-size: 0;
  margin: 0;
  background: transparent;
  border: 0;
  border-radius: 0;
  justify-self: stretch;
}
`},{path:`components/project-inquiry-form/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback, useId, useState, type ComponentProps, type FormEvent } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  DropZone,
  type DropZoneRenderProps,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  TextContext,
  isFileDropItem
} from '@godaddy/antares';
import type { CalendarDate } from '@godaddy/antares/date';
import { DropOverlay } from '../drop-overlay/index.tsx';
import { AttachedFiles, acceptedTypes, fileKey } from '../attached-files/index.tsx';
import { Benefits } from '../benefits/index.tsx';
import { type FieldName, Fields } from '../fields/index.tsx';
import styles from './index.module.css';

const maximumSize = 256 * 1024 * 1024;
const initialValues: Record<FieldName, string> = { fullName: '', email: '', phone: '' };
const heroImage = {
  src: 'https://placehold.co/1280x720/eef2f7/667085?text=Project+image',
  alt: 'Project image placeholder',
  width: 1280,
  height: 720
};

type FormDropEvent = Parameters<NonNullable<ComponentProps<typeof DropZone>['onDrop']>>[0];

/** A complete, interactive project inquiry page with a local demo submission. */
export function ProjectInquiryForm() {
  const headingId = useId();
  const [values, setValues] = useState(initialValues);
  const [dueDate, setDueDate] = useState<CalendarDate | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const canSubmit =
    Object.values(values).every(function isFilled(value) {
      return value.trim().length > 0;
    }) && files.length > 0;

  const clearConfirmation = useCallback(function clearConfirmation() {
    setSubmitted(false);
  }, []);

  const addFiles = useCallback(
    function addFiles(list: FileList | File[] | null) {
      if (!list?.length) return;

      const incoming = Array.from(list);
      const valid = incoming.filter(function accept(file) {
        return acceptedTypes.includes(file.type) && file.size < maximumSize;
      });

      setFileError(valid.length === incoming.length ? '' : 'Use PDF, JPG, GIF, or PNG files smaller than 256MB.');
      if (valid.length === 0) return;

      setFiles(function appendFiles(previous) {
        const unique = new Map(
          previous.map(function identify(file) {
            return [fileKey(file), file];
          })
        );

        for (const file of valid) {
          const key = fileKey(file);
          if (!unique.has(key)) unique.set(key, file);
        }

        return Array.from(unique.values());
      });
      clearConfirmation();
    },
    [clearConfirmation]
  );

  const handleDropOperation = useCallback<NonNullable<ComponentProps<typeof DropZone>['getDropOperation']>>(
    function handleDropOperation(types) {
      return acceptedTypes.some(function supportsType(type) {
        return types.has(type);
      })
        ? 'copy'
        : 'cancel';
    },
    []
  );

  const handleDrop = useCallback(
    async function handleDrop(event: FormDropEvent) {
      if (event.dropOperation === 'cancel') return;

      try {
        const dropped = await Promise.all(
          event.items.filter(isFileDropItem).map(function readFile(item) {
            return item.getFile();
          })
        );
        addFiles(dropped);
      } catch {
        setFileError('We couldn’t read these files. Please try again.');
      }
    },
    [addFiles]
  );

  const handleFieldChange = useCallback(
    function handleFieldChange(name: FieldName, value: string) {
      setValues(function updateValues(previous) {
        return { ...previous, [name]: value };
      });
      clearConfirmation();
    },
    [clearConfirmation]
  );

  const handleDateChange = useCallback(
    function handleDateChange(value: CalendarDate | null) {
      setDueDate(value);
      clearConfirmation();
    },
    [clearConfirmation]
  );

  const handleClearDate = useCallback(
    function handleClearDate() {
      setDueDate(null);
      clearConfirmation();
    },
    [clearConfirmation]
  );

  const handleRemoveFile = useCallback(
    function handleRemoveFile(file: File) {
      setFiles(function removeFile(previous) {
        return previous.filter(function keepFile(candidate) {
          return fileKey(candidate) !== fileKey(file);
        });
      });
      clearConfirmation();
    },
    [clearConfirmation]
  );

  const handleSubmit = useCallback(
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (canSubmit) setSubmitted(true);
    },
    [canSubmit]
  );

  const renderDropTarget = useCallback(
    function renderDropTarget({ isDropTarget }: DropZoneRenderProps) {
      return (
        <TextContext.Provider value={null}>
          <Flex
            as="form"
            direction="column"
            gap="lg"
            padding="xl"
            rounding="xl"
            elevation="card"
            aria-labelledby={headingId}
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <Flex direction="column" gap="xs">
              <Heading id={headingId} level={2}>
                Talk with an expert to help with your project goals.
              </Heading>
            </Flex>

            <Fields
              values={values}
              dueDate={dueDate}
              onChange={handleFieldChange}
              onProjectTypeChange={clearConfirmation}
              onDateChange={handleDateChange}
              onClearDate={handleClearDate}
            />

            <AttachedFiles files={files} error={fileError} onSelect={addFiles} onRemove={handleRemoveFile} />

            <Button type="submit" variant="primary" isDisabled={!canSubmit}>
              <Icon icon="calendar" aria-hidden="true" />
              Schedule a Call
            </Button>

            <Text>
              Or call us at <a href="tel:+14803663344">(480) 366-3344</a>
            </Text>

            <Checkbox name="receiveTexts" onChange={clearConfirmation}>
              I want to receive texts from GoDaddy about these products and services.
            </Checkbox>

            {submitted ? (
              <Alert emphasis="success">Demo complete. No information was sent and no call was scheduled.</Alert>
            ) : null}

            <DropOverlay isDropTarget={isDropTarget} />
          </Flex>
        </TextContext.Provider>
      );
    },
    [
      addFiles,
      canSubmit,
      clearConfirmation,
      dueDate,
      fileError,
      files,
      handleClearDate,
      handleDateChange,
      handleFieldChange,
      handleRemoveFile,
      handleSubmit,
      headingId,
      submitted,
      values
    ]
  );

  return (
    <Box padding="xl" className={styles.root}>
      <Grid
        columns="repeat(auto-fit, minmax(min(100%, 30rem), 1fr))"
        gap="2xl"
        alignItems="start"
        className={styles.columns}
      >
        <Flex direction="column" gap="xl" className={styles.visualColumn}>
          <Box
            as="img"
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
            rounding="xl"
            alignSelf="start"
            className={styles.heroImage}
          />
          <Benefits />
        </Flex>

        <DropZone
          aria-label="Upload project files"
          padding="0"
          alignItems="stretch"
          justifyContent="start"
          className={styles.dropZone}
          getDropOperation={handleDropOperation}
          onDrop={handleDrop}
        >
          {renderDropTarget}
        </DropZone>
      </Grid>
    </Box>
  );
}
`},{path:`index.tsx`,language:`tsx`,source:`export { ProjectInquiryForm } from './components/project-inquiry-form/index.tsx';
`}]},children:(0,h.jsx)(r,{of:u,inline:!0})})]})}function m(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;e((()=>{h=t(),o(),c(),a(),s(),f()}))();export{m as default};