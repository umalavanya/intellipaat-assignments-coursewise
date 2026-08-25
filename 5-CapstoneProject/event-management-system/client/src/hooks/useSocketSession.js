import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

import { SOCKET_SERVER_URL } from '../constants/socket';

export default function useSocketSession() {
  const socketRef = useRef(null);

  const [showMultiLoginModal, setShowMultiLoginModal] =
    useState(false);

  const [forceLogoutMessage, setForceLogoutMessage] =
    useState('');

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socketRef.current = socket;

    socket.on('multiple_login_detected', () => {
      console.log('Multiple login detected');
      setShowMultiLoginModal(true);
    });

    socket.on('force_logout', (data) => {
      console.log('Force logout received');

      setForceLogoutMessage(
        data?.message ||
          'You were logged out because another session started.'
      );

      setShowMultiLoginModal(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const connectUser = (email) => {
    socketRef.current?.emit('user_connected', {
      email
    });
  };

  const logoutUser = () => {
    socketRef.current?.emit('user_logout');

    // Close modal immediately
    setShowMultiLoginModal(false);
  };

  const continueHere = (email) => {
    socketRef.current?.emit('confirm_continue_here', {
      email
    });

    // Close modal immediately
    setShowMultiLoginModal(false);
  };

  return {
    showMultiLoginModal,
    forceLogoutMessage,
    connectUser,
    logoutUser,
    continueHere
  };
}