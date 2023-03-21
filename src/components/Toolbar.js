import React from "react";
import { Quill } from "react-quill";
import './styles/styles.css'

const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

const Size = Quill.import('attributors/style/size');
Size.whitelist = ['10px', '14.5px', '16px', '18.5px', '24px', '32px'];
Quill.register(Size, true);

const Font = Quill.import('attributors/class/font')

Font.whitelist = [
  'arial',
  'calibri',
  'comic-sans-ms',
  'courier-new',
  'georgia',
  'helvetica',
  'lucida',
  'sans-serif',
  'times-new-roman'
];
Quill.register(Font, true);

export const modules = {

  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  },
};

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "direction",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "formula",
  "color",
  "code-block"
];

export const QuillToolbar = () => (
  <div id="toolbar" className="flex sticky top-0 z-50 !justify-center mx-auto bg-[#FFFF]">
    <span className="ql-formats">
      <select className="ql-font" defaultValue='helvetica'>
        <option value='arial'>Arial</option>
        <option value='calibri'>Calibri</option>
        <option value='comic-sans-ms'>Comic Sans MS</option>
        <option value='courier-new'>Courier New</option>
        <option value='georgia'>Georgia</option>
        <option value='helvetica'>Helvetica</option>
        <option value='lucida'>Lucida</option>
        <option value='sans-serif'>Sans Serif</option>
        <option value='times-new-roman'>Times New Roman</option>
      </select>
      <select className="ql-size" defaultValue="10px">
        <option value="10px">10</option>
        <option value="14.5px">11</option>
        <option value="16px">12</option>
        <option value="18.5px">14</option>
        <option value="24px">18</option>
        <option value="32px">24</option>
      </select>
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading</option>
        <option value="2">Subheading</option>
        <option value="3">Normal</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>
    <span className="ql-formats">
      <button className="ql-script" value="super" />
      <button className="ql-script" value="sub" />
      <button className="ql-blockquote" />
      <button className="ql-direction" value='rtl' />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span>
    <span className="ql-formats">
      <button className="ql-formula" />
      <button className="ql-code-block" />
      <button className="ql-clean" />
    </span>
    <span className="ql-formats">
      <button className="ql-undo">
        <CustomUndo />
      </button>
      <button className="ql-redo">
        <CustomRedo />
      </button>
    </span>
  </div>
);

export default QuillToolbar;