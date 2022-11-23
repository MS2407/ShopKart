import React from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {Link} from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className='pageNotFound'>
      <ReportProblemIcon/>
      <h1>Page Not Found</h1>
      <Link to="/">Home</Link>
    </div>
  )
}

export default NotFound