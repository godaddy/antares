import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{N as n,P as r,l as i,s as a,u as o}from"./blocks-Bm4GL0Je.js";import{n as s}from"./runtime-gDTiWyXf.js";import{n as c,t as l}from"./storybook-runtime-DSNKIpBk.js";import{n as u,r as d,t as f}from"./project-inquiry-form.stories-LQTLf94V.js";function p(e){let t={h1:`h1`,p:`p`,...r(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(a,{of:d,name:`Overview`,id:`blocks-project-inquiry-form`}),`
`,(0,h.jsx)(t.h1,{id:`project-inquiry-form`,children:`Project inquiry form`}),`
`,(0,h.jsx)(t.p,{children:`A responsive project inquiry page with local file previews.`}),`
`,(0,h.jsx)(l,{block:{id:`project-inquiry-form`,description:`A responsive project inquiry page with local file previews.`,installCommand:`npx shadcn@latest add godaddy/antares/blocks/project-inquiry-form`,files:[{path:`components/attached-files/index.module.css`,language:`css`,source:`.row {
  inline-size: 100%;
  max-inline-size: 45.625rem;
}

.details {
  min-inline-size: 0;
  padding-inline-end: var(--size-space-040, calc(var(--ux-1sbfig8, 0.25rem) * 4));
}

.fileName {
  overflow-wrap: anywhere;
}

.pickerButton {
  --_attached-files-picker-padding-block: var(--size-space-030, calc(var(--ux-1sbfig8, 0.25rem) * 3));
  --_attached-files-picker-padding-inline: var(--size-space-040, calc(var(--ux-1sbfig8, 0.25rem) * 4));

  inline-size: 100%;
  min-block-size: 5rem;
  padding: var(--_attached-files-picker-padding-block) var(--_attached-files-picker-padding-inline);
  border: 1px dashed var(--color-surface-border-card, var(--ux-97h3vl, #d4dbe0));
  border-radius: var(--ux-2jubes, 6px);
  background: var(--ux-1mh0ktr, #f5f5f5);
  white-space: normal;
}
`},{path:`components/attached-files/index.tsx`,language:`tsx`,source:`'use client';

import { useCallback, useId, useRef } from 'react';
import { Button, Card, CornerActions, Detail, FileTrigger, Flex, Icon, Text } from '@godaddy/antares';
import { ACCEPTED_FILE_TYPES, fileKey, formatFileSize } from '../../data/files';
import { FilePreview } from '../file-preview';
import styles from './index.module.css';

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

interface AttachmentRowProps {
  /** Attachment represented by the row. */
  file: File;

  /** Removes the represented attachment from the form. */
  onRemove: (file: File) => void;

  /** Restores focus after the row is removed. */
  onRestoreFocus: () => void;
}

/** Renders a selected attachment with its preview, size, and remove action. */
function AttachmentRow({ file, onRemove, onRestoreFocus }: AttachmentRowProps) {
  const handleRemove = useCallback(
    function handleRemove() {
      onRemove(file);
      onRestoreFocus();
    },
    [file, onRemove, onRestoreFocus]
  );

  return (
    <Card direction="row" gap="sm" padding="sm" rounding="lg" className={styles.row}>
      <FilePreview file={file} />
      <Flex direction="column" gap="sm" flex="1" className={styles.details}>
        <Text className={styles.fileName}>{file.name}</Text>
        <Detail size="sm">{formatFileSize(file)}</Detail>
      </Flex>
      <CornerActions>
        <Button type="button" variant="minimal" size="sm" aria-label={\`Remove \${file.name}\`} onPress={handleRemove}>
          <Icon icon="x" aria-hidden="true" />
        </Button>
      </CornerActions>
    </Card>
  );
}

/** Presents the full-area file picker trigger and selected attachments. */
export function AttachedFiles({ files, error, onSelect, onRemove }: AttachedFilesProps) {
  const sizeHintId = useId();
  const formatHintId = useId();
  const errorId = useId();
  const pickerButtonRef = useRef<HTMLButtonElement>(null);

  const restorePickerFocus = useCallback(function restorePickerFocus() {
    pickerButtonRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <Flex direction="column" gap="sm" role="group" aria-label="Attach files (required)">
      <Text>
        Attach files <span aria-hidden="true">*</span>
      </Text>

      <FileTrigger acceptedFileTypes={ACCEPTED_FILE_TYPES} allowsMultiple onSelect={onSelect}>
        <Button
          ref={pickerButtonRef}
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
              Each file must be less than 256 MiB; up to 10 files and 256 MiB total
            </Detail>
          </Flex>
        </Button>
      </FileTrigger>

      <Detail id={formatHintId} align="center" size="sm">
        Supported formats: <strong>.pdf, .jpg, .jpeg, .gif, .png</strong>
      </Detail>

      {error ? (
        <Text id={errorId} role="alert" emphasis="critical">
          {error}
        </Text>
      ) : null}

      {files.map(function renderFile(file) {
        return (
          <AttachmentRow key={fileKey(file)} file={file} onRemove={onRemove} onRestoreFocus={restorePickerFocus} />
        );
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
  return (
    <Flex as="ul" direction="column" gap="lg" aria-label="Services we can help with" className={styles.list}>
      {benefits.map(function renderBenefit(benefit) {
        return (
          <Flex as="li" key={benefit.title} gap="sm" alignItems="start">
            <Icon icon="checkmark" width={18} height={18} aria-hidden="true" />
            <Flex direction="column" gap="xs">
              <Text as="strong">{benefit.title}</Text>
              <Detail size="sm">{benefit.description}</Detail>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}
`},{path:`components/drop-overlay/index.module.css`,language:`css`,source:`.overlay {
  position: absolute;
  z-index: 1;
  border: 1px dashed var(--ux-f7kpiw, #00a4a6);
  border-radius: inherit;
  background-color: rgba(216, 239, 239, 0.9);
  color: var(--color-surface-text-base, var(--ux-1leynsm, #111));
  pointer-events: none;
  inset: 0;
}
`},{path:`components/drop-overlay/index.tsx`,language:`tsx`,source:`import { Flex, Icon, Text } from '@godaddy/antares';
import styles from './index.module.css';

interface DropOverlayProps {
  /** Whether an accepted file is currently over the inquiry form. */
  isDropTarget: boolean;
}

/** Shows the green drop feedback while files are over the inquiry form. */
export function DropOverlay({ isDropTarget }: DropOverlayProps) {
  if (!isDropTarget) return null;

  return (
    <Flex
      role="status"
      aria-live="polite"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap="sm"
      padding="xl"
      className={styles.overlay}
    >
      <Icon icon="upload" aria-hidden="true" />
      <Text as="strong">Drop files to upload.</Text>
    </Flex>
  );
}
`},{path:`components/fields/index.tsx`,language:`tsx`,source:`'use client';

import { useRef } from 'react';
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
  return (
    <TextField
      name={field.name}
      type={field.type}
      value={value}
      isRequired
      validationBehavior="native"
      onChange={function handleChange(nextValue: string) {
        onChange(field.name, nextValue);
      }}
    >
      <Label>{field.label}</Label>
      <Input autoComplete={field.autoComplete} />
      <FieldError />
    </TextField>
  );
}

/** Composes the required contact fields with the optional project metadata. */
export function Fields({ values, dueDate, onChange, onProjectTypeChange, onDateChange, onClearDate }: FieldsProps) {
  const datePickerTriggerRef = useRef<HTMLButtonElement>(null);

  function handleClearDate() {
    onClearDate();
    datePickerTriggerRef.current?.focus({ preventScroll: true });
  }

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
          <Button ref={datePickerTriggerRef} slot="trigger" />
          <Text slot="description">Leave blank if there’s no set date.</Text>
          <DatePickerCalendar popoverProps={{ 'aria-label': 'Due date' }} />
        </DatePicker>
        {dueDate ? (
          <Box alignSelf="start">
            <Button type="button" variant="inline" onPress={handleClearDate}>
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
import { filePreviewKind } from '../../data/files';
import styles from './index.module.css';

interface FilePreviewProps {
  /** Selected file to preview. */
  file: File;
}

/** Creates local image previews and gives non-image files a readable fallback. */
export function FilePreview({ file }: FilePreviewProps) {
  const [url, setUrl] = useState<string>();
  const [failed, setFailed] = useState(false);
  const previewKind = filePreviewKind(file);

  useEffect(
    function createPreview() {
      if (previewKind !== 'image') return;

      const next = URL.createObjectURL(file);
      setUrl(next);
      setFailed(false);

      return function releasePreview() {
        URL.revokeObjectURL(next);
      };
    },
    [file, previewKind]
  );

  const handlePreviewError = useCallback(function handlePreviewError() {
    setFailed(true);
  }, []);

  if (url && !failed) {
    return (
      <Box
        as="img"
        src={url}
        alt=""
        loading="lazy"
        decoding="async"
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
      <Text>{previewKind === 'pdf' ? 'PDF' : 'IMG'}</Text>
    </Flex>
  );
}
`},{path:`components/project-inquiry-form/index.module.css`,language:`css`,source:`.root {
  box-sizing: border-box;
  inline-size: 100%;
  max-inline-size: 80rem;
  min-inline-size: 0;
  margin-inline: auto;
}

.columns {
  min-inline-size: 0;
}

.visualColumn {
  inline-size: 100%;
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
  box-sizing: border-box;
  inline-size: 100%;
  min-inline-size: 0;
}

.dropZone {
  inline-size: 100%;
  max-inline-size: 100%;
  min-inline-size: 0;
}
`},{path:`components/project-inquiry-form/index.tsx`,language:`tsx`,source:`'use client';

import { useId, useReducer, useRef, useState, type FormEvent } from 'react';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  TextContext,
  isFileDropItem,
  useDrop,
  type DropEvent
} from '@godaddy/antares';
import type { CalendarDate } from '@godaddy/antares/date';
import { DropOverlay } from '../drop-overlay';
import { AttachedFiles } from '../attached-files';
import { Benefits } from '../benefits';
import { type FieldName, Fields } from '../fields';
import { fileKey, isAcceptedFile, MAX_FILE_COUNT, MAX_TOTAL_FILE_SIZE } from '../../data/files';
import styles from './index.module.css';

const initialValues: Record<FieldName, string> = { fullName: '', email: '', phone: '' };
const heroImage = {
  src: 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" viewBox="0 0 1280 720"%3E%3Crect width="1280" height="720" fill="%23eef2f7"%2F%3E%3Ctext x="640" y="360" fill="%23667085" font-family="sans-serif" font-size="48" text-anchor="middle"%3EProject image%3C%2Ftext%3E%3C%2Fsvg%3E',
  alt: 'Project image placeholder',
  width: 1280,
  height: 720
};

const fileFormatError = 'Use PDF, JPG, GIF, or PNG files smaller than 256 MiB.';
const fileLimitError = 'Use up to 10 files with a combined size of 256 MiB or less.';
const dropZoneLabel = 'Upload project files';

interface AttachmentState {
  files: File[];
  error: string;
}

type AttachmentAction = { type: 'add'; files: File[] } | { type: 'read-error' } | { type: 'remove'; file: File };

const initialAttachmentState: AttachmentState = { files: [], error: '' };

function attachmentReducer(state: AttachmentState, action: AttachmentAction): AttachmentState {
  if (action.type === 'read-error') {
    return { ...state, error: 'We couldn’t read these files. Please try again.' };
  }

  if (action.type === 'remove') {
    return {
      files: state.files.filter(function keepFile(candidate) {
        return fileKey(candidate) !== fileKey(action.file);
      }),
      error: ''
    };
  }

  const valid = action.files.filter(isAcceptedFile);
  const validationError = valid.length === action.files.length ? '' : fileFormatError;

  if (valid.length === 0) {
    return { ...state, error: validationError };
  }

  const unique = new Map(
    state.files.map(function identify(file) {
      return [fileKey(file), file];
    })
  );

  for (const file of valid) {
    const key = fileKey(file);
    if (!unique.has(key)) unique.set(key, file);
  }

  const nextFiles = Array.from(unique.values());
  const totalSize = nextFiles.reduce(function sumFileSizes(total, file) {
    return total + file.size;
  }, 0);

  if (nextFiles.length > MAX_FILE_COUNT || totalSize > MAX_TOTAL_FILE_SIZE) {
    return { ...state, error: fileLimitError };
  }

  return { files: nextFiles, error: validationError };
}

type FormDropEvent = DropEvent;

/** A complete, interactive project inquiry page with a local demo submission. */
export function ProjectInquiryForm() {
  const headingId = useId();
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState(initialValues);
  const [dueDate, setDueDate] = useState<CalendarDate | null>(null);
  const [attachments, dispatchAttachments] = useReducer(attachmentReducer, initialAttachmentState);
  const [submitted, setSubmitted] = useState(false);
  const canSubmit =
    Object.values(values).every(function isFilled(value) {
      return value.trim().length > 0;
    }) && attachments.files.length > 0;

  const { dropProps, isDropTarget } = useDrop({
    ref: dropZoneRef,
    hasDropButton: false,
    onDrop: handleDrop
  });

  function clearConfirmation() {
    setSubmitted(false);
  }

  function addFiles(list: FileList | File[] | null) {
    if (!list?.length) return;

    const incoming = Array.from(list);
    dispatchAttachments({ type: 'add', files: incoming });
    if (incoming.some(isAcceptedFile)) clearConfirmation();
  }

  async function handleDrop(event: FormDropEvent) {
    try {
      const dropped = await Promise.all(
        event.items.filter(isFileDropItem).map(function readFile(item) {
          return item.getFile();
        })
      );
      addFiles(dropped);
    } catch {
      dispatchAttachments({ type: 'read-error' });
    }
  }

  function handleFieldChange(name: FieldName, value: string) {
    setValues(function updateValues(previous) {
      return { ...previous, [name]: value };
    });
    clearConfirmation();
  }

  function handleDateChange(value: CalendarDate | null) {
    setDueDate(value);
    clearConfirmation();
  }

  function handleClearDate() {
    setDueDate(null);
    clearConfirmation();
  }

  function handleRemoveFile(file: File) {
    dispatchAttachments({ type: 'remove', file });
    clearConfirmation();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (canSubmit) setSubmitted(true);
  }

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

        <Flex
          ref={dropZoneRef}
          role="region"
          aria-label={dropZoneLabel}
          padding="0"
          alignItems="stretch"
          justifyContent="start"
          {...dropProps}
          data-drop-target={isDropTarget || undefined}
          className={styles.dropZone}
        >
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

              <AttachedFiles
                files={attachments.files}
                error={attachments.error}
                onSelect={addFiles}
                onRemove={handleRemoveFile}
              />

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
        </Flex>
      </Grid>
    </Box>
  );
}
`},{path:`data/files.ts`,language:`ts`,source:`/** MIME types accepted by the project inquiry attachment picker. */
export const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/gif', 'image/png'];

/** File extensions accepted when the browser does not provide MIME metadata. */
const ACCEPTED_FILE_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.gif', '.png'];

const IMAGE_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.gif', '.png'];

/** Maximum accepted attachment size in bytes. */
const MAX_FILE_SIZE = 256 * 1024 * 1024;

/** Maximum number of attachments kept in memory at once. */
export const MAX_FILE_COUNT = 10;

/** Maximum combined size of attachments kept in memory at once. */
export const MAX_TOTAL_FILE_SIZE = 256 * 1024 * 1024;

const byteFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const kibibyteFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
const mebibyteFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

/** Returns the stable identity used to deduplicate and remove an attachment. */
export function fileKey(file: File) {
  return JSON.stringify([file.name, file.size, file.type, file.lastModified]);
}

/** Returns the extension used when a browser does not provide MIME metadata. */
function fileExtension(file: File) {
  const lastDot = file.name.lastIndexOf('.');
  return lastDot >= 0 ? file.name.slice(lastDot).toLowerCase() : '';
}

/** Classifies a supported attachment for its local preview. */
export function filePreviewKind(file: File) {
  const extension = fileExtension(file);

  if (file.type === 'application/pdf' || (!file.type && extension === '.pdf')) return 'pdf';
  if (file.type.startsWith('image/') || (!file.type && IMAGE_FILE_EXTENSIONS.includes(extension))) return 'image';

  return 'unknown';
}

/** Returns whether a file matches the supported format and size constraints. */
export function isAcceptedFile(file: File) {
  const extension = fileExtension(file);
  const hasAcceptedType = ACCEPTED_FILE_TYPES.includes(file.type);
  const hasAcceptedExtension = !file.type && ACCEPTED_FILE_EXTENSIONS.includes(extension);

  return (hasAcceptedType || hasAcceptedExtension) && file.size < MAX_FILE_SIZE;
}

/** Formats an attachment size using the same unit shown by the picker. */
export function formatFileSize(file: File) {
  if (file.size < 1024) return \`\${byteFormatter.format(file.size)} B\`;
  if (file.size < 1024 * 1024) return \`\${kibibyteFormatter.format(file.size / 1024)} KiB\`;

  return \`\${mebibyteFormatter.format(file.size / (1024 * 1024))} MiB\`;
}
`},{path:`index.tsx`,language:`tsx`,source:`export { ProjectInquiryForm } from './components/project-inquiry-form';
`}]},children:(0,h.jsx)(i,{of:f,inline:!0})})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=t(),n(),c(),o(),s(),u()})))()}g();export{m as default};