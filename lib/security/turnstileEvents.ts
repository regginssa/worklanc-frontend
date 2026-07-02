type TurnstileRequiredListener = () => void;

let listener: TurnstileRequiredListener | null = null;

export const registerTurnstileRequiredListener = (
  callback: TurnstileRequiredListener,
) => {
  listener = callback;
};

export const notifyTurnstileRequired = () => {
  listener?.();
};
