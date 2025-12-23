import React, { useEffect, useId, useMemo, useState } from 'react';

interface MermaidDiagramProps {
  code: string;
}

export function MermaidDiagram({ code }: MermaidDiagramProps) {
  const id = useId();
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const normalized = useMemo(() => code.trim(), [code]);
  const safeId = useMemo(
    function computeSafeId() {
      // React's useId() includes ":" which is not a valid CSS selector fragment for Mermaid's internal querySelector.
      // Make it safe + stable across renders.
      const cleaned = id.replace(/[^a-zA-Z0-9_-]/g, '_');
      return `mermaid_${cleaned}`;
    },
    [id]
  );

  useEffect(
    function renderMermaid() {
      let cancelled = false;

      async function render() {
        try {
          // Mermaid is browser-oriented. Import it lazily so it only runs in docs rendering.
          const mermaid = (await import('mermaid')).default;

          mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'strict'
          });

          const { svg } = await mermaid.render(safeId, normalized);
          if (!cancelled) setSvg(svg);
        } catch (e) {
          if (!cancelled) setError(e instanceof Error ? e.message : String(e));
        }
      }

      setSvg(null);
      setError(null);
      if (normalized) void render();

      return function cleanup() {
        cancelled = true;
      };
    },
    [safeId, normalized]
  );

  if (error) {
    return <pre style={{ whiteSpace: 'pre-wrap' }}>{`Mermaid render error: ${error}\n\n${normalized}`}</pre>;
  }

  if (!svg) return <div>Rendering diagram…</div>;

  return (
    <div
      style={{ overflowX: 'auto' }}
      // Mermaid returns sanitized SVG strings when securityLevel='strict'
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
