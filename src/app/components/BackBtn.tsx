import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

function BackBtn({Route}:any) {
    const Router = useRouter();
  return (
    <>
      <div style={{ display: "flex", paddingBottom: 15 }}>
        <ArrowBackIcon
          style={{ cursor: "pointer"}}
          onClick={() => {
            Router.back();
          }}
        />
        <span style={{ paddingLeft: 5}}>Back</span>
      </div>
    </>
  )
}

export default BackBtn