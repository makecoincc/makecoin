import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
    Divider,
    Button
} from "@heroui/react";
import { forwardRef, useImperativeHandle } from "react";
import { KeyValuePair } from "../key-value-editor";
import CloseTokenAccount from "./close-token-account";

interface ConfirmProps {
    infos: KeyValuePair[];
    confirmText?: string;
    onConfirm?: () => void;
}

export type ConfirmRef = {
    onOpen: () => void;
};


const Confirm = forwardRef<ConfirmRef, ConfirmProps>((props, ref) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useImperativeHandle(ref, () => ({
        onOpen
    }));


    return (
        <Modal isOpen={isOpen} shouldBlockScroll={false} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <ModalBody>
                        <ModalHeader className="flex-col items-center gap-1 px-0 text-center">
                            <h1 className="text-xl">Confirm</h1>
                            <p className="text-small text-default-500 font-normal">
                                Once confirmed, the token will be created.
                            </p>
                        </ModalHeader>
                        <form
                            className="flex w-full flex-col gap-2"
                            onSubmit={(e) => {
                                e.preventDefault();
                                props.onConfirm?.();
                                onClose();
                            }}
                        >
                            {props.infos.map((info) => (
                                <div key={info.key}>
                                    <div  className="px-3 py-1 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <p className="text-small text-default-500">{info.key}</p>
                                        </div>
                                        <p className="text-small text-default-400">{info.value}</p>
                                    </div>
                                    <Divider className="my-2" />
                                </div>
                            ))}
                            <div className="flex w-full items-center justify-center gap-6 pb-4">
                                <Button color="default" type="button" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" type="submit">
                                    {props.confirmText || "Confirm"}
                                </Button>
                            </div>
                        </form>
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    )
})

export default Confirm;

Confirm.displayName = 'Confirm';