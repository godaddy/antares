'use client';

import { useCallback, useId } from 'react';
import { Button, Detail, FileTrigger, Flex, Icon, Text } from '@godaddy/antares';
import { FilePreview } from '../file-preview/index.tsx';
import styles from './index.module.css';

/** MIME types accepted by the project inquiry attachment picker. */
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

/** Returns the stable identity used to deduplicate and remove an attachment. */
export function fileKey(file: File) {
  return JSON.stringify([file.name, file.size, file.type, file.lastModified]);
}

const fileSizeFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

interface AttachmentRowProps {
  /** Attachment represented by the row. */
  file: File;

  /** Removes the represented attachment from the form. */
  onRemove: (file: File) => void;
}

/** Renders a selected attachment with its preview, size, and remove action. */
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
        <Detail size="sm">{fileSizeFormatter.format(file.size / (1024 * 1024))} MiB</Detail>
      </Flex>
      <Button type="button" variant="minimal" size="sm" aria-label={`Remove ${file.name}`} onPress={handleRemove}>
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
          aria-describedby={`${sizeHintId} ${formatHintId}${error ? ` ${errorId}` : ''}`}
          className={styles.pickerButton}
        >
          <Flex direction="column" alignItems="center" gap="xs">
            <Flex alignItems="center" gap="xs">
              <Icon icon="add" aria-hidden="true" />
              <Text as="strong">Add files</Text>
              <Text>or drag them here.</Text>
            </Flex>
            <Detail id={sizeHintId} align="center" size="sm">
              The file must be less than 256 MiB
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
