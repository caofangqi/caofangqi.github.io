import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as l,b as a,o as e}from"./app-yY1Ru4Cj.js";const n={};function t(h,i){return e(),l("div",null,i[0]||(i[0]=[a(`<h1 id="常用的-linux-命令" tabindex="-1"><a class="header-anchor" href="#常用的-linux-命令"><span>常用的 Linux 命令</span></a></h1><h2 id="常用文本文件目录操作" tabindex="-1"><a class="header-anchor" href="#常用文本文件目录操作"><span>常用文本文件目录操作</span></a></h2><h3 id="ls-查看文件夹包含的文件-可以查看文件权限-包括目录、文件夹、文件权限" tabindex="-1"><a class="header-anchor" href="#ls-查看文件夹包含的文件-可以查看文件权限-包括目录、文件夹、文件权限"><span>ls 查看文件夹包含的文件，可以查看文件权限(包括目录、文件夹、文件权限)</span></a></h3><ul><li>ls -a 列出目录所有文件，包含以.开始的隐藏文件</li><li>ls -A 列出除.及..的其它文件</li><li>ls -r 反序排列</li><li>ls -t 以文件修改时间排序</li><li>ls -S 以文件大小排序</li><li>ls -h 以易读大小显示</li><li>ls -l 除了文件名之外，还将文件的权限、所有者、文件大小等信息详细列出来</li></ul><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> #列出文件绝对路径 </span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> ls</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -a</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">sed</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;s:^:\`</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">pwd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`/:&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cd-命令-进入文件夹" tabindex="-1"><a class="header-anchor" href="#cd-命令-进入文件夹"><span>cd 命令 进入文件夹</span></a></h3><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#切换当前目录至 dirName。</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [目录名]</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 进入根目录</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 进入登录用户目录</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ~</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 进入上一级目录</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ..</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="pwd-命令-查看当前目录" tabindex="-1"><a class="header-anchor" href="#pwd-命令-查看当前目录"><span>pwd 命令 查看当前目录</span></a></h3><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#pwd 命令用于查看当前工作目录路径。</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">pwd</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mkdir-命令-创建文件夹" tabindex="-1"><a class="header-anchor" href="#mkdir-命令-创建文件夹"><span>mkdir 命令 创建文件夹</span></a></h3><ul><li>mkdir -p 可以是一个路径名称。此时若路径中的某些目录尚不存在,加上此选项后，系统将自动建立好那些尚不在的目录，即一次可以建立多个目录。</li><li>mkdir -m 对新建目录设置存取权限，也可以用 chmod 命令设置;</li></ul><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 当前目录下创建 test 文件夹</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mkdir</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> test</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># /temp 目录下创建 test/t1/t2/t3 的目录</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mkdir</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /temp/test/t1/t2/t3</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rm-命令-删除文件" tabindex="-1"><a class="header-anchor" href="#rm-命令-删除文件"><span>rm 命令 删除文件</span></a></h3><p>删除一个目录中的一个或多个文件或目录，如果没有使用 -r 选项，则 rm 不会删除目录。如果使用 rm 来删除文件，通常仍可以将该文件恢复原状。</p><blockquote><p>rm [选项] 文件…</p></blockquote><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#删除任何 .log 文件，删除前逐一询问确认</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -i</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> *</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">.log</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#删除 test 子目录及子目录中所有档案删除，并且不用一一确认：</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">rm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -rf</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> test</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mv-命令-移动文件-文件夹" tabindex="-1"><a class="header-anchor" href="#mv-命令-移动文件-文件夹"><span>mv 命令 移动文件/文件夹</span></a></h3><blockquote><p>mv [-f | -i | -n] [-hv] source target</p></blockquote><blockquote><p>mv [-f | -i | -n] [-v] source ... directory</p></blockquote><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#将文件 test.log 重命名为 test1.txt</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> test.log</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> test1.txt</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#将文件 log1.txt,log2.txt,log3.txt 移动到根的 test3 目录中</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mv</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> llog1.txt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> log2.txt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> log3.txt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /test3</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#将文件 file1 改名为 file2，如果 file2 已经存在，则询问是否覆盖</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mv</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> log1.txt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> log2.txt</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#移动当前文件夹下的所有文件到上一级目录</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mv</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> *</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ../</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cp-命令-复制文件-文件夹" tabindex="-1"><a class="header-anchor" href="#cp-命令-复制文件-文件夹"><span>cp 命令 复制文件/文件夹</span></a></h3><p>将源文件复制至目标文件，或将多个源文件复制至目标目录。 注意：命令行复制，如果目标文件已经存在会提示是否覆盖，而在 shell 脚本中，如果不加 -i 参数，则不会提示，而是直接覆盖！</p><ul><li>-i 提示</li><li>-r 复制目录及目录内所有项目</li><li>-a 复制的文件与原文件时间一样</li></ul><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#复制 a.txt 到 test 目录下，保持原文件时间，如果原文件存在提示是否覆盖</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cp</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -ai</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> a.txt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> test</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#为 a.txt 建立一个链接（快捷方式</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cp</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -s</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> a.txt</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> link_a.txt</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cat-命令-显示文件-操作" tabindex="-1"><a class="header-anchor" href="#cat-命令-显示文件-操作"><span>cat 命令 显示文件/操作</span></a></h3><ul><li>-b 对非空输出行号</li><li>-n 输出所有行号</li></ul><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#一次显示整个文件</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> filename</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#将几个文件合并为一个文件</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cat</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> file1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> file2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">file</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#把 1.log 的文件内容加上行号后输入 2.log 这个文件里</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cat</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 1.log</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 2.log</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#把 1.log 和 2.log 的文件内容加上行号（空白行不加）之后将内容附加到 t.log 里</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">cat</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -b</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 1.log</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 2.log</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> t.log</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="more-命令" tabindex="-1"><a class="header-anchor" href="#more-命令"><span>more 命令</span></a></h3><p>功能类似于 cat, more 会以一页一页的显示方便使用者逐页阅读，而最<strong>基本的指令就是按空白键（space）就往下一页显示，按 b 键就会往回（back）一页显示</strong>。</p><ul><li>+n 从笫 n 行开始显示</li><li>-n 定义屏幕大小为n行</li><li>+/pattern 在每个档案显示前搜寻该字串（pattern），然后从该字串前两行之后开始显示</li><li>-c 从顶部清屏，然后显示</li><li>-d 提示“Press space to continue，’q’ to quit（按空格键继续，按q键退出）”，禁用响铃功能</li><li>-l 忽略Ctrl+l（换页）字符</li><li>-p 通过清除窗口而不是滚屏来对文件进行换页，与-c选项相似</li><li>-s 把连续的多个空行显示为一行</li><li>-u 把文件内容中的下画线去掉</li></ul><div class="language-text line-numbers-mode" data-highlighter="shiki" data-ext="text" data-title="text" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Enter    向下 n 行，需要定义。默认为 1 行</span></span>
<span class="line"><span>Ctrl+F   向下滚动一屏</span></span>
<span class="line"><span>空格键  向下滚动一屏</span></span>
<span class="line"><span>Ctrl+B  返回上一屏</span></span>
<span class="line"><span>=       输出当前行的行号</span></span>
<span class="line"><span>:f     输出文件名和当前行的行号</span></span>
<span class="line"><span>V      调用vi编辑器</span></span>
<span class="line"><span>!命令   调用Shell，并执行命令</span></span>
<span class="line"><span>q       退出more</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="举个栗子" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#显示文件中从第3行起的内容</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">more</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> +3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> text.txt</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#在所列出文件目录详细信息，借助管道使每次显示 5 行 按空格显示下 5 行。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ls</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -l</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">more</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -5</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="less-命令" tabindex="-1"><a class="header-anchor" href="#less-命令"><span>less 命令</span></a></h3><p>less 与 more 类似，但使用 less 可以随意浏览文件,而且 less 在查看之前不会加载整个文件。</p><ul><li>-i 忽略搜索时的大小写</li><li>-N 显示每行的行号</li><li>-o &lt;文件名&gt; 将less 输出的内容在指定文件中保存起来</li><li>-s 显示连续空行为一行</li><li>/字符串：向下搜索“字符串”的功能</li><li>?字符串：向上搜索“字符串”的功能</li><li>n：重复前一个搜索（与 / 或 ? 有关）</li><li>N：反向重复前一个搜索（与 / 或 ? 有关）</li><li>-x &lt;数字&gt; 将“tab”键显示为规定的数字空格</li><li>b 向后翻一页</li><li>d 向后翻半页</li><li>h 显示帮助界面</li><li>Q 退出less 命令</li><li>u 向前滚动半页</li><li>y 向前滚动一行</li><li>空格键 滚动一行</li><li>回车键 滚动一页</li><li>[pagedown]： 向下翻动一页</li><li>[pageup]： 向上翻动一页</li></ul><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="eg" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#ps 查看进程信息并通过 less 分页显示</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ps</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -aux</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">less</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -N</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#查看多个文件 可以使用 n 查看下一个，使用 p 查看前一个。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">less</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 1.log</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 2.log</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="相关文档" tabindex="-1"><a class="header-anchor" href="#相关文档"><span>相关文档</span></a></h1><p><a href="https://www.runoob.com/w3cnote/linux-common-command-2.html" target="_blank" rel="noopener noreferrer">菜鸟教程-Linux 常用命令学习</a></p>`,38)]))}const r=s(n,[["render",t],["__file","frequentlyUsedLinuxCommand.html.vue"]]),p=JSON.parse('{"path":"/notes/linux/frequentlyUsedLinuxCommand.html","title":"常用的 Linux 命令","lang":"zh-CN","frontmatter":{"title":"常用的 Linux 命令","date":"2024-11-19T22:50:00.000Z","category":["Linux 笔记","备忘录"],"tag":["Linux","后端开发备忘录"],"description":"记录日常工作中常用的 linux 命令、持续更新","head":[["meta",{"property":"og:url","content":"https://caofangqi.github.io/notes/linux/frequentlyUsedLinuxCommand.html"}],["meta",{"property":"og:site_name","content":"叶落知秋"}],["meta",{"property":"og:title","content":"常用的 Linux 命令"}],["meta",{"property":"og:description","content":"记录日常工作中常用的 linux 命令、持续更新"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-19T15:43:31.000Z"}],["meta",{"property":"article:tag","content":"Linux"}],["meta",{"property":"article:tag","content":"后端开发备忘录"}],["meta",{"property":"article:published_time","content":"2024-11-19T22:50:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-19T15:43:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"常用的 Linux 命令\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-11-19T22:50:00.000Z\\",\\"dateModified\\":\\"2024-11-19T15:43:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"叶子\\",\\"url\\":\\"https://caofangqi.github.io\\",\\"email\\":\\"caoofangqi@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"常用文本文件目录操作","slug":"常用文本文件目录操作","link":"#常用文本文件目录操作","children":[{"level":3,"title":"ls  查看文件夹包含的文件，可以查看文件权限(包括目录、文件夹、文件权限)","slug":"ls-查看文件夹包含的文件-可以查看文件权限-包括目录、文件夹、文件权限","link":"#ls-查看文件夹包含的文件-可以查看文件权限-包括目录、文件夹、文件权限","children":[]},{"level":3,"title":"cd 命令 进入文件夹","slug":"cd-命令-进入文件夹","link":"#cd-命令-进入文件夹","children":[]},{"level":3,"title":"pwd 命令 查看当前目录","slug":"pwd-命令-查看当前目录","link":"#pwd-命令-查看当前目录","children":[]},{"level":3,"title":"mkdir 命令 创建文件夹","slug":"mkdir-命令-创建文件夹","link":"#mkdir-命令-创建文件夹","children":[]},{"level":3,"title":"rm 命令 删除文件","slug":"rm-命令-删除文件","link":"#rm-命令-删除文件","children":[]},{"level":3,"title":"mv 命令 移动文件/文件夹","slug":"mv-命令-移动文件-文件夹","link":"#mv-命令-移动文件-文件夹","children":[]},{"level":3,"title":"cp 命令 复制文件/文件夹","slug":"cp-命令-复制文件-文件夹","link":"#cp-命令-复制文件-文件夹","children":[]},{"level":3,"title":"cat 命令 显示文件/操作","slug":"cat-命令-显示文件-操作","link":"#cat-命令-显示文件-操作","children":[]},{"level":3,"title":"more 命令","slug":"more-命令","link":"#more-命令","children":[]},{"level":3,"title":"less 命令","slug":"less-命令","link":"#less-命令","children":[]}]}],"git":{"createdTime":1732031011000,"updatedTime":1732031011000,"contributors":[{"name":"叶子","email":"caofangqi@outlook.com","commits":1}]},"readingTime":{"minutes":5.13,"words":1539},"filePathRelative":"notes/linux/frequentlyUsedLinuxCommand.md","localizedDate":"2024年11月19日","excerpt":""}');export{r as comp,p as data};
