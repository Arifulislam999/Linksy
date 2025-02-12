import { X, Copy } from "lucide-react";
import { useRef, useState } from "react";

const ShareButton = ({ url, setShare }) => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  // Copy URL to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="relative bg-gray-800 text-white w-[90%] sm:w-[400px] p-6 rounded-xl shadow-lg transform transition-all duration-300 scale-95">
        {/* Close Button (Top Right) */}
        <button
          onClick={() => setShare(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <h2 className="text-xl font-semibold text-center">Share this Link</h2>
        <p className="text-sm text-gray-400 text-center mt-2">
          Copy and share this URL.
        </p>

        {/* URL Input Field */}
        <div className="relative mt-4">
          <input
            ref={inputRef}
            type="text"
            value={url}
            readOnly
            className="w-full p-2.5 pr-9 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCopy}
            className="absolute right-2 top-1/2 transform -translate-y-1/2  text-gray-400 hover:text-white"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>

        {/* Copy Confirmation */}
        {copied && (
          <p className="text-green-400 text-sm mt-2 text-center">
            URL copied to clipboard!
          </p>
        )}

        {/* Close Button */}
        <button
          onClick={() => setShare(false)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-lg text-white font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default ShareButton;
