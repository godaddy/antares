import { useCallback, useState } from 'react';
import { Button, Flex, Heading, Icon, Text } from '@godaddy/antares';
import type { FileTreeNode } from './types.ts';
import styles from './runtime.module.css';

/** Props for the {@link BlockFileTree} component. */
export interface BlockFileTreeProps {
  /** Nested files and folders to render. */
  tree: readonly FileTreeNode[];

  /** Path of the currently selected file. */
  activePath?: string;

  /** Selects a file in the source panel. */
  onFileSelect(path: string): void;
}

/**
 * Renders the navigable file tree for a block's curated source files.
 *
 * @param props - Tree data and the callback used to select a source file.
 */
export function BlockFileTree({ tree, activePath, onFileSelect }: BlockFileTreeProps) {
  return (
    <Flex
      as="nav"
      direction="column"
      className={styles.fileTree}
      elevation="base"
      padding="md"
      aria-label="Block files"
    >
      <Heading level={2}>Files</Heading>
      {tree.map(function renderNode(node: FileTreeNode) {
        return <FileTreeNodeView key={node.path} node={node} activePath={activePath} onFileSelect={onFileSelect} />;
      })}
    </Flex>
  );
}

function FileTreeNodeView({
  node,
  activePath,
  onFileSelect
}: {
  node: FileTreeNode;
  activePath?: string;
  onFileSelect(path: string): void;
}) {
  const [expanded, setExpanded] = useState(true);
  const handleFolderPress = useCallback(function handleFolderPress() {
    setExpanded(function toggleExpanded(value: boolean) {
      return !value;
    });
  }, []);
  const handleFilePress = useCallback(
    function handleFilePress() {
      onFileSelect(node.path);
    },
    [node.path, onFileSelect]
  );

  if (node.type === 'folder') {
    return (
      <Flex direction="column">
        <Flex
          as={Button}
          variant="trigger"
          size="sm"
          flex="0 0 auto"
          alignItems="center"
          justifyContent="flex-start"
          gap="sm"
          inlinePaddingStart="sm"
          aria-expanded={expanded}
          onPress={handleFolderPress}
        >
          <Icon icon={expanded ? 'chevron-down' : 'chevron-right'} width={16} height={16} />
          <Icon icon={expanded ? 'folder-open' : 'folder'} width={16} height={16} />
          <Text maxLines={1} wrap="nowrap">
            {node.name}
          </Text>
        </Flex>
        {expanded ? (
          <Flex direction="column" inlinePaddingStart="md">
            {node.children.map(function renderChild(child: FileTreeNode) {
              return (
                <FileTreeNodeView key={child.path} node={child} activePath={activePath} onFileSelect={onFileSelect} />
              );
            })}
          </Flex>
        ) : null}
      </Flex>
    );
  }

  return (
    <Flex
      as={Button}
      variant={activePath === node.path ? 'primary' : 'trigger'}
      size="sm"
      flex="0 0 auto"
      alignItems="center"
      justifyContent="flex-start"
      gap="sm"
      inlinePaddingStart="sm"
      aria-pressed={activePath === node.path}
      onPress={handleFilePress}
    >
      <Icon icon="page" width={16} height={16} />
      <Text maxLines={1} wrap="nowrap">
        {node.name}
      </Text>
    </Flex>
  );
}
