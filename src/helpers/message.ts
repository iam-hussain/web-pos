interface Message {
  [key: string]: string;
}

export const message: Message = {
  mobile_duplicate: "Mobile number already exists try logging in",
  email_duplicate: "Email ID already exists try logging in",
  invalid_entry: "Invalid data",
};

type MessageKeys = keyof typeof message;
type MessageValues = typeof message[MessageKeys];

export function getMessage(key: MessageKeys): MessageValues {
  return message[key] ?? message["invalid_entry"];
}
