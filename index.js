/* eslint-disable no-return-await */
const { Telegraf, Markup} = require('telegraf');
// const session = require('telegraf/session')
require('dotenv').config();
const commands = require('./commands');
const text1 = require('./commands');
const { User, Order } = require('./db/models');

const bot = new Telegraf(process.env.BOT_TOKEN);
// bot.use(session())

bot.start(async (ctx) => {
  await ctx.reply(`Приветсвуем тебя, ${ctx.message.from.first_name}`);
  // eslint-disable-next-line max-len
  try { await User.create({ id: ctx.message.from.id, name: ctx.message.from.first_name || ctx.message.from.username }); } catch (e) {
    console.log('User already exist');
  }
});
// bot.help(async (ctx) => await ctx.reply(commands.commands));

bot.command('go', async (ctx) => {
  await ctx.replyWithHTML('<b>Чем тебе помочь?</b>', Markup.inlineKeyboard(
    [
      [Markup.button.callback('Оптовый прайс', 'btn1'), Markup.button.callback('Дропшиппинг', 'btn2')],
      [Markup.button.callback('Фото', 'btn3'), Markup.button.callback('Условия', 'btn7')],
      [Markup.button.callback('Мои заказы', 'btn4'), Markup.button.callback('Моя прибыль', 'btn5')],
      [Markup.button.callback('Создать заказ', 'btn6')],
    ],
  ));
});
bot.action('btn1', async (ctx) => await ctx.replyWithDocument({ source: './files/price.pdf' })); // ссылка на условия (текст)
bot.action('btn2', async (ctx) => await ctx.reply('ссылка на прайс')); // ссылка на прайс (файл)
bot.action('btn3', async (ctx) => await ctx.reply('https://drive.google.com/drive/folders/1cvr4fohrOEIafNs5YmfaiAoP3NVyTkgF?ths=true')); // ссылка на архив фото (файл)
bot.action('btn4', async (ctx) => await ctx.reply('Выслали файл')); // подтянуть все заказы из базы (файл)
bot.action('btn5', async (ctx) => await ctx.reply('За время работы с нами вы заработали 444 руб')); // отправить сообщение с прибылью
bot.action('btn7', async (ctx) => await ctx.reply(text1)); // отпр
bot.action('btn6', async (ctx) => {
  await ctx.reply('Выберете модель', Markup.keyboard(
    [
      ('Смерека'), ('Кремлевская зеленая'), ('Кремлевская голубая'), ('Королева'), ('Элитная'), ('Президентская'), ('Премиум литая'),
    ],
  ));
});

bot.hears(['Смерека', 'Кремлевская зеленая', 'Королева', 'Элитная', 'Кремлевская голубая', 'Президентская', 'Премиум литая'], async (ctx) => {
  console.log('45 строчка', ctx.message.text);
  try {
    const order = await Order.create({ model: ctx.message.text, user_id: ctx.message.from.id });
    console.log(order);
    await ctx.reply('Выберете размер:', Markup.keyboard(

      [
        ('150 cм'), ('180 см'), ('210 см'), ('230 см'), ('250 см'), ('300 см'),
      ],
    ));
    // if (!order.adress) {}
    bot.on('text', async (ctx, next) => {
      console.log('RORORO', ctx.botInfo);
      // const regExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
      if (ctx.message.text === '150 cм'
      || ctx.message.text === '180 см'
      || ctx.message.text === '210 см'
      || ctx.message.text === '230 см'
      || ctx.message.text === '250 см'
      || ctx.message.text === '300 см') {
        await ctx.reply('Введите телефон покупателя:');

        order.size = ctx.message.text;
        console.log('2', order);

        await order.save();
      } else {
        await ctx.reply('Введите адрес покупателя:');
        if (order.tel) {
          console.log('4', order);

          order.adress = ctx.message.text;
          await order.save();
        } else {
          order.tel = ctx.message.text;
          await order.save();
          console.log('3', order);
        }

      }
      return next()
    });
  } catch (e) {
    console.log('Order already exist');
  }
});

bot.on('callback_query', (ctx) => {
  // Explicit usage
  ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

  // Using context shortcut
  ctx.answerCbQuery();
});

bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
