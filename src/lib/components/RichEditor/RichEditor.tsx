"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import HardBreak from "@tiptap/extension-hard-break";
import { Extension } from "@tiptap/core";
import { HexColorPicker } from "react-colorful";
import { useEffect, useState, useRef } from "react";
import { TextStyle } from "@tiptap/extension-text-style";
import Paragraph from "@tiptap/extension-paragraph";

interface RichEditorProps {
  label?: string;
  value: string;
  onChange: (content: string) => void;
}

/* =========================
   FONT SIZE EXTENSION
========================= */
const FontSize = Extension.create({
  name: "fontSize",

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
});

/* =========================
   ENTER = <br>
========================= */
const CustomEnter = Extension.create({
  name: "customEnter",
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.setHardBreak(),
    };
  },
});

export default function RichEditor({
  label,
  value,
  onChange,
}: RichEditorProps) {
  const [color, setColor] = useState("#000000");
  const [fontSize, setFontSize] = useState("16");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: false,
      }),
      Paragraph,
      HardBreak.configure({
        keepMarks: true,
      }),
      CustomEnter,
      Underline,
      Link.configure({ openOnClick: false }),
      TextStyle,
      Color,
      FontSize,
    ],

    content: value ?? "",
    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[200px] w-full rounded-md border p-4 focus:outline-none prose max-w-none",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  /* Sync external value (important for edit forms) */
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorPicker]);

  if (!editor) return null;

  // Helper to prevent editor blur on button clicks
  const handleButtonMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Font size options
  const fontSizes = ["8", "10", "12", "14", "16", "18", "20", "24", "28", "32", "36", "48", "64", "72", "96"];

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 border p-3 rounded-md bg-gray-50 items-start">
        {/* Bold */}
        <button
          type="button"
          onMouseDown={handleButtonMouseDown}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 border rounded font-bold ${
            editor.isActive("bold") ? "bg-gray-300" : ""
          }`}
        >
          B
        </button>

        {/* Italic */}
        <button
          type="button"
          onMouseDown={handleButtonMouseDown}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 border rounded italic ${
            editor.isActive("italic") ? "bg-gray-300" : ""
          }`}
        >
          I
        </button>

        {/* Underline */}
        <button
          type="button"
          onMouseDown={handleButtonMouseDown}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-3 py-1 border rounded underline ${
            editor.isActive("underline") ? "bg-gray-300" : ""
          }`}
        >
          U
        </button>

        {/* Bullet List */}
        <button
          type="button"
          onMouseDown={handleButtonMouseDown}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 border rounded ${
            editor.isActive("bulletList") ? "bg-gray-300" : ""
          }`}
        >
          • List
        </button>

        {/* Font Size Dropdown */}
        <div className="flex items-center gap-2">
          <select
            value={fontSize}
            onChange={(e) => {
              const size = e.target.value;
              setFontSize(size);
              editor
                .chain()
                .focus()
                .setMark("textStyle", { fontSize: `${size}px` })
                .run();
            }}
            className="border px-2 py-1 rounded"
          >
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
        </div>

        {/* Color Picker Toggle Button */}
        <div className="relative" ref={colorPickerRef}>
          <button
            type="button"
            onMouseDown={handleButtonMouseDown}
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="px-3 py-1 border rounded flex items-center gap-2"
          >
            <div
              className="w-5 h-5 border rounded"
              style={{ backgroundColor: color }}
            />
            Color
          </button>

          {/* HEX Color Picker (shown on click) */}
          {showColorPicker && (
            <div className="absolute top-full mt-2 z-10 bg-white p-2 rounded shadow-lg border">
              <HexColorPicker
                color={color}
                onChange={(c) => {
                  setColor(c);
                  editor.chain().focus().setColor(c).run();
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}