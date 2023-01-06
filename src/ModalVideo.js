import React, { useEffect, useState } from 'react'
import Modal from '@material-ui/core/Modal'
import YouTube from 'react-youtube';
import { Backdrop } from '@material-ui/core';
import Fade from '@material-ui/core/Fade'
import './ModalVideo.css'
import WarningIcon from '@material-ui/icons/Warning';

function ModalVideo({ videoTitle, visible, ytMovieId, setParentOpenModal }) {
    const [open, setOpen] = useState(visible);

    useEffect(() => {
        setOpen(visible);
        // if (visible)
        //     alert('Hie')
        // else
        //     alert('invisible.......')
        // console.log('The state>', open)
    }, [visible])

    console.log('The modal state:>>>', open)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setParentOpenModal(false);
        // alert('Closed')
    };

    const opts = {
        height: '270',
        width: '480',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    const notFoundMessage = (
        <div className='modalVideo__notFoundMessage'>
            <WarningIcon className='modalVideo__warningIcon' />
            <p className=''>
                Trailer not found or it is not available yet. Please try another movie.
            </p>
        </div>);

    return (
        <div className='modalVideo'>
            <Modal
                // aria-labeledby='transition-modal-title'
                // aria-describedby='transition-modal-description'
                className='modalVideo__modal'
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 1000,
                }}
            >
                <Fade in={open}>
                    <div className='modalVideo__fade'>
                        {/* <h2 >Modal Example</h2> */}
                        {/* <p>This is an example of the modal</p> */}
                        {/* Show the trailer only and only if the YouTube id is not null */}
                        {ytMovieId ? (
                            <YouTube
                                className='modalVideo__fade__youTube'
                                videoId={ytMovieId}
                                id={'id'}
                                opts={opts}
                            />
                        ) : (
                            notFoundMessage
                        )}

                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default ModalVideo
