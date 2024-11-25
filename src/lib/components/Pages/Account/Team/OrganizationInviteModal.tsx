"use client";

import { handleServerError } from "@/lib/api/_axios";
import { INVITATION_INITIAL } from "@/lib/constants/initials";
import { API_ORGANIZATION } from "@/lib/services/organization/organization_service";
import { ErrorResponse } from "@/lib/types/common";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

const OrganizationInviteModal = ({ isOpen, onOpenChange }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(INVITATION_INITIAL);

  const params = useParams();
  const organization = params.organization as string;

  const send_invitation = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!organization) return;

    try {
      setLoading(true);

      await API_ORGANIZATION.inviteMember(organization, data);

      toast.success("Invitation Sent");

      setData(INVITATION_INITIAL);
      onOpenChange();
    } catch (error) {
      handleServerError(error as ErrorResponse, (err_msg) => {
        toast.error(err_msg);
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      scrollBehavior="inside"
      placement={"auto"}
      onOpenChange={onOpenChange}
      isDismissable={!loading}
      className="max-h-[600px] overscroll-contain"
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={(e) => send_invitation(e)}>
            <ModalHeader className="flex flex-col gap-1">
              Invite a new user
            </ModalHeader>

            <ModalBody>
              <Input
                required
                isRequired
                type="email"
                label="User Email"
                placeholder="Email address"
                value={data.email}
                onValueChange={(v) =>
                  setData((state) => ({ email: v, skills: state.skills }))
                }
              />
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={onClose}
                isDisabled={loading}
              >
                Close
              </Button>

              <Button color="primary" type="submit" isLoading={loading}>
                Confirm
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default OrganizationInviteModal;
