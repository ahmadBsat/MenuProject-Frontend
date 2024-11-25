"use client";

import React, { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

type ModalProps = {
  title?: string;
  children: ReactNode | ReactNode[];
  isOpen: boolean;
  loading?: boolean;
  isDissmisable?: boolean;
  onOpenChange: () => void;
  handleClick?: () => void;
  show_footer?: boolean;
};

const ModalInstance = ({
  isOpen,
  onOpenChange,
  title,
  children,
  handleClick,
  loading = false,
  isDissmisable = true,
  show_footer = true,
}: ModalProps) => {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      scrollBehavior="inside"
      placement={"auto"}
      onOpenChange={onOpenChange}
      isDismissable={!loading && isDissmisable}
      className="max-h-[600px] overscroll-contain shadow-none"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>

            <ModalBody>{children}</ModalBody>

            {show_footer && (
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  isDisabled={loading}
                >
                  Close
                </Button>

                <Button
                  color="primary"
                  variant="flat"
                  isLoading={loading}
                  onClick={handleClick}
                >
                  Confirm
                </Button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalInstance;
