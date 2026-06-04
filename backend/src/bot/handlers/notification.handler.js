import { pool } from "../../config/db.js";
import { findAllUserChatId, findAllUsers } from "../../repositories/user.repository.js";
import { bot } from "../bot.js";

const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

export const notifyHandler = async (ctx) => {
  const chatId = String(ctx.from.id);

  if (chatId !== ADMIN_CHAT_ID) {
    return ctx.reply("❌ Bu buyruq faqat admin uchun.");
  }

  const message = ctx.message.text.replace("/notify ", "").trim();

  if (!message) {
    return ctx.reply("Xabar yozing: /notify Salom hammaga!");
  }

  const result = await findAllUserChatId()

  const args = message.split(" ");
  const targetChatId = args[0];

  if (/^\d+$/.test(targetChatId)) {
    const specificMessage = args.slice(1).join(" ").trim(); 
    try {
      await bot.telegram.sendMessage(targetChatId, `📢 ${specificMessage}`);
      return ctx.reply(`Xabar muvaffaqiyatli maxsus ID ga yuborildi: ${targetChatId}`);
    } catch (err) {
      console.log(`Xabar yuborilmadi foydalanuvchiga: ${targetChatId}`);
      return ctx.reply("Foydalanuvchiga xabar yuborishda xatolik yuz berdi (balki u botni bloklagandir).");
    }
  }

  let sent = 0;
  for (const row of result) {
    try {
      await bot.telegram.sendMessage(row.telegramChatId, `📢 ${message}`);
      sent++;
    } catch (err) {
      console.log(`Xabar yuborilmadi: ${row.telegram_chat_id}`);
    }
  }

  ctx.reply(`✅ Xabar ${sent} ta foydalanuvchiga yuborildi.`);
};