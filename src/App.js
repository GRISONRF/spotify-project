import { useEffect, useState } from "react";

function App() {

  var client_id = 'ac4922d6a3274eaf9b95062770834418';
  var redirect_uri = 'http://localhost:3000';

  var scope = 'user-read-private user-read-email';

  var url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

  let access_token = null
  if(window.location.hash) {
    // Fragment exists
    const parsedHash = new URLSearchParams(
      window.location.hash.substring(1) // skip the first char (#)
    );
    access_token = parsedHash.get('access_token')
  }

  useEffect(() => {
    if (access_token){
      fetch('https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${access_token}`,
        },
      }).then((response) => response.json()).then((json) => {
        console.log(json);
      });
    }  
  }, [access_token])

  if (!access_token){
    return (
      <>
      <div>HELLO</div>
      <a href={url}>login</a>
      {/* <div>{access_token}</div> */}
      </>
    )
  }

  // GET THE DATA TO DISPLAY ON PAGE


  return (
    <>
    <div>YOU ARE LOGGED IN</div>
    <input 
      type="text"/>
    </>
  )

}

export default App;

// ac4922d6a3274eaf9b95062770834418 ID
// 4fd4be070cd24786af1d6297507c16c8 SECRET
// access_token=BQCrUY6yfankyG0hoI3ZMqaO29-o3N-SEIiFVLYxwJohmtdIduBCl-PkXXJVRHMpm8U4J85WIsJhyD615ax8v4mXGeBGANyhmtOup_DIEKbzuZdP9CVjINzkwdMnFCQcHYvv2WzgAVpXIXHWZN0sKO_2kG9W4U6BZHCxMsijVBao1C9SVcp3D3qV8CQSvXTceFMnCmxx0pXyp8OykiI

//&token_type=Bearer&expires_in=3600