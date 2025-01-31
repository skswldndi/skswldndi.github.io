---
layout: page
title: AI Provides Real-time Listening Feedback
description: in natural language, as users ask a question
img: assets/img/backchannels-machine.png
importance: 3
category: work
---

<h3>Can AI Show That It's Listening?</h3>

Imagine having a conversation with someone. In typical speech conversations, people naturally provide signals to show they are listening—like nodding or saying “uh-huh.”

However, when chatting with an LLM, this kind of interaction isn’t possible. One reason is that the model can’t see the user’s input until they press enter. Another is that strict turn-taking has become the norm in chat-based interactions — not just with LLMs but also in human-to-human online conversations.

But what if text-based interactions with LLMs could include real-time listening signals? How would users react if the AI could indicate attentiveness while they were still typing?

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/backchannels-machine.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<h3>Our Approach</h3>

To explore this, a web-based interactive system was developed, as shown in the video. An open-source model was finetuned on a custom dataset, and a web interface was built to support real-time backchanneling.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/backchannels-video.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Here, as the user types, the AI responds with “Yeah,” signaling that it is listening.

A user study revealed that, while this kind of backchanneling made the AI feel more human-like, it did not provide significant functional benefits. One possible reason is that Human-AI conversations are often more instruction-based than casual.

More details can be found in the [research paper](https://arxiv.org/abs/2501.18103).

<h3>Tech Stack</h3>
Python, LLaMA, HTML, CSS, JavaScript, Photoshop, and Illustrator.
