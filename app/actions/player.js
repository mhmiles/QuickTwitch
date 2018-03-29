import process from 'child_process'
import invalidateChannels from './channels'
import { remote }  from 'electron'
import os from 'os'

export const FOCUS_PLAYER = 'FOCUS_PLAYER'
export function focusPlayer(pid) {
  console.log(os.platform());
  if (os.platform() === 'darwin') {
    process.exec('pgrep -P '+pid, (error, stdout, stderr) => {
      let playerPid = stdout.replace(/(\r\n|\n|\r)/gm,"");
      let moveToFrontScript = 'osascript <<\'END\' \ntell application "System Events" \nset frontmost of the first process whose unix id is '+playerPid+' to true \nend tell \nEND'

      process.exec(moveToFrontScript, (error, stdout, stderr) => {
      })
    })
  }

  return {
    type: FOCUS_PLAYER,
    pid: pid
  }
}

export const OPEN_PLAYER = 'OPEN_PLAYER'
export function openPlayer(token, name) {
  return (dispatch) => {
    dispatch({
      type: OPEN_PLAYER,
      name: name
    })

    if (token === null) {
      console.log('Can\'t launch without Twitch auth')
      // remote.dialog.showErrorBox("Steam Error", "Please log in to launch stream")
      remote.dialog.showMessageBox(remote.getCurrentWindow(), {
        type: "warning",
         buttons: ["OK"],
         title: "Stream Error",
         message: "Please log in to launch stream"
       })

      return
    }

    var parameters = [
      '--twitch-oauth-token',
      token,
      'twitch.tv/'+name,
      'best'
    ]
    var livestreamer = os.platform() =='win32' ?
      process.spawn('livestreamer', parameters) :
      process.spawn('./livestreamer', parameters, {cwd: '/usr/local/bin/'});

    livestreamer.stdout.on('data', (data) => {
      console.log(String.fromCharCode.apply(this, data))
    })

    dispatch(connectPlayer(name, livestreamer.pid))

    livestreamer.on('close', code => {
      if (code !== 0) {
        console.log(`ps process exited with code ${code}`);
        dispatch(invalidateChannels)
      }

      dispatch(closePlayer(name))
    });
  }
}

export const CONNECT_PLAYER = 'CONNECT_PLAYER'
function connectPlayer(name, pid) {
  return {
    type: CONNECT_PLAYER,
    name: name,
    pid: pid
  }
}

export const CLOSE_PLAYER = 'CLOSE_PLAYER'
function closePlayer(name) {
  return {
    type: CLOSE_PLAYER,
    name: name
  }
}
