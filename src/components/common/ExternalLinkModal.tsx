import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal } from '@mui/material';
import React from 'react';

interface ExternalLinkModalProps {
  open: boolean;
  url: string | null;
  onClose: () => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  height: '80vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
  display: 'flex',
  flexDirection: 'column',
};

const ExternalLinkModal: React.FC<ExternalLinkModalProps> = ({ open, url, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {url && (
          <iframe
            src={url}
            title="External Page"
            width="100%"
            height="100%"
            style={{ flex: 1, border: 'none', borderRadius: 8 }}
          />
        )}
      </Box>
    </Modal>
  );
};

export default ExternalLinkModal; 