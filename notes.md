---
layout: default       # ---> Type of the page (page or post)
title: Notes       # ---> Name of the page
permalink: /notes/ # ---> Path of the page
tag: notes
---
<div class="container-blog"> 
    <h1><a href="/">me.notes</a></h1>
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
