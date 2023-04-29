import React from "react";
import axios from "axios";


const FileUpload = ({files,setFiles}) =>{
    
  const onChange = async (event) => {
    
    files = event.target.files[0];

    // const result = await ipfs.add(file);
    // console.log(result);

    // setCid(result.cid.toString());
  }
    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
      };
      
    return (
        <>
        <button type="file" className="file-input" onClick={handleClick} >File</button><input type="file" ref={hiddenFileInput} onChange={onChange} style={{display: 'none'}} />
        </>
    )
}


export default FileUpload;