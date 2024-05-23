import axios from 'axios';
import React, { useState } from 'react';

function Images() {
  const [file, setFile] = useState();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', file);
    axios.post('http://localhost:8080/addApply', formData)
      .then(res => {
        if(res.data.Status === "Succes") {
          console.log("sucessed");
        } else {
          console.log("failed");
        }

      } )
      .catch(err => console.log(err));
  };

  return (
    <div className='container'> 
      <input type="file" onChange={handleFile} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Images;
