---
title: 'Making a Poetry Blog'
date: '2025-06-16'
author: 'klob0t'
---

![thoughtilets](/images/blogs/thoughtilets1.png)

My girlfriend used to write short poem. Some of her poems made it to [Phosphenous](https://www.instagram.com/phosphenous.jpg/?hl=en), a big quote/short poems account, back in those days. And apparently many people enjoyed her writings (as they should!) as it resonates with their feelings deeply.

While i am building my website, I asked her if she wanted to start writing again. And to that she said yes... But, she doesnt know where she should put it. She has a Medium profile. But Medium is more suitable for a long story or article, and on top of that not many people is on Medium. She has considered putting her poems on Instagram, but she would need to make an image to show the poem because putting poem on an Instagram caption is like renting a billboard but the cover it with a blanket. And twitter? She has considered it too I guess, but I dont know why she hasnt start yet. Probably setting up a new account and getting traction there is not easy.

So I offered her...

> kamu mau aku buatin blog buat tulisan kamu?

> mau. terus tapi aku ngisinya gimana nanti? kamu bisa?

And so the creation of her poem blog begins...

## Concept

Most of her poems have a sad and gloomy feeling on it. I imagine a white blank paper with text like its just you, your feeling, and that text which will cry your tears (weve all been there).

For the font, I usually go with Inter, Geist, or a monotype/grotesque font. But for this I want to capture the raw vibe of the poem like you were just pour what you are feeling out to a writing. It should be cursive, and a little bit 'messy'. Then I came across this font: ['Pecita'](https://pecita.eu/police-en.php). It has all I need; cursive, a little 'messy', and what caught my eyes the most was the letter connects with such a natural handwriting manner (OpenType technology I think). And to accompany this cursive font, I used [Xanh Mono](https://fonts.google.com/specimen/Xanh+Mono), a serif-slash-monotype font.

![Porter Robinson's Secret Sky](https://images.genius.com/1cba4deb7e9a8d7c4aea123b2f4d9338.1000x1000x1.jpg)

Then I need some visual to balance the text, to also convey the idea of sadness, desperation, and gloom. I was thinking, sometimes when we are feeling down we often scribble nonsense on a paper just to let the feeling out. But showing only a blob of scribble is not pretty. Then I remember the poster for Porter Robinson's Secret Sky concert. It is full of random scribble line art scattered. Those line art has that feeling. It is beautiful but still tell how his music in that era feels like.

But I dont want to make a dozen of random scribbles manually, it will take much time and the number of scribbles I could make is obviously limited. Since I want this blog to live a long life, to accompany her on her every journey, I need the scribble to has infinite shape. I want it to generate using code. And with the use of `<canvas>` drawing and random number generator, I was able to achieve that.

## Feature

Back to her question about how she could post a new writing to the blog, I decided to learn to use database. Because for this blog I upload my blog posts along with the source code (now that I know how to connect to a database, I might also migrate my posts there).The most suggested approach is to use Postgres through Supabase. As it is also fully integrated within Vercel environment.

After that, she need an interface to write her poem to. A simple rich text compositor would do. Basic formatting such as bold, italic, headings, and list should be sufficient for a short poem. This rich text is then converted to markdown format before storing it in it's database.

To prevent someone random to submit a poem, I implemented a login page where only her know the secret word to access it. It's a simple authentification process.

![Screencapture](/images/blogs/thoughtilets2.png)

Short poem gets shared a lot on social media. It would be a hassle to copy and paste the poem when someone wants to share her poem. So, I set up an action to convert the page to a .png image that is directly downloaded to the user's device, so they can share it on their socials. With this I can also show the generated line art along with the text.

And with that the blog is done! you can visit it here: [thoughtilets](https://thoughtilets.vercel.app), and share her poem to your socials! don't forget to tag her. The blog also has all of her social.