import { Typography } from "@material-tailwind/react"
import React, { useState, useEffect, useRef } from 'react'
import ReactQuill from 'react-quill'
import Toolbar, { modules, formats } from "./Toolbar";
import { useText } from './utils/hooks';
import { generateText } from "../App";
import 'react-quill/dist/quill.snow.css'
import './styles/styles.css'

const timerValue = 500;
var cursorPosition, quillBounds;

const Writer = () => {
    const { text, queryText, suggestion, handleSetText, setQueryText, handleSetSuggestion } = useText("");
    const [anchorEl, setAnchorEl] = useState(null);
    const inputRef = useRef(null);
    const popoverRef = useRef(null);

    const handleQueryTextChange =(content, delta, source, editor) => {
      cursorPosition = (inputRef.current.editor.getSelection() === null ? anchorEl.left + window.innerWidth/6 : inputRef.current.editor.getSelection());
      quillBounds = inputRef.current.editor.getBounds(cursorPosition);
      handleSetSuggestion("")
      handleSetText(content)
      setQueryText(editor.getText())
      setAnchorEl(quillBounds)
    }

    const handleSetSuggestionChange = (res) => {
      handleSetSuggestion(res)
    }

    const handleClosePopover = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setAnchorEl(null);
        handleSetSuggestion("");
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClosePopover);
      return () => {
        document.removeEventListener("mousedown", handleClosePopover);
      };
    }, []);

    useEffect(() => {
      const timer = setTimeout(async () => {
        if (queryText) {
          const res = await generateText(queryText);
          handleSetSuggestionChange(res)
        }
      }, timerValue);
      return () => clearTimeout(timer)
    }, [text])

return (
  <>
  <div style={{height:40, background:'#6376f2'}}>
    </div>
    <div className="text-editor min-h-screen pb-16 bg-[#F8F9FA]">
      <Toolbar />
        <ReactQuill
          id="editor"
          theme="snow"
          className="mt-6 shadow-lg bg-white mx-auto mb-12 border"
          value={text}
          onChange={handleQueryTextChange}
          placeholder={""}
          modules={modules}
          formats={formats}
          ref={inputRef}
        />
        {Boolean(anchorEl) && suggestion !== "" && (
          <div 
          ref ={popoverRef}
          className="popper" 
          style ={{top: anchorEl.top - 1190, left:anchorEl.left + window.innerWidth/6, position:'relative'}}
          onClick={()=> {
            handleSetText(queryText + suggestion)
            handleSetSuggestion("")
          }}
          >
            <Typography><b>{suggestion}</b></Typography>
          </div>
        )}
    </div>
    </>
  )
}

export default Writer