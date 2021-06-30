import './VideoLink.scss'
import React, { useEffect, useState } from 'react'
import Player from './Player'
import Notes from './Notes'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { noteTogetherContract, web3 } from '../../config'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
})

function VideoLink() {
  const { videoId } = useParams()
  const videoRef = useRef(null)
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(true)

  // Time being just assume video links are being used
  useEffect(() => {
    async function getUrlInfo() {
      if (!!videoId) {
        const videoUrl = await ipfs.get(videoId)
        setUrl(videoUrl[0]?.content?.toString())

        const userNameData = await noteTogetherContract.methods
          .getUsername()
          .call()
        setUserName(userNameData)

        const videoData = await noteTogetherContract.methods
          .getVideoData(videoId)
          .call()

        console.log(videoData)

        setTitle(videoData?.title)
        setLoading(false)
      }
    }

    getUrlInfo()
  }, [videoId])

  return (
    <>
      {!loading && (
        <div className="video-container">
          <CCard style={{ flexGrow: '1' }}>
            <CCardBody>
              <div className="aspect-ratio-box">
                <div className="aspect-ratio-box-inside">
                  <Player
                    name={title}
                    url={url}
                    creator="Link Creator"
                    videoRef={videoRef}
                  />
                </div>
              </div>
            </CCardBody>
          </CCard>

          <CCard className="video-notes">
            <CCardBody>
              <Notes
                videoRef={videoRef}
                userName={userName}
                videoId={videoId}
              />
            </CCardBody>
          </CCard>
        </div>
      )}

      {loading && (
        <div>
          <CCard>
            <CCardHeader>Loading...</CCardHeader>
          </CCard>
        </div>
      )}
    </>
  )
}

export default VideoLink
