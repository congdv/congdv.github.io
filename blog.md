---
layout: default       # ---> Type of the page (page or post)
title: Blog       # ---> Name of the page
permalink: /blog/ # ---> Path of the page
tag: blog
---
<div class="container-blog"> 
    <h1><a href="/">me.blog</a></h1>
    <table class="posts">
        <tbody>
          {% for post in site.tags[page.tag] %}
            <tr>
                <td style="width: 8em"><time>{{ post.date | date_to_string }}</time></td>
                <td><a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a></td>
            </tr>
          {% endfor %}
        </tbody>
    </table>
</div>
