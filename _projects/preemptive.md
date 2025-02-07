---
layout: page
title: AI Answers Before the Question Ends
description: Sometimes before the user completes their thought
img: assets/img/preemptive-waves.png
importance: 2
category: NLP X HCI
---

<h3>Humans Naturally Overlap in Conversation</h3>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/preemptive-waves.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

In face-to-face conversations, strict turn-taking is rarely observed. Unlike machines, humans are highly skilled at overlapping speech, seamlessly interweaving words during interactions. This overlap serves various functions, one of which is "terminal overlap."

Listeners often anticipate the end of a speaker’s sentence and begin responding before it is fully completed. This natural communicative behavior occurs effortlessly and often goes unnoticed.

<h3> Bringing Overlap to Human-AI Text Interaction </h3>

<div class="row">
    <div class="col-md-6">
        <p>
        Applying this natural conversational behavior to text-based human-AI interactions raises an interesting question: Can an AI respond before a user has finished typing a question? </p>

        <p>
        Text-based AI assistants have become integral tools in daily tasks. Enabling them to respond proactively could enhance their effectiveness and usability. </p>

    </div>

    <div class="col-md-6">
        {% include figure.liquid loading="eager" path="assets/img/preemptive-textboxes.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>

</div>

<h3>Our Approach</h3>
A custom dataset was used to finetune LLaMA 3-8B, followed by the development of a web-based system capable of generating responses in real time.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/preemptive-video.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The system generates responses before a user has completed their question. A user study revealed mixed reactions: Some participants found the interaction engaging and communicative, while others, particularly those who use prompt writing as a way to structure their thoughts, found it disruptive.

Further details are provided in the [research paper](https://arxiv.org/abs/2501.18103).

<h3>Tech Stack</h3>
Python, LLaMA, HTML, CSS, JavaScript, Photoshop, and Illustrator.
