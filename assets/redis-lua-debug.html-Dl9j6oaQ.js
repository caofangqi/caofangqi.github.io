import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as l,o as e}from"./app-CNI3iQpD.js";const n={};function t(h,i){return e(),a("div",null,i[0]||(i[0]=[l(`<h1 id="redis-lua-脚本调试详解" tabindex="-1"><a class="header-anchor" href="#redis-lua-脚本调试详解"><span>Redis lua 脚本调试详解</span></a></h1><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2><p>从 Redis 3.2 版本开始， Redis 将内置一个完整的 Lua 调试器， 它的存将会让编写复杂的 Lua 脚本变得容易。</p><p>Redis Lua 调试器， 代号 LDB ， 拥有以下主要特性：</p><ul><li>LDB 使用服务器-客户端模型， 它是一个远程调试器。 Redis 服务器将被用作调试服务器， 而默认的调试客户端则是 redis-cli 。 另一方面， 其他客户端也可以通过实现服务器提供的简单协议来让自己成为调试客户端。</li><li>在默认情况下， 每个调试回话都是一个子进程回话。 这意味着在调试 Lua 脚本的时候， 服务器不会被阻塞并且可以继续进行开发， 又或者同时执行多个调试回话。 这也意味着在调试结束之后， 被调试脚本造成的修改都会被回滚， 因此用户可以随时重启一个新的调试回话， 并在与原来一模一样的数据集上进行调试。</li><li>如果有需要的话， 用户也可以选择同步调试模式， 这个模式将不会创建子进程， 因此调试过程中对数据库进行的所有修改都会被保留， 并且服务器在整个调试过程中都会被阻塞。</li><li>支持单步调试。</li><li>支持静态和动态断点。</li><li>支持将被调试的脚本载入至调试终端。</li><li>支持对 Lua 变量进行视察。</li><li>支持追踪脚本执行的 Redis 命令。</li><li>支持以美观样式打印 Redis 值以及 Lua 值。</li><li>能够在无限循环以及长时间执行的步骤中模拟出一个断点。</li></ul><h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法"><span>使用方法</span></a></h2><div class="hint-container warning"><p class="hint-container-title">注意</p><pre><code>请使用开发服务器而不是生产服务器来进行调试。 使用同步调试模式将导致服务器在整个调试过程中都会被阻塞。
</code></pre></div><h3 id="开启调试会话" tabindex="-1"><a class="header-anchor" href="#开启调试会话"><span>开启调试会话</span></a></h3><ol><li>使用编辑器创建你的脚本。让我们假设你的脚本位于 script.lua 。</li><li>使用以下命令开启调试会话：</li></ol><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> redis-cli</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --ldb</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --eval</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> script.lua</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>注意， 在使用 redis-cli 客户端的 -eval 选项的时候， 你可以将需要传递给脚本的键名以及参数一并提供给客户端， 其中键名和参数之间使用一个逗号来进行分割， 就像这样：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span> redis-cli --ldb --eval script.lua mykey somekey , arg1 arg2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在执行这条命令之后， redis-cli 就会进入特殊的调试模式， 它不再接受普通的 Redis 命令， 而是会打印出一个帮助界面， 并将用户键入的调试命令原原本本地发送给 Redis 服务器。</p><p>进入了调试模式的 redis-cli 将提示用户使用以下三个命令：</p><ul><li>quit —— 结束调试回话。 调试器将移除所有断点， 跳过所有未执行语句， 并最终退出 redis-cli 。</li><li>restart —— 重新载入脚本文件， 并重头开始一个新的调试会话。 用户在调试的过程中， 通常会在调试之后对脚本进行修改， 然后通过执行 restart 来对修改后的脚本继续进行调试， 这个步骤一般会迭代发生多次。</li><li>help —— 打印出可用的调试命令。</li></ul><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">lua</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> debugge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">r&gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">help</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Redis</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Lua</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> debugger</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> help:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[h]elp               打印这个帮助</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[s]tep               运行当前行然后再次停止</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[n]ext               step 的别名，作用相同</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[c]continue          运行直到遇到下个断点为止</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[l]list              列出当前行附近的代码</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[l]list [line]       列出指定行 line 附近的代码</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">                     line</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 代表列出当前行附近的代码</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[l]list [line] [ctx] 列出位于行 line 附近的 ctx 行代码</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[w]hole              列出整个脚本源码，相当于执行 </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;list 1 1000000&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[p]rint              打印出所有局部变量</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[p]rint &lt;var&gt;        打印出指定的局部变量，也可以用于打印全局变量 KEYS 以及 ARGV</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[b]reak              列出所有断点</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[b]reak &lt;line&gt;       将断点添加至指定行</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[b]reak -&lt;line&gt;      移除指定行的断点</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[b]reak 0            移除所有断点</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[t]race              打印回溯链条（Show a backtrace）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[e]eval &lt;code&gt;       在不同的调用幁中执行指定的 Lua 代码</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[r]edis &lt;cmd&gt;        执行给定的 Redis 命令</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[m]axlen [len]       将 Redis 的回复以及 Lua 变量转储（dump）截断至指定的长度。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">                     将参数</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> len</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 的值设置为</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 表示不对长度进行限制。</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">[a]abort             停止执行脚本。</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">                     在同步模式下，对数据库的修改将被保留。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下是两个可以在 Lua 脚本中进行调用的调试函数：</p><ul><li>redis.debug() 在调试终端中输出日志。</li><li>redis.breakpoint() 暂停脚本的执行，就像遇到了一个断点一样。</li></ul><p>需要注意的是， 在默认情况下， 调试器在启动之后将处于单步调试模式。 调试器会停在脚本第一行具有实际作用的代码之前， 然后等待用户的指令。<br> 这时， 用户可以通过执行 step 命令来让调试器执行当前行的代码， 并移动到下一行具有实际作用的代码之前。 在执行 step 命令时， 服务器将会展示出服务器执行的所有命令， 就像这样：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">base</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">➜</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  lua</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> redis-cli</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --ldb</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --eval</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> script.lua</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mykey</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> somekey</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Lua</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> debugging</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> session</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> started,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> please</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> use:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">quit</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">    --</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> End</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> the</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> session.</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">restart</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Restart</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> the</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> script</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> in</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> debug</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> mode</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> again.</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">help</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">    --</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Show</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Lua</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> script</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> debugging</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> commands.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">* Stopped at 1, stop reason = step over</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">   local</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> zsetKey</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> KEYS[1]</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">lua</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> debugge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">r&gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">step</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">* Stopped at 2, stop reason = step over</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">   redis.call</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&quot;GET&quot;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">,zsetKey</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">lua</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> debugge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">r&gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">step</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;redis&gt; GET mykey</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;reply&gt; NULL</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">* Stopped at 3, stop reason = step over</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">   local</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> scopeLeft</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> tonumber</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ARGV[1]</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#其中 &lt;redis&gt; 和 &lt;reply&gt; 分别展示了被执行的Redis命令以及服务器返回的回复。 注意， 这种情况只会出现在单步调试模式中。 如果用户使用 continue 命令， 让调试器一直执行代码直到碰到断点为止， 那么为了防止信息输出过多， 调试器将不会显示出相关的命令信息。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="终止调试会话" tabindex="-1"><a class="header-anchor" href="#终止调试会话"><span><strong>终止调试会话</strong></span></a></h3><ul><li>当脚本自然终止时， 调试会话将结束， redis-cli 将返回至正常的非调试状态。 用户可以通过 restart 命令来重新开始一个调试会话。</li><li>按下 CTRL + C ， 手动终止 redis-cli 。</li><li>redis-cli 和 redis-server 服务器因为任何原因而断开连接时， 调试会话也会终止。</li><li>当服务器关闭时， 所有子进程调试会话都会被终止。</li></ul><h3 id="调试命令缩写" tabindex="-1"><a class="header-anchor" href="#调试命令缩写"><span>调试命令缩写</span></a></h3><pre><code>每个 Redis 调试命令都以不同的字符为开始， 用户可以通过键入这些单个字符来代替键入整个命令。
</code></pre><p>比如说， 用户可以通过只键入 s 来代替键入 step 。</p><h3 id="断点" tabindex="-1"><a class="header-anchor" href="#断点"><span>断点</span></a></h3><h4 id="添加断点" tabindex="-1"><a class="header-anchor" href="#添加断点"><span>添加断点</span></a></h4><blockquote><p>执行命令 b 1 2 3 4 即可以在第 1 、2 、3 、 4 行分别加上断点。</p></blockquote><h4 id="移除断点" tabindex="-1"><a class="header-anchor" href="#移除断点"><span>移除断点</span></a></h4><blockquote><p>执行命令 b 0 则会移除所有断点。<br> 执行命令 b -3 就可以移除第 3 行的断点。</p></blockquote><div class="hint-container warning"><p class="hint-container-title">注意</p><p>向 Lua 不会执行的那些行，比如声明局部变量的行以及注释行添加断点是无效的： 虽然断点会添加到这些行上面， 但用于这些行不会被执行， 所以调试器将不会在这些行上面停止。</p></div><h3 id="动态断点" tabindex="-1"><a class="header-anchor" href="#动态断点"><span>动态断点</span></a></h3><p>在 Lua 脚本中使用 redis.breakpoint() 函数， 这个函数将在接下来将要被执行的代码行前面模拟一个断点。</p><p>以下是一个使用动态断点的例子：</p><div class="language-lua line-numbers-mode" data-highlighter="shiki" data-ext="lua" data-title="lua" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">if</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> counter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &gt; </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">10</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> then</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> redis</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">breakpoint</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">() </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">end</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>这个特性在调试时非常有用， 它可以避免我们为了遇到特定的条件而一直手动地控制脚本的执行进程。</p><h3 id="同步模式" tabindex="-1"><a class="header-anchor" href="#同步模式"><span>同步模式</span></a></h3><p>LDB 在默认情况下将使用子进程来创建调试会话， 并且在调试完成之后， 脚本对数据库进行的任何修改都将会被回滚。 因此后续的调试会话不需要重置数据库就可以直接启动.</p><p><strong>在一些特殊情况下</strong>， 为了追踪特定的 bug ， 用户可以会想要保留每个调试会话对数据库所做的修改。 想要这么做的用户可以在启动调试器时， 向 redis-cli 客户端给定 <strong>ldb-sync-mode</strong> 选项：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">redis-cli</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --ldb-sync-mode</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --eval</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> script.lua</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>注意， 运行在这一调试模式下的服务器在进行调试的过程中将不可用， 所以请小心使用这一选项。</p></div><p>当处于这一模式时， abort 命令可以在中途停止那些已经对数据库进行过修改的脚本。 使用 abort 命令来终止调试会话与正常地终止调试会话是不同的： 如果用户只是简单地用 CTRL + C 来停止 redis-cli ， 那么调试会话将在整个脚本都执行完毕之后终止； 而 abort 则会中途停止脚本并在有需要时启动一个新的调试会话。</p><h3 id="在脚本中进行日志记录" tabindex="-1"><a class="header-anchor" href="#在脚本中进行日志记录"><span>在脚本中进行日志记录</span></a></h3><p>redis.debug() 函数是一个非常强力的调试手段， 它可以在 Lua 脚本内部调用， 并将日志写入至调试终端：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">lua</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> debugge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">r&gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">list</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">   local</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> a</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> {1,2,3}</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">   2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">   local</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> b</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> false</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">   3</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">   redis.debug</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">a,b</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">lua</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> debugge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">r&gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">continue</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;debug&gt; line 3: {</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">3},</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> false</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果脚本不是在调试会话中执行， 那么 redis.debug() 函数将不会引起任何效果。</p><blockquote><p>redis.debug() 可以接受多个参数， 这些参数在输出中将由逗号以及空格进行分隔。</p></blockquote><h3 id="查看程序状态" tabindex="-1"><a class="header-anchor" href="#查看程序状态"><span>查看程序状态</span></a></h3><p>print 函数可以从当前行开始向之前的行进行回溯并查找指定的变量， 一直到顶层（top-level）为止。</p><p>即使调试器位于 Lua 脚本的一个嵌套函数之内， 它仍然可以使用 print foo 来查找位于当前被调用函数上下文中的 foo 变量的值。</p><blockquote><p>如果用户以无参数的方式调用 print 命令， 那么 print 将打印出所有变量以及它们的值。</p></blockquote><p>eval 命令可以在当前调用幁之外的上下文中执行指定的一小段 Lua 脚本,用户可以通过这个命令来测试 Lua 函数：</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">lua</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> debugge</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">r&gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">e</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> redis.sha1hex</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">&#39;foo&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;retval&gt; </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考文档" tabindex="-1"><a class="header-anchor" href="#参考文档"><span>参考文档</span></a></h2><p><a href="https://redis.io/docs/latest/develop/interact/programmability/lua-debugging/" target="_blank" rel="noopener noreferrer">Debugging Lua scripts in Redis</a></p>`,55)]))}const d=s(n,[["render",t],["__file","redis-lua-debug.html.vue"]]),r=JSON.parse('{"path":"/notes/dev/nosql/redis/redis-lua-debug.html","title":"Redis lua 脚本调试详解","lang":"zh-CN","frontmatter":{"date":"2024-12-05T21:00:00.000Z","title":"Redis lua 脚本调试详解","description":"写过 lua 复杂脚本的人都知道，找 bug 那是真的难，lua 调试器就很好的解决这个问题了","category":["笔记"],"tag":["Lua","Redis"],"star":true,"head":[["meta",{"property":"og:url","content":"https://yeluozhiqiu.site/notes/dev/nosql/redis/redis-lua-debug.html"}],["meta",{"property":"og:site_name","content":"叶落知秋"}],["meta",{"property":"og:title","content":"Redis lua 脚本调试详解"}],["meta",{"property":"og:description","content":"写过 lua 复杂脚本的人都知道，找 bug 那是真的难，lua 调试器就很好的解决这个问题了"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-05T12:51:31.000Z"}],["meta",{"property":"article:tag","content":"Lua"}],["meta",{"property":"article:tag","content":"Redis"}],["meta",{"property":"article:published_time","content":"2024-12-05T21:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-05T12:51:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Redis lua 脚本调试详解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-12-05T21:00:00.000Z\\",\\"dateModified\\":\\"2024-12-05T12:51:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"叶子\\",\\"url\\":\\"https://yeluozhiqiu.site\\",\\"email\\":\\"caoofangqi@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":2,"title":"使用方法","slug":"使用方法","link":"#使用方法","children":[{"level":3,"title":"开启调试会话","slug":"开启调试会话","link":"#开启调试会话","children":[]},{"level":3,"title":"终止调试会话","slug":"终止调试会话","link":"#终止调试会话","children":[]},{"level":3,"title":"调试命令缩写","slug":"调试命令缩写","link":"#调试命令缩写","children":[]},{"level":3,"title":"断点","slug":"断点","link":"#断点","children":[]},{"level":3,"title":"动态断点","slug":"动态断点","link":"#动态断点","children":[]},{"level":3,"title":"同步模式","slug":"同步模式","link":"#同步模式","children":[]},{"level":3,"title":"在脚本中进行日志记录","slug":"在脚本中进行日志记录","link":"#在脚本中进行日志记录","children":[]},{"level":3,"title":"查看程序状态","slug":"查看程序状态","link":"#查看程序状态","children":[]}]},{"level":2,"title":"参考文档","slug":"参考文档","link":"#参考文档","children":[]}],"git":{"createdTime":1733403091000,"updatedTime":1733403091000,"contributors":[{"name":"致良知","email":"caofangqi@outlook.com","commits":1}]},"readingTime":{"minutes":8.81,"words":2644},"filePathRelative":"notes/dev/nosql/redis/redis-lua-debug.md","localizedDate":"2024年12月5日","excerpt":""}');export{d as comp,r as data};
