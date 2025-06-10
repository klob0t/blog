---
title: My Coding Journey
date: 2024-01-05
---
_As of 21/03/2024, this project is still ongoing, hence the 'journey'_

Whenever I saw some programmers online doing livestreams while making an app or some working-from-home-coding-bros that seemed like they had their lives sorted out: wake up => coffee => work-out => code. (It was always in that order).

I wanted to live like THAT.

> Upon writing this blog post, I remember that I tried to code back in 2018. At that time, I tried to learn [Kotlin](https://kotlinlang.org/). Of course, it didn't go very well. In fact, it didn't go anywhere at all. Hehe

Not to mention, the salary or payout that (they say) they got each month is quite _intriguing_. You've probably seen some videos on "how I made $10,000 a month as a programmer without a computer science degree." I was like... well, I think I can do that too! Right?

![](https://i.ytimg.com/vi/V1zBOprSWDQ/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBRW5LX3F6hdwo8P9FN2flJV98QcQ)

And on top of that, these days, we can't be separated from programs in our daily life. If you think about it, the only time you are not on some type of program is when you are sleeping (even your sleep is probably interrupted by a program). I think it's nice to understand how the things that we use every day work.

But, just like everything good, to achieve it won't be easy, especially since I'm coming from a mechanical engineering background (to be clear, I got some programming lectures when I was in college, but it's not much, which shouldn't be that way, I think we need to add a bit more programming within MechEng). And with everything I did, I often lose the curiosity to master something along the way of learning it once I know basic stuff. So, I need to:

1. Find something that would keep me motivated.
2. It has to be easy enough, but not only scratching the surface. And the most important thing is...
3. It needs to look **COOL**.

And with that, I began looking... After much contemplation, research, and digging the internet unnecessarily too much, I have found something that satisfies all of the criteria above.

> Audio Plugin

![](https://www.schoolofbollywoodmusic.com/wp-content/uploads/2021/06/Waves_Audio_Plugins.jpg)

Why I landed on this? If you don't know already, I like to do music on my spare time (by the way, you can check what I've made on my [YouTube channel](https://youtube.com/@klob0t)). And the world of audio plugins is wonderful in my opinion. How you can turn a basic saw wave into a nasty mean dubstep growl with a bunch of compression is magic to me, or how you can turn a single piano note into a [full song](https://youtu.be/zvKY_DnM1PA?si=NsiHCLIsc840VogN&t=608). BUT I know the knowledge in both how sound works and programming (both need math, by the way) to get to that level cannot be achieved in a short time. I will need years to do that. I have to take smaller chunks before tackling some bigger projects to keep me going #dopamine.

Then I remember last-last year I saw a YouTube video of an artist recording his Ableton session, and then there was this meter thingy going on his screen. There were a spectrogram, spectrum analyzer, goniometer, peak meter (?), and waveform. But no information on the software was provided... until recently I found out that the software was [Minimeters](https://minimeters.app/). Because now everybody is using this software.

![Minimeters](https://media.imgcdn.org/repo/2023/05/minimeters-0-8-12/6454db188da44-minimeters-0-8-12-screenshot1.jpg)

> Then I set myself to learn how to code my own audio meter.

I began looking for tutorials on YouTube. At first, I was trying to make it in Python. But everyone in the business is saying that Python is not good for real-time applications, which is the number one thing an audio plugin needs. You have to write it in C/C++. Well... OK. It won't be too difficult, right? Of course, I was wrong.

Fortunately, there is an exact [tutorial](https://www.youtube.com/watch?v=Mo0Oco3Vimo&t=3630s&pp=ygUSZnJlZWNvZGVjYW1wIGF1ZGlv) on freecodecamp's YouTube channel on making audio plugins in C++ using the JUCE framework. I dived headfirst into the tutorial and got my head hit several times. I thought I could just tag along and learn by actually doing the project with zero knowledge of C++. But oh boy, there are so many concepts that I hadn't even heard of. 

The installation itself is not the easiest thing to do for a noob like me. Unlike Python, C++ needs to be compiled first to run. And to set up the compiler, the JUCE framework is not that straightforward, especially for Windows. #cmiiw here. I can't continue watching this tutorial for now. I need to know some basic C++ tutorials.

Well, the internet is a free university, they say. The YouTube channel Bro Code made a 6-hour C++ [course](https://www.youtube.com/watch?v=-TkoO8Z07hI&pp=ygUMYnJvIGNvZGUgYysr) for beginners, and I watched it all the way. But apparently, it's still only scratching the surface, the outer layer, the clear coat (?) of the body (bad metaphor, I know) of the world of C++. It was still not enough for me to make my dream audio meter plugin.

But I persevered #anjay. With my limited knowledge, I kept going, looking at the JUCE docs available, joining the discord server of audio programmers, and asking people on Stack Overflow...

## Waveform Viewer

The first meter I want to make is a waveform viewer. (Is it a meter?). Fortunately, it is already available from the JUCE framework itself. I just need to dial in some settings to get it showing perfectly. BUT in the current state, it doesn't have the ability to catch the lowest frequency. That's why it appears jumpy. By being able to catch the lowest frequency, it can adapt the wavelength shown on the window so the number of waves shown can be consistent. Hmmmm how to do that.

![](/images/peek1.png)

To be honest, I still don't have any idea on how to do that. Sooooo until next time. Bye bye.