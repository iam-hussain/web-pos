interface Message {
  [key: string]: string;
}

export const message: Message = {
  MOBILE_DUPLICATE: "Mobile number already exists try logging in",
  EMAIL_DUPLICATE: "Email ID already exists try logging in",
  EMAIL_UNREGISTER: "Email ID is not registered, try to register!",
  INVALID_PASSWORD: "Password is incorrect",
  INVALID_ENTRY: "Invalid data",
};

type MessageKeys = keyof typeof message;
type MessageValues = typeof message[MessageKeys];

export function getMessage(key: MessageKeys): MessageValues {
  return message[key] ?? message["INVALID_ENTRY"];
}
