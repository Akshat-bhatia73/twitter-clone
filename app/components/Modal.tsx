import React, { useCallback } from "react";
import { RiCloseLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { IconType } from "react-icons";
interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose?: () => void;
  onSubmit: () => void;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  view: "login" | "register" | "onboarding";
  isLoading: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  body,
  footer,
  actionLabel,
  disabled,
  title,
  view,
  isLoading,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) return;
    onClose && onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) return null;
  return (
    <>
      <div
        className="
        flex items-center justify-center
        overflow-x-hidden overflow-y-auto
        fixed inset-0
        z-50
        outline-none
        bg-neutral-700 bg-opacity-60 backdrop-blur-sm
    "
      >
        <div
          className="
            relative
            w-full
            xs:w-5/6
            sm:w-3/6
            lg:w-2/6
            lg:max-w-3xl
            h-full
            xs:h-auto
            mx-auto
        "
        >
          {/* Modal Content */}
          <div
            className="
                relative
                flex flex-col
                bg-neutral-800
                h-full lg:h-auto
                rounded-lg shadow-md shadow-neutral-800/70
                py-4
            "
          >
            {/* Header */}
            <div
              className="
                    flex items-center justify-between
                    px-8 py-2
                    rounded-t
                "
            >
              <h3 className="text-xl font-semibold text-neutral-100 cursor-default">
                {title}
              </h3>
              {onClose ? (
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="
                hover:bg-neutral-700
                p-2
                rounded-full
                transition
                "
                >
                  <RiCloseLine size={25} />
                </button>
              ) : null}
            </div>
            {/* Body */}
            <div
              className="
                px-8 py-2
            "
            >
              {body}
            </div>
            {/* Footer */}
            <div
              className={twMerge(
                `
                flex flex-col gap-2
                px-8 py-2
            `,
                `${isLoading ? "hidden" : ""}`
              )}
            >
              <Button
                onClick={handleSubmit}
                disabled={disabled}
                className="
                    text-neutral-900
                    bg-green-600
                    hover:bg-green-500
                    font-bold
                    text-lg
                    rounded-lg
                "
              >
                {actionLabel}
              </Button>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
