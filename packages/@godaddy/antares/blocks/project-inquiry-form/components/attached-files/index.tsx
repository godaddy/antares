'use client';

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
        <Button type="button" variant="minimal" size="sm" aria-label={`Remove ${file.name}`} onPress={handleRemove}>
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
