import React, { useEffect, useRef } from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { darcula } from "@uiw/codemirror-theme-darcula";

const code = "console.log('hello world!');\n\n\n";
const CodeEditor = () => {
  const editor = useRef<HTMLDivElement>(null);
  const { setContainer } = useCodeMirror({
    container: editor.current,
    extensions: [javascript({ jsx: true, typescript: true })],
    value: code,
    theme: darcula,
    height: "500px",
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);

  return (
    <div>
      <div ref={editor} />
    </div>
  );
};

export default CodeEditor;
