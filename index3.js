// const { Telegraf, Markup } = require('telegraf')
// require('dotenv').config();





// const shippingOptions = [
//   {
//     id: 'unicorn',
//     title: 'Unicorn express',
//     prices: [{ label: 'Unicorn', amount: 2000 }]
//   },
//   {
//     id: 'slowpoke',
//     title: 'Slowpoke mail',
//     prices: [{ label: 'Slowpoke', amount: 100 }]
//   }
// ]

// const replyOptions = Markup.inlineKeyboard([
//   Markup.button.pay('💸 Buy'),
//   Markup.button.url('❤️', 'http://telegraf.js.org')
// ])

// const bot = new Telegraf(process.env.BOT_TOKEN)
// bot.start((ctx) => ctx.reply("invoice"))
// bot.command('buy', (ctx) => ctx.replyWithInvoice("invoice", replyOptions))
// bot.on('shipping_query', (ctx) => ctx.answerShippingQuery(true, shippingOptions, undefined))
// bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true))
// bot.on('successful_payment', () => console.log('Woohoo'))
// bot.launch()

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'))
// process.once('SIGTERM', () => bot.stop('SIGTERM'))
