---
layout: page
title: Interrupting AI by Natural Language
description: Combining Stop Generating function with your prompt
img: assets/img/stopgenerating-scene2.png
importance: 5
category: work
---

<h3>The common LLM interaction</h3>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/stopgenerating-scenes.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

The cat user provides a prompt, and the LLM generates a response. This turn-taking is rigid. Unless AI stops itself or the system intervenes, it keeps generating until it hits the token limit.

<h3> Two key Questions </h3>
<div class="row">
    <div class="col-md-6">
        <p>
        1. Why rely on system commands like "stop generating"? Are there alternative methods — perhaps using the most familiar interface to us, language itself?
        </p>
        <p>
        2. Must we refine prompts manually? In human conversations, we adjust by adding words, not rephrasing entire statements. What if AI worked similarly?
        </p>
        <p>
        A possible solution: <b>Interrupting AI with natural language.</b>
        </p>
    </div>

    <div class="col-md-6">
        {% include figure.liquid loading="eager" path="assets/img/stopgenerating-textboxes.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>

</div>

<h3>Our Approach</h3>
We fine-tuned LLaMA 3-8B on a custom dataset and built a web-based system.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/stopgenerating-video.gif" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
When AI is generating, a user can interrupt naturally, e.g., “Any vegan options?”. This phrase acts as a prompt, eliminating manual stops or prompt revisions.

32 participants tested the system. Most found it efficient. Details in the paper (not released yet).

<h3>Tech Stack</h3>
Python, Llama, HTML, CSS, Javascript, Photoshop, Illustrator used.
