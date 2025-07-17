import { createMessageTable } from "./messageModel";
import { createMessageRecipetsTable } from "./messageReceiptsModel";
import { createUserTable } from "./userModel";

export const initializeTables = async (): Promise<void> => {
  await createUserTable();
  await createMessageTable();
  await createMessageRecipetsTable();
};
