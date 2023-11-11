import { Modal, ModalClose, Sheet } from "@mui/joy";
import React from "react";

export default function BasicModal({ isClose, children, isResetModalOpen }: any) {
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isResetModalOpen}
        onClose={isClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          {children}
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
