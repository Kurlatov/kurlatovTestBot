const axios = require("axios");

const TelegramBot = require("node-telegram-bot-api");

const token = "1986196693:AAGJzY2DBg-6SB_2eVr05xAiyXg5c6EZkRQ"; 

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Oh hi, Mark. Anyway, how's your bootcamp life? Anyway, tap and enjoy!", {
    reply_markup: {
      inline_keyboard: keyboard,
    },
  });
});

const keyboard = [
  [
    {
      text: "Would you kindly make me laugh?", 
      callback_data: "memes",
    },
  ],
  [
    {
      text: "Would you kindly insult me?",
      callback_data: "waifus",
    },
  ],
  [
    {
      text: "Dictators with Breacking Bad qoutes -.-",
      callback_data: "presidents", 
    },
  ],
  [
    {
      text: "Would you kindly cheer me up?", 
      callback_data: "actors", 
    },
  ],
  [
    {
      text: "Exit",
      callback_data: "finish"
    }
  ]
];

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;

  const arrMemes = [
    "img/memes/goblin.jpg",
    "img/memes/panasenkov.jpeg",
    "img/memes/blacklord.jpg",
  ];

  const memes = arrMemes[Math.floor(Math.random() * 3)];
  let imgMemes = memes;

  const arrWaifus = [
    "img/waifus/aska.jpg",
    "img/waifus/kallen.jpg",
    "img/waifus/makise.jpg",
    "img/waifus/rias.jpg",
    "img/waifus/monogatari.png",
    "img/waifus/darling.png",
  ];

  const waifus = arrWaifus[Math.floor(Math.random() * 6)];
  let imgWaifus = waifus;

  const arrPresidents = [
    "img/presidents/putin.jpg",
    "img/presidents/lukashenko.jpg",
  ];

  const presidents = arrPresidents[Math.floor(Math.random() * 2)];
  let imgPresidents = presidents;

  const arrActors = [
    "img/actors/cavill.jpg",
    "img/actors/armas.jpg",
    "img/actors/emma.jpg",
    "img/actors/fassbender.jpg"
  ];

  const actors = arrActors[Math.floor(Math.random() * 3)];
  let imgActors = actors;

  const finish = "img/finish/youShallNotExit.jpeg";

  if (query.data === "memes") {
    url1 = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single";
    async function status() {
      const url = url1;
      let response = await axios.get(url);
      return response.data;
    };
  
    const { joke } = await status();

    img = imgMemes;
    message = bot.sendMessage(
      chatId,
      joke
    );
  };

  if (query.data === "waifus") {
    url2 = "https://evilinsult.com/generate_insult.php?lang=en&type=json";
    async function status() {
      const url = url2;
      let response = await axios.get(url);
      return response.data;
    };
    
    const { insult } = await status();

    img = imgWaifus;
    message = bot.sendMessage(
      chatId,
      insult
    );
  };

  if (query.data === "presidents") {
    url3 = "https://breaking-bad-quotes.herokuapp.com/v1/quotes";
    async function status() {
      const url = url3;
      let response = await axios.get(url);
      return response.data;
    };

    const [{ quote }] = await status();

    img = imgPresidents;
    message = bot.sendMessage(
      chatId,
      quote
    );
  };

  if (query.data === "actors") {
    url4 = "https://complimentr.com/api";
    async function status() {
      const url = url4;
      let response = await axios.get(url);
      return response.data;
    };

    const {compliment } = await status();

    img = imgActors;
    message = bot.sendMessage(
      chatId,
      compliment
    );
  };

  if (query.data === "finish") {
    img = finish;
    message = bot.sendMessage (
      chatId,
      "Am I a joke to you? No exit."
    )
  }

  if (img) {
    bot.sendPhoto(chatId, img, {
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  } else {
    bot.sendMessage(chatId, "Wat? Smthng go wrong. Try again, pal!", {
      reply_markup: {
        inline_keyboard: keyboard,
      },
    });
  }
});
