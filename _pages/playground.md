---
layout: page
title: playground
permalink: /playground/
description: Interactive games and experiments
nav: true
nav_order: 0.5
---

<div class="playground">
  <h2>🍟 Hide the Potato Chips Game</h2>
  <p>Help JiWoo hide the potato chips from her husband!</p>
  
  <div style="width: 100%; max-width: 800px; margin: 0 auto; border: 2px solid #ddd; border-radius: 8px; overflow: hidden;">
    <iframe 
      id="gameFrame"
      style="width: 100%; height: 700px; border: none; display: block;"
      title="Hide the Potato Chips Game"
      allowfullscreen>
    </iframe>
  </div>
  
  <div style="margin-top: 20px; text-align: center;">
    <p><small>Can't see the game? <a id="gameLink" href="#" target="_blank">Open in a new window</a></small></p>
  </div>
</div>

<script>
  (function() {
    var baseurl = '{{ site.baseurl }}';
    var gamePath = baseurl + '/assets/game/index.html';
    document.getElementById('gameFrame').src = gamePath;
    document.getElementById('gameLink').href = gamePath;
  })();
</script>
