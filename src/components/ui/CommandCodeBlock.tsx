import CopyButton from './CopyButton';

interface CommandCodeBlockProps {
  code: string;
  label?: string;
  /** Slug of the command/page this code lives on, sent with the copy event */
  commandSlug?: string;
}

export default function CommandCodeBlock({ code, label, commandSlug }: CommandCodeBlockProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 my-4 border border-gray-800">
      {label && (
        <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">{label}</div>
      )}
      <div className="flex items-start justify-between gap-3">
        <pre className="text-green-400 text-sm overflow-x-auto flex-1 whitespace-pre-wrap break-all font-mono">
          {code}
        </pre>
        <CopyButton
          text={code}
          trackingEvent="copy_command"
          trackingParams={{ command: commandSlug }}
        />
      </div>
    </div>
  );
}
