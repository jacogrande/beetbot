import { awardPoint } from "@/util/awardPoint";
import { createUser } from "@/util/createUser";
import { formatAwardMessage } from "@/util/formarAwardMessage";
import { getUser } from "@/util/getUser";
import { FirestoreUser } from "@/util/types";
import { Message } from "discord.js";

export const handleMessage = async (message: Message) => {
  const hasAttachment = Boolean(message.attachments.first());
  if (!hasAttachment) return;
  const targetUser = message.author;
  let { user, ref } = await getUser(targetUser.id);
  if (!user) {
    user = await createUser(targetUser);
  }
  const pointAwarded = await awardPoint(ref, user);
  if (!pointAwarded) return;
  const newUserData = (await ref.get()).data();
  if (!newUserData) return;
  await message.reply(
    formatAwardMessage(targetUser.id, newUserData as FirestoreUser),
  );
};
