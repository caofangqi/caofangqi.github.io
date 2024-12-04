import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,b as t,o as a}from"./app-Cxe5U_YE.js";const l={};function n(r,i){return a(),s("div",null,i[0]||(i[0]=[t(`<h1 id="git-清理大文件" tabindex="-1"><a class="header-anchor" href="#git-清理大文件"><span>Git 清理大文件</span></a></h1><p>公司有个项目2G 大小，每次 clone 得等待半天才行，研究了一下发现是有人给dump 文件提交进去了。那个文件就1.xG，然后就找到了 bfg 清理非常成功。</p><h2 id="清理步骤" tabindex="-1"><a class="header-anchor" href="#清理步骤"><span>清理步骤</span></a></h2><h3 id="step-1-克隆仓库需要清理的仓库-使用-mirror" tabindex="-1"><a class="header-anchor" href="#step-1-克隆仓库需要清理的仓库-使用-mirror"><span>step 1 克隆仓库需要清理的仓库 使用 --mirror</span></a></h3><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> clone</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --mirror</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> git://example.com/some-big-repo.git</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="step-2-开始清理" tabindex="-1"><a class="header-anchor" href="#step-2-开始清理"><span>step 2 开始清理</span></a></h3><blockquote><p>bfg.jar 可以去下面的链接里下载 清理之前建议先备份一下</p></blockquote><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="删除commit历史中，文件大小大于100M的文件。" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">java</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -jar</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> bfg.jar</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --strip-blobs-bigger-than</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 100M</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> some-big-repo.git</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="step-3-清理不必要的文件" tabindex="-1"><a class="header-anchor" href="#step-3-清理不必要的文件"><span>step 3 清理不必要的文件</span></a></h3><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="清理不必要的文件，缩小本地仓库" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> some-big-repo.git</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> reflog</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> expire</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --expire=now</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --all</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &amp;&amp; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> gc</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --prune=now</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --aggressive</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="step-4-推送远程" tabindex="-1"><a class="header-anchor" href="#step-4-推送远程"><span>step 4 推送远程</span></a></h3><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> push</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="参考文档" tabindex="-1"><a class="header-anchor" href="#参考文档"><span>参考文档</span></a></h2><ul><li><a href="https://rtyley.github.io/bfg-repo-cleaner/#download" target="_blank" rel="noopener noreferrer">bfg 文档</a></li></ul>`,14)]))}const d=e(l,[["render",n],["__file","git-clean-big-file.html.vue"]]),o=JSON.parse('{"path":"/notes/dev/git/git-clean-big-file.html","title":"Git 清理大文件 BFG","lang":"zh-CN","frontmatter":{"title":"Git 清理大文件 BFG","date":"2024-12-04T23:20:00.000Z","category":["笔记","经验"],"tag":["Git","后端开发备忘录"],"description":"Git仓库特别大怎么办，试试 BFG 吧","head":[["meta",{"property":"og:url","content":"https://yeluozhiqiu.site/notes/dev/git/git-clean-big-file.html"}],["meta",{"property":"og:site_name","content":"叶落知秋"}],["meta",{"property":"og:title","content":"Git 清理大文件 BFG"}],["meta",{"property":"og:description","content":"Git仓库特别大怎么办，试试 BFG 吧"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-04T15:11:55.000Z"}],["meta",{"property":"article:tag","content":"Git"}],["meta",{"property":"article:tag","content":"后端开发备忘录"}],["meta",{"property":"article:published_time","content":"2024-12-04T23:20:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-04T15:11:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Git 清理大文件 BFG\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-12-04T23:20:00.000Z\\",\\"dateModified\\":\\"2024-12-04T15:11:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"叶子\\",\\"url\\":\\"https://yeluozhiqiu.site\\",\\"email\\":\\"caoofangqi@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"清理步骤","slug":"清理步骤","link":"#清理步骤","children":[{"level":3,"title":"step 1 克隆仓库需要清理的仓库 使用 --mirror","slug":"step-1-克隆仓库需要清理的仓库-使用-mirror","link":"#step-1-克隆仓库需要清理的仓库-使用-mirror","children":[]},{"level":3,"title":"step 2 开始清理","slug":"step-2-开始清理","link":"#step-2-开始清理","children":[]},{"level":3,"title":"step 3 清理不必要的文件","slug":"step-3-清理不必要的文件","link":"#step-3-清理不必要的文件","children":[]},{"level":3,"title":"step 4 推送远程","slug":"step-4-推送远程","link":"#step-4-推送远程","children":[]}]},{"level":2,"title":"参考文档","slug":"参考文档","link":"#参考文档","children":[]}],"git":{"createdTime":1733325115000,"updatedTime":1733325115000,"contributors":[{"name":"叶子","email":"caofangqi@outlook.com","commits":1}]},"readingTime":{"minutes":0.85,"words":254},"filePathRelative":"notes/dev/git/git-clean-big-file.md","localizedDate":"2024年12月4日","excerpt":""}');export{d as comp,o as data};
