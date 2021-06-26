import React from 'react';
import './App.css';

function RichTextEditor() {

    const handleClick = (e, sCmd, sValue) => {
        //e.preventDefault();
        console.log(e.target.value);
        let oDoc = document.getElementById("editorAreaId");
        document.execCommand(sCmd, false, sValue);
        oDoc.focus();
    };

    const setDocMode = (bToSource) => {
        let oContent;
        let oDoc = document.getElementById("editorAreaId");
        if (bToSource) {
          oContent = document.createTextNode(oDoc.innerHTML);
          oDoc.innerHTML = "";
          console.log("HTML OUTPUT IS ----", oContent);
          var oPre = document.createElement("pre");
          oDoc.contentEditable = false;
          oPre.id = "sourceText";
          oPre.contentEditable = true;
          oPre.appendChild(oContent);
          oDoc.appendChild(oPre);
          document.execCommand("defaultParagraphSeparator", false, "div");
        } else {
          if (document.all) {
            oDoc.innerHTML = oDoc.innerText;
          } else {
            oContent = document.createRange();
            oContent.selectNodeContents(oDoc.firstChild);
            oDoc.innerHTML = oContent.toString();
          }
          oDoc.contentEditable = true;
        }
        oDoc.focus();
      }

    return (
        <React.Fragment>
            <div className="toolBar">
                <button onClick={(e) => handleClick(e, 'bold')}>Bold</button>
                <button onClick={(e) => handleClick(e, 'italic')}>Italic</button>
                <button onClick={(e) => handleClick(e, 'underline')}>Underline</button>
                <select onChange={(e) => handleClick(e, 'fontSize', e.target.value)}>
                    <option >Font Size (px)</option>
                    <option value="1">10 px</option>
                    <option value="2">25 px</option>
                    <option value="3">20 px</option>
                    <option value="4">25 px</option>
                    <option value="5">30 px</option>
                    <option value="6">35 px</option>
                    <option value="7">Maximum</option>
                </select>
                <label for="colorPick" style={{fontSize: "13px"}}>Font Color :</label>
                <input name="colorPick" type="color" placeholder="Color Hex Code" onChange={(e) => handleClick(e, 'foreColor', e.target.value)}></input>
                <button onClick={(e) => handleClick(e, 'insertUnorderedList')}>List</button>
            </div>
            <div className="editorArea" id="editorAreaId" contentEditable="true">
            </div>
            <div className="buttonDiv">
            <button onClick={(e) => setDocMode(e)}>HTML Output</button>
            </div>            
        </React.Fragment>
    )
}

export default RichTextEditor
