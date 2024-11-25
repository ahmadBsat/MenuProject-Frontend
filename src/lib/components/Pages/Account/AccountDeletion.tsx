"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { API_USER } from "@/lib/services/user/user_service";
import { LanguageParams } from "@/lib/types/page";
import {
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from "@nextui-org/react";
import { useState } from "react";

const AccountDeletion = ({ lang }: LanguageParams) => {
  const { logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await API_USER.deleteUser();

      logout(lang);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div  className="flex flex-col gap-1 w-full">
      <div className="flex sm:flex-row flex-col justify-between gap-4 w-full sm:items-center pt-8 pb-1 rounded-2xl max-w-2xl">
        <div className="flex flex-col gap-1 font-semibold">
          <div>Logout</div>
          <div className="text-sm text-red-600">Logout from your account.</div>
        </div>

        <Button isLoading={loading} color="danger" onClick={() => logout(lang)}>
          Logout
        </Button>
      </div>

      <div className="flex sm:flex-row flex-col justify-between gap-4 w-full sm:items-center py-8 rounded-2xl max-w-2xl">
        <div className="flex flex-col gap-1 font-semibold">
          <div>Delete Account</div>
          <div className="text-sm text-red-600">
            Once you delete you&apos;re account, there is no going back!
          </div>
        </div>

        <Button isLoading={loading} color="danger" onClick={onOpen}>
          Delete
        </Button>

        <Modal
          backdrop={"blur"}
          isOpen={isOpen}
          onClose={onClose}
          isDismissable={!loading}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete Account
                </ModalHeader>
                <ModalBody>
                  <p>
                    Are you sure you want to delete this account? This action is
                    irreversible!
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="danger"
                    onClick={handleSubmit}
                    isLoading={loading}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default AccountDeletion;
