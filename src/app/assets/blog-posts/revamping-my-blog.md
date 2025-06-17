---
title: 'Pimping My Portfolio Page'
date: '2025-06-15'
author: 'klob0t'
---

It's been a year since I build my website. At that time I was looking for a way to showcase my personal projects and freelance works in product design and engineering. I didn't want to just make a static portfolio file to send to potential clients. I want to have a somewhat professional looking landing page that have all my information of my past works. 

Having myself taught HTML and CSS back in my junior high school (I used to have tumblr blog which has 0 original content). I began building my own page.

It has all I needed; photos of my product design and engineering works, a blog posts, a link to my curriculum vitae. All things client would need to collaborate with me.

It was my magnum opus of web design. I put every interactions and effects there; mouse trail, tilting cards, moving SVG, text scramble. Maybe it's just how someone that is just recently know something do (wanting to show everything he created).

But as the year went by, I look at my current blog not as good as it used to be. Opening it on mobile device is not pleasant, some of the elements are broken, too many visual noise that distracts the visitor from the content. 

Now that I have matured (by 1 year) I want just simple things. So does with how my blog appearance.

---

## Thoughtful

I don't want to put any effects just because it is cool. I want all of the visual candies on my blog has its purpose; to guide your eyes toward, not to distract.

Some of distracting elements are also pulled back, making the visitor get as much info at a glance.




> ### _Because (type) safety can be fun!_


That's a slogan from a renowned condom brand. Their condom even has some flavor for some apparent reason...

At first, I was hesitant to try [TypeScript](https://www.typescriptlang.org/) because I thought, why should I add the extra hassle of keeping track of all the types for the entire blog's codebase? It felt like writing essays for a computer that already knew what I meant—just say what you want and let it run, right?

While it's basically just JavaScript with a bit of strict parenting, building this blog in TypeScript introduced me to [ESLint](https://eslint.org/). It's like having a neat freak roommate who points out every sock you leave on the floor—but for your code.

> Wait, what is **TypeScript**, and what is **ESLint**?

TypeScript is a statically typed superset of JavaScript. That means it lets you define the shape of your data and functions—kind of like adding a layer of bubble wrap around your variables. ESLint, on the other hand, is a tool that helps you catch errors and enforce consistency, like that one friend who proofreads your tweets before you embarrass yourself. We all have that one friend.

Now, ESLint works fine with plain JavaScript too. But when you pair it with TypeScript, you unlock this dynamic duo of early error detection. If something’s broken, the compiler straight up refuses to build your app. You either fix it, or **no candy for you.**

Using TypeScript taught me a quiet truth: if your app’s going to get bigger, your types need to grow up too. A few explicit interfaces here and there can save you hours of head-scratching later.

Also, shoutout to the editor integrations. Once you go TypeScript, your IDE basically turns into a coding butler—_“May I suggest this property, sir?”_ **Autocomplete feels like magic**. Refactors become less scary. Renaming a function doesn’t feel like defusing a bomb anymore.

I used to think types would slow me down. Turns out, they just stop me from running in the wrong direction for 45 minutes. Well I still ran around for 45 minutes but at least it is going to the right direction.

Another perk: self-documenting code. When you define a type or interface, you're not just writing code; you're leaving behind a breadcrumb trail for future-you (or some poor soul after you). Who needs verbose comments when your function signature says it all?

Of course, the learning curve is still real. I still Google _“TypeScript how to type a function that returns a promise of an array of optional booleans”_ more often than I'd like to admit.

But if you're still unsure, don't worry. You don't have to go full TypeScript cult overnight. Start with one file. Sprinkle in a few types. See how it feels. It’s like hot sauce—you don’t chug the bottle on day one, you just dip a fry in it.

And who knows? You might just develop a taste for it.

Once I got comfortable, I found myself reaching for TypeScript even for tiny scripts or hobby projects. It’s like once you’ve driven a car with parking sensors, you don’t really want to go back to guessing how far the wall is. Sure, it takes a few extra keystrokes, but the payoff in confidence is absolutely worth it.

And let’s be honest—half the bugs we chase are silly things like `undefined is not a function` or `cannot read property 'length' of null`. TypeScript doesn’t make those disappear magically, but it gives you a nice little flashlight and a map before you wander into the dark corners of your code.

At the end of the day, TypeScript isn’t about being a 10x developer or memorizing the entire type system. It’s about making your future self (and your team, if you're working with one) quietly thank you. A little extra structure up front can go a long way toward keeping your project sane months down the line.

