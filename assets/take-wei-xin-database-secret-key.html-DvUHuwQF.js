import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,b as l,o as e}from"./app-Cr_FMumK.js";const n={};function t(h,i){return e(),a("div",null,i[0]||(i[0]=[l(`<h1 id="获取密钥" tabindex="-1"><a class="header-anchor" href="#获取密钥"><span>获取密钥</span></a></h1><p><strong>需要提前关闭 SIP</strong></p><h2 id="关闭-sip" tabindex="-1"><a class="header-anchor" href="#关闭-sip"><span>关闭 SIP</span></a></h2><ol><li>mac电脑关机</li><li>按住电源键10s【M系列】直到出现恢复模式界面(inter 芯片是关机之后开机 按 command+R 按钮进入恢复模式)</li><li>点击顶部菜单,然后打开终端</li><li>在终端中输入csrutil disable，以关闭系统完整性保护（SIP）</li></ol><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#查看 SIP状态</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">csrutil</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> status</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; System Integrity Protection status: disabled.</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 关闭 SIP ,需要进入 MAC 恢复模式 终端执行</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">csrutil</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> disable</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 开启 SIP</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">ccsrutil</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> enable</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="lldb-断点获取-密钥信息" tabindex="-1"><a class="header-anchor" href="#lldb-断点获取-密钥信息"><span>lldb 断点获取 密钥信息</span></a></h2><ol><li>打开终端输入</li></ol><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> sudo</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> lldb</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -p</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> $(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pgrep</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> WeChat</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="输出" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">lldb</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">process</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> attach</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --pid</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 3011</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Process</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 3011</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> stopped</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">* thread </span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#1, queue = &#39;com.apple.main-thread&#39;, stop reason = signal SIGSTOP</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    frame</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> #0: 0x00007ff8092e7f0e libsystem_kernel.dylib\`mach_msg2_trap + 10</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">libsystem_kernel.dylib</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">mach_msg2_trap:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">-</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&gt;  </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">0x7ff8092e7f0e</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">+1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">0&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">: retq</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    0x7ff8092e7f0f</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">+1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">1&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">: nop</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">libsystem_kernel.dylib</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\`</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">macx_swapon:</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    0x7ff8092e7f10</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">+</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">0&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  movq</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">   %rcx,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> %r10</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    0x7ff8092e7f13</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">+</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">3&gt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">  movl</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">   $0x1000030</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">,</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> %eax</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ; </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">imm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x1000030</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Target</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 0:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (WeChat) stopped.</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Executable</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> module</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> to</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;/Applications/WeChat.app/Contents/MacOS/WeChat&quot;.</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Architecture</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> set</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> to:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> x86_64-apple-macosx-.</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>设置断点</li></ol><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">br</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> set</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> sqlite3_key</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>设置成功输出如下</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">lldb</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">br</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> set</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> sqlite3_key</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Breakpoint</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 1:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 2</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> locations.</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>输入 c 回车</li><li>这时候会弹出微信登录界面，登录即可</li><li>继续执行下面命令 输出密钥</li></ol><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">   memory</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> read</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --size</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --format</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> x</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --count</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 32</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $rsi</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="输出" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">lldb</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">memory</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> read</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --size</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --format</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> x</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --count</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 32</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $rsi</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">0x6000029147e0:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x6f</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x4a</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x95</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x30</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x04</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x5d</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x4d</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0xbe</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">0x6000029147e8:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0xb3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x02</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0xdd</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0xa3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x7d</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x9f</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x46</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0xa7</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">0x6000029147f0:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x47</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x4b</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x80</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x74</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0xc9</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0xfe</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x44</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0xb0</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">0x6000029147f8:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0xb3</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x10</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0xa5</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x16</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x41</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0xe7</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0xf5</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 0x38</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到这里为止 密钥已经获取到了。</p><h2 id="使用-python-脚本-处理密钥" tabindex="-1"><a class="header-anchor" href="#使用-python-脚本-处理密钥"><span>使用 python 脚本 处理密钥</span></a></h2><div class="language-python line-numbers-mode" data-highlighter="shiki" data-ext="python" data-title="python" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">source </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">0x6000029147e0: 0x6f 0x4a 0x95 0x30 0x04 0x5d 0x4d 0xbe</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">0x6000029147e8: 0xb3 0x02 0xdd 0xa3 0x7d 0x9f 0x46 0xa7</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">0x6000029147f0: 0x47 0x4b 0x80 0x74 0xc9 0xfe 0x44 0xb0</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">0x6000029147f8: 0xb3 0x10 0xa5 0x16 0x41 0xe7 0xf5 0x38</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">key </span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;0x&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> +</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">join</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(i.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">partition</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;:&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">2</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">].</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">replace</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;0x&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">).</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">replace</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39; &#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">for</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> i </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">in</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> source.</span><span style="--shiki-light:#383A42;--shiki-dark:#61AFEF;">split</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\n</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)[</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">5</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">])</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">print</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(key)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出如下</p><blockquote><p>0x6f4a9530045d4dbeb302dda37d9f46a7474b8074c9fe44b0b310a51641e7f538 这就是可以用的密钥了</p></blockquote><h2 id="微信聊天记录存储地址" tabindex="-1"><a class="header-anchor" href="#微信聊天记录存储地址"><span>微信聊天记录存储地址</span></a></h2><blockquote><p>~/Library/Containers/com.tencent.xinWeChat/Data/Library/Application\\ Support/com.tencent.xinWeChat/xxx/yyy/Message/*.db xxx 是版本号 yyy 是登录微信号的一个编码可能是 ID，如果登录多个微信 可能有多个文件夹 需要一个个查看下 可以根据最近更新时间来判断。 所有的微信聊天记录就保存在这个Message 目录下的db数据库文件 使用 SQLite 进行存储的，可以使用 Sqlite 查看工具查看 比如<a href="https://sqlitebrowser.org/" target="_blank" rel="noopener noreferrer">sqlitebrowser</a> 也可以使用代码直接连接读取数据进行分析<a href="https://www.runoob.com/sqlite/sqlite-python.html" target="_blank" rel="noopener noreferrer">sqlite-python</a></p></blockquote><h1 id="相关文档" tabindex="-1"><a class="header-anchor" href="#相关文档"><span>相关文档</span></a></h1><ul><li><a href="https://github.com/JIaDLu/WeChat-Records-Analysis" target="_blank" rel="noopener noreferrer">获取WeChat聊天记录并用photon分析</a></li><li><a href="https://developer.aliyun.com/article/1265761" target="_blank" rel="noopener noreferrer">微信数据库解析总结</a></li></ul>`,25)]))}const r=s(n,[["render",t],["__file","take-wei-xin-database-secret-key.html.vue"]]),d=JSON.parse('{"path":"/notes/experience/take-wei-xin-database-secret-key.html","title":"Mac 下读取微信聊天记录(获取微信聊天记录db 文件访问密钥)","lang":"zh-CN","frontmatter":{"title":"Mac 下读取微信聊天记录(获取微信聊天记录db 文件访问密钥)","date":"2025-03-04T22:32:00.000Z","category":["笔记"],"tag":["备忘录","微信"],"description":"分析本地的微信聊天记录第一步，先获取本地消息数据库密钥","head":[["meta",{"property":"og:url","content":"https://yeluozhiqiu.site/notes/experience/take-wei-xin-database-secret-key.html"}],["meta",{"property":"og:site_name","content":"叶落知秋"}],["meta",{"property":"og:title","content":"Mac 下读取微信聊天记录(获取微信聊天记录db 文件访问密钥)"}],["meta",{"property":"og:description","content":"分析本地的微信聊天记录第一步，先获取本地消息数据库密钥"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-03-04T14:32:40.000Z"}],["meta",{"property":"article:tag","content":"备忘录"}],["meta",{"property":"article:tag","content":"微信"}],["meta",{"property":"article:published_time","content":"2025-03-04T22:32:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-03-04T14:32:40.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mac 下读取微信聊天记录(获取微信聊天记录db 文件访问密钥)\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2025-03-04T22:32:00.000Z\\",\\"dateModified\\":\\"2025-03-04T14:32:40.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"叶子\\",\\"url\\":\\"https://yeluozhiqiu.site\\",\\"email\\":\\"caoofangqi@outlook.com\\"}]}"]]},"headers":[{"level":2,"title":"关闭 SIP","slug":"关闭-sip","link":"#关闭-sip","children":[]},{"level":2,"title":"lldb 断点获取 密钥信息","slug":"lldb-断点获取-密钥信息","link":"#lldb-断点获取-密钥信息","children":[]},{"level":2,"title":"使用 python 脚本 处理密钥","slug":"使用-python-脚本-处理密钥","link":"#使用-python-脚本-处理密钥","children":[]},{"level":2,"title":"微信聊天记录存储地址","slug":"微信聊天记录存储地址","link":"#微信聊天记录存储地址","children":[]}],"git":{"createdTime":1741098760000,"updatedTime":1741098760000,"contributors":[{"name":"叶子","email":"caofangqi@outlook.com","commits":1}]},"readingTime":{"minutes":2.26,"words":679},"filePathRelative":"notes/experience/take-wei-xin-database-secret-key.md","localizedDate":"2025年3月4日","excerpt":""}');export{r as comp,d as data};
