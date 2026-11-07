(() => {
  const V = window.APP_VERSION || 1;
  // 랜딩 페이지 iframe 안에 넣을 때(?embed): 버전 표시·힌트 숨김, 솔루션 단계부터 시작, 높이를 부모에 알림
  const EMBED = new URLSearchParams(location.search).has("embed");
  if (EMBED) document.documentElement.classList.add("embed");
  const ROOM = "주말 풋살 모임";

  // ───────── 아이콘 ─────────
  const P = {
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    imgoff: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><circle cx="9" cy="9.5" r="1.4"/><path d="M4 17l5-5 4 4 2.5-2.5 4.5 4.5"/><path d="M3 3l18 18"/>',
    img: '<rect x="3.5" y="4.5" width="17" height="15" rx="3"/><circle cx="9" cy="9.5" r="1.4"/><path d="M4 17l5-5 4 4 2.5-2.5 4.5 4.5"/>',
    cloud: '<path d="M7.5 18.5a4.5 4.5 0 01-.6-8.96A6 6 0 0118.4 11a3.75 3.75 0 01-.4 7.5z"/><path d="M9.5 14l2 2 3.5-3.5"/>',
    folder: '<path d="M3.5 7.5a2 2 0 012-2h4l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2h-13a2 2 0 01-2-2z"/>',
    file: '<path d="M7 3.5h7l4.5 4.5v12a1 1 0 01-1 1H7a1 1 0 01-1-1v-15.5a1 1 0 011-1z"/><path d="M14 3.5V8h4.5"/>',
    link: '<path d="M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1-1"/>',
    cal: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
    users: '<circle cx="9" cy="8.5" r="3.5"/><path d="M2.5 19.5c.8-3.5 3.4-5 6.5-5s5.7 1.5 6.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14.2c2.3 0 4 1.3 4.5 4.3"/>',
    user: '<circle cx="12" cy="9" r="4"/><path d="M4.5 20c1-4 4-5.5 7.5-5.5s6.5 1.5 7.5 5.5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.8v.4"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    restore: '<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4.5h4.5"/>',
    storage: '<rect x="4" y="5" width="16" height="6" rx="1.5"/><rect x="4" y="13" width="16" height="6" rx="1.5"/>',
    devices: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
    star: '<path d="M12 4l2.4 5 5.4.6-4 3.7 1.1 5.3L12 16l-4.9 2.6 1.1-5.3-4-3.7 5.4-.6z"/>',
    sheet: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M4 15h16M10 4v16"/>',
    stack: '<rect x="4" y="8" width="16" height="12" rx="2.5"/><path d="M7 5h10"/>',
    person: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="9" cy="11" r="2.2"/><path d="M5.8 16.5c.6-1.7 1.8-2.5 3.2-2.5s2.6.8 3.2 2.5M14.5 10h4M14.5 13.5h3"/>',
    bubble: '<path d="M12 4C7 4 3 7.1 3 11c0 2.4 1.5 4.5 3.9 5.8L6 20l3.7-2.2c.7.1 1.5.2 2.3.2 5 0 9-3.1 9-7s-4-7-9-7z"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="m17 10 4-2.5v9L17 14z"/>',
    monitor: '<rect x="3" y="4" width="18" height="12.5" rx="2"/><path d="M9 20.5h6M12 16.5v4"/>',
    tray: '<path d="M4 13h4.5l1.5 2.5h4l1.5-2.5H20v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M6 4h12l2 8"/><path d="M4 12l2-8"/>',
  };
  const ic = (n, extra = "") => `<svg class="i" viewBox="0 0 24 24" ${extra}>${P[n]}</svg>`;

  const status = (dark = true) => `<div class="status" style="color:${dark ? "#fff" : "#111"}"><span>9:41</span><span class="dots">
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="6" width="3" height="6" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
    <span class="bat"></span></span></div>`;

  // ───────── 썸네일 (보내주실 이미지로 교체 예정) ─────────
  const th = (k, opt = {}) => {
    if (opt.exp) return `<div class="th exp" ${opt.hot ? 'data-hs="expired"' : ""}>${ic("imgoff")}</div>`;
    const badge = opt.badge ? `<svg class="badge" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">${P.cloud}</svg>` : "";
    if (k === "lineup") return `<div class="th lineup"><i>${"<b></b>".repeat(12)}</i>${badge}</div>`;
    if (k === "field") return `<div class="th field">${badge}</div>`;
    const glyph = { c1: "img", c2: "user", c3: "star", c4: "users", c5: "img" }[k];
    return `<div class="th ${k}">${ic(glyph)}${badge}</div>`;
  };

  // ───────── 화면 ─────────
  const S = {};

  S.chat = () => `<div class="screen dark" id="s-chat">${status()}
    <div class="topbar">${ic("back")}<div class="title">${ROOM}<em>12</em></div>${ic("search")}<span data-hs="menu">${ic("menu")}</span></div>
    <div class="chat-body">
      <div class="datepill">2026년 10월 31일 토요일</div>
      <div class="msg"><div class="av" style="background:#6E747C"></div><div><div class="name">친구 A</div>
        <div class="photo-bub">${th("lineup")}</div></div></div>
      <div class="msg"><div class="av" style="background:#857D90"></div><div><div class="name">친구 B</div>
        <div class="bub">오늘 라인업 올렸어요 ⚽️</div></div></div>
      <div class="msg"><div class="av" style="background:#6D8091"></div><div><div class="name">친구 C</div>
        <div class="bub">근데 8월 대회 때 사진 누가 갖고 있어요?</div></div></div>
      <div class="msg me"><div class="bub">단톡방에 올라왔던 것 같은데 찾아볼게요!</div></div>
    </div>
    <div class="inputbar">${ic("x", 'style="transform:rotate(45deg);color:#888"')}<div>메시지 입력</div></div>
  </div>`;

  S.menu = () => `<div class="screen dark" id="s-menu">${S.chat().replace(/^<div class="screen dark" id="s-chat">/, "").replace(/<\/div>$/, "").replace('data-hs="menu"', "")}
    <div class="dim"></div>
    <div class="drawer">
      <h3>채팅방 서랍</h3>
      <div data-hs="photos"><div class="drow">${ic("img")}사진/동영상<span class="more">›</span></div>
      <div class="dthumbs">${th("lineup")}${th("field")}${th("c2")}${th("lineup")}</div></div>
      <div class="drow">${ic("file")}파일</div>
      <div class="drow">${ic("link")}링크</div>
      <div class="drow">${ic("cal")}일정</div>
      <div class="dsep"></div>
      <div class="drow">${ic("users")}대화상대 12</div>
    </div>
  </div>`;

  const sections = [
    ["2026. 10. 31", ["lineup", "c2", "c1"]],
    ["2026. 10. 25", ["lineup", "field"]],
    ["2026. 10. 17", ["c4", "lineup", "c5"]],
    ["2026. 10. 3", ["field", "c3"]],
    ["2026. 9. 27", ["c1", "lineup", "c2"]],
  ];
  const expiredSections = [
    ["2026. 9. 10", 3],
    ["2026. 8. 30", 1],
    ["2026. 8. 15", 5],
  ];
  S.grid = () => `<div class="screen dark" id="s-grid">${status()}
    <div class="topbar">${ic("x")}<div class="center">${ROOM}</div>${ic("search")}</div>
    <div class="tabs"><div class="on">사진/동영상</div><div>파일</div><div>링크</div></div>
    <div class="gscroll">
      <div class="meta"><span>95개 / 144.0 MB</span><span>관리</span></div>
      ${sections.map(([d, ks]) => `<div class="gdate">${d}</div><div class="grid3">${ks.map(k => th(k)).join("")}</div>`).join("")}
      ${expiredSections.map(([d, n], si) => `<div class="gdate" ${si === 0 ? 'id="exp-anchor"' : ""}>${d}</div><div class="grid3">${
        Array.from({ length: n }, (_, i) => th("", { exp: true, hot: si === 1 && i === 0 })).join("")}</div>`).join("")}
    </div>
  </div>`;

  S.oldExpired = () => `<div class="screen black" id="s-oldExpired">${status()}
    <span class="x-abs">${ic("x")}</span>
    <div class="center-col">
      <span style="color:#fff">${ic("imgoff", 'style="width:36px;height:36px"')}</span>
      <p>미디어 저장 기간이 만료되었어요.<br>톡 데이터를 자동으로 백업해주는 톡클라우드를 이용해 보세요.</p>
      <button class="pill" data-hs="learn">더 알아보기</button>
    </div>
  </div>`;

  // 구독한 뒤 다시 본 만료 화면: 톡클라우드 안내 없이 만료 문구만
  S.oldExpiredAfter = () => `<div class="screen black" id="s-oldExpiredAfter">${status()}
    <span class="x-abs">${ic("x")}</span>
    <div class="center-col">
      <span style="color:#fff">${ic("imgoff", 'style="width:36px;height:36px"')}</span>
      <p>미디어 저장 기간이 만료되었어요.</p>
    </div>
  </div>`;

  const oldFeature = (icn, color, t, s) => `<div class="fcard"><div class="ic" style="background:${color}">${ic(icn)}</div><div><b>${t}</b><span>${s}</span></div></div>`;
  S.oldSub = () => `<div class="screen light" id="s-oldSub">${status(false)}
    <div class="topbar"><span data-hs="close">${ic("x")}</span><div class="center">톡클라우드</div><span style="width:22px"></span></div>
    <div class="sub-head">카카오톡 대화와 사진을<br>자동으로 백업하세요</div>
    <div class="fcards">
    ${oldFeature("restore", "#7FA4EE", "<em>14개</em> 채팅방을 언제나 쓰던 그대로", "기기를 변경하거나 분실해도 새로 설치한 톡에서 그대로 복원해요")}
    ${oldFeature("storage", "#7FD08E", "기기 용량을 <em>9.3GB</em> 줄이고 쾌적하게", "백업된 데이터는 기기 용량을 차지하지 않도록 자동으로 가볍게 유지해줘요")}
    ${oldFeature("img", "#6CB4E6", "그동안 사라진 <em>162개</em> 사진, 동영상", "앞으로 주고받는 사진, 동영상, 파일은 자동 백업되어 사라질 걱정 없어요")}
    ${oldFeature("monitor", "#A3ADB8", "모든 기기의 톡에서 같은 내용으로", "서브 기기에서도 데이터를 복원해 동일한 톡을 확인할 수 있어요")}
    </div>
    <div class="sheet" data-hs="sheet">
      <div class="handle"></div>
      <p style="text-align:center;font-size:13px;font-weight:600;margin-bottom:14px">연간 결제로 <span style="color:#7B61FF">할인 혜택</span>을 받아보세요!</p>
      <div class="plan"><div class="row1"><b>30GB</b><span>가볍게 시작해보세요</span></div><div class="radio"><i></i>매월 2,900원</div></div>
      <div class="plan sel"><div class="row1"><b>50GB</b><span>많이 선택하는 용량이에요</span></div>
        <div class="radio"><i class="on"></i>매월 3,900원</div>
        <div class="radio"><i></i>매년 43,000원 <s>46,800원</s><span class="tag">월 3,583원 수준</span></div></div>
      <div class="terms"><span>톡클라우드 필수 약관 전체 보기</span><span>⌄</span></div>
      <button class="ybtn" data-hs="subscribe">필수 약관 동의하고 정기 구독하기</button>
    </div>
  </div>`;

  S.oldDone = () => `<div class="screen" id="s-oldDone" style="background:#F7F7F7;color:#111">${status(false)}
    <div class="xd"><div class="xd-ic">${ic("check")}</div>
      <h3>톡클라우드 구독을<br>시작했어요</h3>
      <p>지금부터 대화와 사진을 자동으로 백업해요.</p></div>
    <div class="nfoot"><button class="ybtn" data-hs="ok">확인</button></div>
  </div>`;

  S.problem = () => `<div class="screen light" id="s-problem">${status(false)}
    <div class="prob">
      <h3>들어오는 길은 있지만,<br>무엇을 해주는지는 모른 채 떠나요</h3>
      <div class="pcard"><div class="n">1</div><div><b>왜 사라졌는지 설명이 없어요</b><span>"만료"라는 말만 있고, 톡서랍이 있었다면 어땠을지 알 수 없어요.</span></div></div>
      <div class="pcard"><div class="n">2</div><div><b>지난 사진이 돌아오는 줄 오해해요</b><span>구독하면 이 사진을 다시 볼 수 있다고 기대하게 돼요.</span></div></div>
      <div class="pcard"><div class="n">3</div><div><b>톡서랍을 보기 전에 결제부터</b><span>요금 시트가 기능을 덮고, 모아보기·정리 같은 기능은 보이지 않아요.</span></div></div>
      <div class="result">결과적으로 톡서랍을 <b>'자동 백업'</b>으로만 기억하고,<br>"필요한 게 없다"며 원래 쓰던 드라이브로 돌아가요.</div>
    </div>
  </div>`;

  S.s1intro = () => `<div class="screen" id="s-s1intro"><div class="divider">
    <small>${V === 1 ? "SOLUTION A" : V === 2 ? "SOLUTION B" : "SOLUTION C"}</small>
    <h3>${V === 1 ? "만료 화면이\n상황을 설명하게" : V === 2 ? "결제하기 전에\n톡서랍을 먼저 보여주게" : "잃은 것을 먼저 알리고\n톡서랍을 보여주게"}</h3>
    <p>${V === 3 ? "같은 회색 사진에서 시작해요.\n만료 화면은 그대로 두고, '더 알아보기' 다음에\n사라진 사진·파일 수 → 톡서랍 기능 → 구독 순서로 보여줘요." : V === 1 ? "같은 회색 사진에서 시작해요.\n무엇을 잃었는지 → 톡서랍이었다면 → 앞으로는\n순서로 말하도록 만료 화면을 바꿨어요." : "같은 회색 사진에서 시작해요.\n만료 화면은 그대로 두고, '더 알아보기' 다음에\n결제 화면 대신 톡서랍 온보딩을 먼저 보여줘요."}</p>
    <button class="go" data-hs="start">솔루션 보기</button>
  </div></div>`.replace(/\n/g, "<br>").replace(/<br>\s*</g, "<").replace(/>\s*<br>/g, ">");

  // ───────── 솔루션 A: 만료 화면 (Xcode ExpiredMediaView) ─────────
  const xstep = (n, t) => `<p class="xc-step"><i>${n}</i>${t}</p>`;
  const xfeat = (i, t) => `<p class="xc-feat">${ic(i)}${t}</p>`;
  S.newExpired = () => `<div class="screen black" id="s-newExpired">${status()}
    <div class="xc-head"><span class="xc-x">${ic("x")}</span><div><b>${ROOM}</b><small>8월 30일에 받은 사진</small></div><span class="xc-sp"></span></div>
    <div class="xc-scroll">
      <section data-xcs="1">${xstep(1, "사라진 사진")}
        <div class="xc-lostbox">${ic("imgoff")}<small>보관 기간 만료</small></div>
        <h3>8월 30일 ${ROOM}에서<br>받은 사진이에요</h3>
        <p class="xc-body">채팅방 사진·동영상은 보관 기간이 지나면 다시 열 수 없어요. 이 사진도 기간이 지나 볼 수 없게 됐어요.</p>
        <div class="xc-chip"><span class="xc-stack">${("<i>" + ic("imgoff") + "</i>").repeat(4)}</span><span>이 채팅방에서만 <b>9개</b>가 사라졌어요</span></div>
      </section>
      <section data-xcs="2">${xstep(2, "톡서랍이 있었다면")}
        <h3>톡서랍에 보관했다면<br>지금도 다시 꺼내볼 수 있었어요</h3>
        <div class="xc-mini"><p class="xc-minihead">${ic("bubble")}톡서랍 · ${ROOM}<em>예시 화면</em></p>
          <div class="xc-grid3">${["lineup", "field", "c1", "c2", "lineup", "c3"].map(k => th(k, { badge: true })).join("")}</div>
          <p class="xc-blue">${ic("cloud")}보관 기간과 상관없이 그대로 열려요</p></div>
        ${xfeat("stack", "채팅방별로 사진·파일·링크를 한곳에 모아보기")}${xfeat("person", "인물·태그로 원하는 사진 바로 찾기")}${xfeat("folder", "드라이브처럼 폴더로 파일 정리하기")}
      </section>
      <section data-xcs="3">${xstep(3, "앞으로는")}
        <h3>지난 사진은 되돌릴 수 없지만,<br>앞으로 받는 사진은 지킬 수 있어요</h3>
        <p class="xc-body">톡클라우드를 구독한 날부터 주고받는 사진·동영상·파일이 톡서랍에 보관돼요.</p>
        <p class="xc-info">${ic("info")}구독 전에 만료된 사진은 복구되지 않아요</p>
      </section>
    </div>
    <div class="xc-cta"><button class="ybtn" data-hs="cta">앞으로 받는 사진 보관하기</button><button class="tbtn xc-sub">다음에 할게요</button></div>
  </div>`;

  // ───────── 솔루션 C: 사라진 사진·파일 ─────────
  S.lost = () => `<div class="screen black" id="s-lost">${status()}
    <div class="xl-nav"><span>${ic("x")}</span></div>
    <div class="xl-body">
      <span class="xl-pill">${ic("imgoff")}보관 기간 만료</span>
      <h3>지금까지 사진·동영상 <em>162개</em>,<br>파일 <em>11개</em>가 사라졌어요</h3>
      <p class="xl-sub">채팅방 사진·동영상·파일은 보관 기간이 지나면<br>더 이상 열 수 없어요.</p>
      <div class="xl-grid">${Array.from({ length: 11 }, () => th("", { exp: true })).join("")}<div class="xl-more">+162</div></div>
      <div class="xl-rows">
        <p><span>${ROOM}</span><b>사진 9 · 파일 2</b></p>
        <p><span>그 외 채팅방 13곳</span><b>사진 153 · 파일 9</b></p>
      </div>
      <div class="xl-warn">${ic("info")}<div><b>사라진 사진과 파일은 다시 복구할 수 없어요</b><span>지금 구독해도 이미 만료된 사진은 돌아오지 않아요.</span></div></div>
    </div>
    <div class="nfoot"><p class="xl-bridge">톡서랍에 보관했다면 지금도 볼 수 있었어요</p><button class="ybtn" data-hs="next">톡서랍 알아보기</button></div>
  </div>`;

  // ───────── 요금 시트 (Xcode PricingSheet) ─────────
  S.pricing = () => `<div class="screen ${V !== 2 ? "black" : ""}" id="s-pricing" ${V === 2 ? 'style="background:#F4F4F5;color:#111"' : ""}>${(V === 1 ? S.newExpired() : V === 3 ? S.ob4() : S.intro()).replace(/^<div class="screen[^"]*" id="[^"]+"[^>]*>/, "").replace(/<\/div>$/, "").replace(/data-hs="[^"]+"/g, "")}
    <div class="dim"></div>
    <div class="xp">
      <i class="xp-grab"></i>
      <h3>앞으로 받는 사진부터<br>톡서랍에 보관돼요</h3>
      <p class="xp-info">${ic("info")}구독 전에 만료된 사진은 복구되지 않아요</p>
      <p class="xp-promo"><i>%</i>연간 결제로 <em>할인 혜택</em>을 받아보세요!</p>
      <div class="xp-card"><div class="r1"><b>30GB</b><small>가볍게 시작해보세요</small></div><div class="xp-radio"><i></i>매월 2,900원</div></div>
      <div class="xp-card sel"><div class="r1"><b>50GB</b><small>많이 선택하는 용량이에요</small></div>
        <div class="xp-radio"><i class="on"></i>매월 3,900원</div>
        <div class="xp-radio"><i></i>매년 43,000원 <s>46,800원</s><em>월 3,583원 수준</em></div></div>
      <div class="xp-fill"></div>
      <p class="xp-terms">${V === 3 ? "톡서랍" : "톡클라우드"} 필수 약관 전체 보기<span>⌄</span></p>
      <button class="ybtn" data-hs="subscribe">필수 약관 동의하고 정기 구독하기</button>
    </div>
  </div>`;

  // ───────── 완료 (Xcode doneView) ─────────
  S.done = () => `<div class="screen" id="s-done" style="background:#F7F7F7;color:#111">${status(false)}
    <div class="xd"><div class="xd-ic">${ic("cloud")}</div>
      <h3>이제부터 ${ROOM} 사진도<br>톡서랍에 보관돼요</h3>
      <p>채팅방 상단 클라우드 아이콘에서 언제든 꺼내볼 수 있어요.</p></div>
    <div class="nfoot"><button class="ybtn" data-hs="ok">확인</button></div>
  </div>`;

  // ───────── 솔루션 B: 온보딩 5장 (Xcode DrawerTourView) ─────────
  const obPages = [
    { tag: "톡서랍", title: "카톡 사진·파일을<br>모아두는 서랍이에요", body: "채팅방에서 주고받은 사진·동영상·파일·링크를<br>한곳에 보관하고 꺼내볼 수 있어요.",
      card: `<div class="xo-hero"><div class="xo-icons">${[["#6F87A6", "img"], ["#A97670", "file"], ["#6F917C", "link"], ["#857D90", "video"]].map(([c, g]) => `<i style="background:${c}">${ic(g)}</i>`).join("")}</div><span class="xo-arrow">↓</span><div class="xo-tray">${ic("tray")}톡서랍</div></div>` },
    { tag: "보관", title: "채팅방 사진,<br>기간이 지나도 그대로", body: "구독한 날부터 주고받는 사진·동영상·파일이<br>톡서랍에 보관돼요.",
      card: `<p class="xc-minihead">${ic("bubble")}톡서랍 · ${ROOM} · 사진/동영상</p><div class="xc-grid3">${["lineup", "field", "c1", "c2", "lineup", "c3", "c4", "field", "c5"].map(k => th(k)).join("")}</div>` },
    { tag: "찾기", title: "사람·태그로<br>원하는 사진을 바로", body: "자주 등장하는 사람별로 묶어주고,<br>동영상·GIF·풍경 같은 태그로 걸러줘요.",
      card: `<p class="xc-minihead">${ic("bubble")}인물 분류</p><div class="xo-people">${[["#6E747C", "나"], ["#857D90", "친구 A"], ["#6D8091", "친구 B"], ["#6F8A80", "친구 C"]].map(([c, n]) => `<div><i style="background:${c}">${ic("user")}</i>${n}</div>`).join("")}</div><div class="xo-tags">${["전체", "동영상", "GIF", "사람", "풍경"].map(t => `<span class="${t === "사람" ? "on" : ""}">${t}</span>`).join("")}</div><div class="xc-grid3">${["c2", "c4", "c5"].map(k => th(k)).join("")}</div>` },
    { tag: "정리", title: "드라이브처럼<br>폴더로 정리해요", body: "받은 파일을 내려받지 않고 톡 안에서 폴더로 정리하고,<br>중요한 파일은 따로 모아봐요.",
      card: `<p class="xc-minihead">${ic("bubble")}내 드라이브</p><div class="xo-row">${ic("folder")}<span>경기 사진</span><small>12개</small></div><div class="xo-row">${ic("folder")}<span>회비 정산</span><small>4개</small></div><hr class="xo-hr"><div class="xo-file"><i style="background:#6F917C"></i><span>참가비 정리.xlsx<small>8.2KB</small></span></div><div class="xo-file"><i style="background:#A97670"></i><span>경기 일정표.pdf<small>1.2MB</small></span></div><p class="xo-star"><b>★</b> 중요 표시 파일 모아보기</p>` },
    V === 3
      ? { tag: "복원", title: "구독한 뒤의 톡은<br>기기를 바꿔도 그대로", body: "구독한 날부터 주고받은 대화와 사진은<br>폰을 바꾸거나 잃어버려도 새 톡에 복원돼요.",
        card: `<div class="xo-dev"><div class="xo-phones"><i class="ph"></i><span>→</span><i class="ph"></i><i class="pad"></i></div><em>구독한 날부터 대화 · 사진 자동 보관</em></div>` }
      : { tag: "복원", title: "기기를 바꿔도<br>같은 톡 그대로", body: "폰을 바꾸거나 잃어버려도<br>새로 설치한 톡에 그대로 복원돼요.",
        card: `<div class="xo-dev"><div class="xo-phones"><i class="ph"></i><span>→</span><i class="ph"></i><i class="pad"></i></div><em>모든 채팅방 · 대화 백업 완료</em></div>` },
  ];
  obPages.forEach((pg, i) => {
    const last = i === obPages.length - 1;
    S["ob" + i] = () => `<div class="screen black" id="s-ob${i}">${status()}
      <div class="xo-top">
        <div class="xo-prog">${obPages.map((_, j) => `<i class="${j <= i ? "on" : ""}"></i>`).join("")}</div>
        <div class="xo-row1"><span class="xo-x">${ic("x")}</span><span>${i + 1} / ${obPages.length}</span><span class="xo-skip" style="${last ? "visibility:hidden" : ""}">건너뛰기</span></div>
      </div>
      <div class="xo-card">${pg.card}</div>
      <div class="xo-text"><span class="xo-tag">${pg.tag}</span><h3>${pg.title}</h3><p>${pg.body}</p></div>
      <div class="nfoot"><button class="ybtn" data-hs="next">${last ? (V === 3 ? "톡서랍 구독하기" : "톡클라우드 알아보기") : "다음"}</button>${last ? '<button class="tbtn">나중에 할게요</button>' : ""}</div>
    </div>`;
  });

  // ───────── 솔루션 B: 톡클라우드 안내 페이지 (Xcode CloudIntroView) ─────────
  S.intro = () => {
    const tabs = [["keep", "보관", "cloud"], ["find", "찾기", "person"], ["organize", "정리", "folder"], ["restore", "복원", "restore"]];
    const block = (id, label, icon, title, desc, mock, note) => `<article class="xi-block" data-topic="${id}"><p class="xi-label">${ic(icon)}${label}</p><h4>${title}</h4><p class="xi-desc">${desc}</p><div class="xi-mock">${mock}</div>${note ? `<p class="xi-note">${ic("info")}${note}</p>` : ""}</article>`;
    const g2 = (ks, exp) => `<div class="xi-g2">${ks.map((k, i) => exp && i >= 2 ? th("", { exp: true }) : th(k)).join("")}</div>`;
    const keepMock = `<div class="xi-ba"><div><h5>지금 카톡</h5>${g2(["lineup", "c2"], true)}<small>기간 지나면 못 열어요</small></div><span class="xi-arr">→</span><div><h5 class="on">톡클라우드</h5>${g2(["lineup", "c2", "field", "c1"], false)}<small>기간 지나도 그대로</small></div></div>`;
    const findMock = `<p class="xc-minihead">${ic("bubble")}인물 분류</p><div class="xo-people">${[["#6E747C", "나"], ["#857D90", "친구 A"], ["#6D8091", "친구 B"], ["#6F8A80", "친구 C"]].map(([c, n]) => `<div><i style="background:${c}">${ic("user")}</i>${n}</div>`).join("")}</div><div class="xo-tags">${["전체", "동영상", "GIF", "사람", "풍경"].map(t => `<span class="${t === "사람" ? "on" : ""}">${t}</span>`).join("")}</div><div class="xc-grid3">${["c2", "c4", "c5"].map(k => th(k)).join("")}</div>`;
    const orgMock = `<p class="xc-minihead">${ic("bubble")}내 드라이브</p><div class="xo-row">${ic("folder")}<span>경기 사진</span><small>12개</small></div><div class="xo-row">${ic("folder")}<span>회비 정산</span><small>4개</small></div><hr class="xo-hr"><div class="xo-file"><i style="background:#6F917C"></i><span>참가비 정리.xlsx<small>8.2KB</small></span></div><div class="xo-file"><i style="background:#A97670"></i><span>경기 일정표.pdf<small>1.2MB</small></span></div><p class="xo-star"><b>★</b> 중요 표시 파일 모아보기</p>`;
    const restoreMock = `<div class="xo-dev xi-dev"><div class="xo-phones"><i class="ph"></i><span>→</span><i class="ph"></i><i class="pad"></i></div><em>모든 채팅방 · 대화 백업 완료</em></div><div class="xi-store"><p><span>기기 저장공간</span><b>8.4GB 확보</b></p><div class="xi-bar"><i class="a"></i><i class="b"></i></div><p class="xi-leg"><span><i class="a"></i>앱·시스템</span><span><i class="b"></i>톡클라우드로 옮긴 카톡 데이터</span></p></div>`;
    const row = (l, o, t, h) => `<div class="xi-crow ${h ? "head" : ""}"><span>${l}</span><b>${o}</b><em>${t}</em></div>`;
    return `<div class="screen" id="s-intro" style="background:#F4F4F5;color:#111">${status(false)}
      <div class="xi-nav">${ic("x")}<h4>${ic("bubble")}톡클라우드</h4><span style="width:22px"></span></div>
      <div class="xi-tabs">${tabs.map(([id, l, i]) => `<span data-topic="${id}" class="${id === "keep" ? "on" : ""}">${ic(i)}${l}</span>`).join("")}</div>
      <div class="xi-scroll">
        <div class="xi-hero"><h3>카카오톡 사진·파일,<br>사라지지 않고 찾기 쉽게</h3><p>톡클라우드는 카톡에서 주고받은 사진·파일을<br>보관하고, 모아보고, 정리하는 카톡 전용 저장공간이에요.</p></div>
        ${block("keep", "보관", "cloud", "채팅방 사진이<br>기간이 지나도 사라지지 않아요", "지금은 시간이 지나면 채팅방 사진·동영상을 다시 열 수 없어요. 톡클라우드를 쓰면 구독한 날부터 주고받는 사진·동영상·파일이 자동으로 보관돼요.", keepMock, "구독 전에 만료된 사진은 복구되지 않아요")}
        ${block("find", "찾기", "person", "여러 방에 흩어진 사진,<br>사람·태그로 바로 찾아요", "채팅방마다 흩어진 사진을 한곳에 모아, 자주 등장하는 사람별로 묶고 동영상·GIF·풍경 같은 태그로 걸러줘요.", findMock)}
        ${block("organize", "정리", "folder", "카톡에서 받은 파일,<br>드라이브처럼 폴더로", "받은 파일을 내려받아 다른 곳에 옮길 필요 없어요. 톡 안에서 폴더를 만들어 정리하고, 중요한 파일은 따로 모아봐요.", orgMock)}
        ${block("restore", "복원", "restore", "폰을 바꿔도, 용량이 부족해도<br>톡은 그대로", "새 폰이나 서브 기기에서도 대화와 사진이 그대로 복원돼요. 보관된 데이터는 기기 용량을 차지하지 않아요.", restoreMock)}
        <article class="xi-block" data-topic="compare"><h4 class="xi-h">다른 드라이브와 뭐가 다른가요?</h4>${row("", "톡클라우드", "다른 드라이브", true)}${row("카톡 사진·파일 저장", "자동", "직접 내려받아 올리기")}${row("채팅방별 모아보기", "가능", "-")}${row("카톡 대화 복원", "가능", "-")}</article>
        <article class="xi-block"><h4 class="xi-h">자주 묻는 질문</h4><p class="xi-faq">Q. 구독 전에 사라진 사진도 돌아오나요?<i>⌄</i></p><p class="xi-faq">Q. 보관된 사진은 어디서 보나요?<i>⌄</i></p></article>
      </div>
      <div class="xi-bottom"><p><b>50GB</b><span>/ 매월 3,900원</span><em>요금제 보기 ⌃</em></p><button class="ybtn" data-hs="cta">요금제 선택하고 구독하기</button></div>
    </div>`;
  };

  S.end = () => `<div class="screen" id="s-end"><div class="end">
    <small>v${V} 요약</small>
    <h3>${V === 1 ? "만료 화면에서\n톡서랍을 이해시키기" : V === 2 ? "결제 전에\n톡서랍을 먼저 보여주기" : "잃은 것을 알린 뒤\n톡서랍을 보여주기"}</h3>
    <div class="chg">
      <div><b>Before</b>"만료" 한 줄 → 바로 결제 화면. 톡서랍을 '백업'으로만 기억</div>
      ${V === 1 ? "<div><b>Solution A · 만료 화면 재설계</b>무엇을 잃었는지, 톡서랍이었다면 어땠을지, 앞으로는 무엇이 보관되는지 한 화면에</div>" : ""}
      ${V === 3 ? "<div><b>Solution C · 잃은 것 → 기능 → 구독</b>'더 알아보기' 다음에 사라진 사진·파일 수와 복구할 수 없다는 사실을 먼저 알리고, 톡서랍 기능 5장을 보여준 뒤 구독으로 이어짐. 만료된 사진이 돌아온다고 오해하지 않도록 매 단계에서 '구독한 날부터'를 강조</div>" : ""}
      ${V === 2 ? "<div><b>Solution B · 결제 전 온보딩</b>만료 화면은 그대로 두고, '더 알아보기' 다음에 온보딩 5장과 톡클라우드 안내 페이지로 톡서랍을 먼저 보여줌</div>" : ""}
    </div>
    <button class="again" data-hs="again">처음부터 다시 보기</button>
  </div></div>`.replace(/(<h3>[^<]*)\n/g, "$1<br>");

  // ───────── 단계 ─────────
  const before = [
    { ph: "before", s: "chat", hot: "menu", t: "한 달 전 경기 사진을\n다시 찾으려 해요",
      b: "풋살 모임 단톡방에서 8월 대회 사진 이야기가 나왔어요.\n채팅방 메뉴(☰)를 눌러 서랍을 열어볼게요." },
    { ph: "before", s: "menu", hot: "photos", t: "채팅방 서랍 › 사진/동영상",
      b: "채팅방에서 주고받은 사진은 여기서 모아볼 수 있어요." },
    { ph: "before", s: "grid", hot: "expired", scroll: true, t: "오래된 사진이\n회색으로 바뀌어 있어요",
      b: "스크롤을 내리니 9월 10일 이전 사진은 아이콘만 남은 회색 칸이에요. 8월 30일에 올라온 대회 사진 한 장을 눌러볼게요." },
    { ph: "before", s: "oldExpired", hot: "learn", t: "\"미디어 저장 기간이\n만료되었어요\"",
      b: "왜 사라졌는지, 어떻게 했으면 지킬 수 있었는지는 알려주지 않고 톡클라우드 이름만 보여줘요.",
      th: "기간이 만료됐다고? 톡클라우드를 쓰면 이 사진을 다시 볼 수 있다는 건가?" },
    { ph: "before", s: "oldSub", peek: true, hot: "sheet", t: "더 알아보기를 누르자\n바로 결제 화면",
      b: "'자동 백업'과 '그동안 사라진 162개 사진, 동영상'이 나란히 보여요. 이미 사라진 사진이 돌아오는지는 말해주지 않아요.",
      th: "그동안 사라진 162개…? 구독하면 이걸 다시 볼 수 있다는 거구나." },
    { ph: "before", s: "oldSub", hot: "subscribe", t: "요금 시트가 올라오고\n바로 구독해요",
      b: "요금 시트가 기능 설명을 덮어요. 톡서랍에서 무엇을 할 수 있는지는 보지 못한 채 결제로 넘어가요.",
      th: "사진 찾으려면 어쩔 수 없지. 구독할게." },
    { ph: "before", s: "oldDone", hot: "ok", t: "구독 완료",
      b: "'지금부터 백업해요'라고만 하고, 이미 만료된 사진이 어떻게 되는지는 말하지 않아요." },
    { ph: "before", s: "grid", hot: "expired", scroll: true, t: "다시 채팅방 사진을\n열어봐요",
      b: "구독했으니 아까 그 사진을 볼 수 있을 거라 생각하고 다시 들어가요. 그런데 여전히 회색이에요.",
      th: "구독했는데 왜 아직 회색이지?" },
    { ph: "before", s: "oldExpiredAfter", t: "구독한 뒤에도\n만료 화면",
      b: "만료된 사진은 구독과 상관없이 돌아오지 않아요. 사용자는 결제한 뒤에야 그 사실을 알게 돼요.",
      th: "돈까지 냈는데 결국 못 보는 거였어? 그럼 '사라진 162개'는 왜 보여준 거지…" },
    { ph: "problem", s: "problem", t: "톡서랍에 들어올 수는 있지만,\n무엇을 해주는지는 몰라요",
      b: "사용자 인터뷰에서도 톡서랍은 '백업'으로만 기억됐고, 정리·모아보기 기능은 알지 못했어요.",
      q: ["카피 문구 봤을 때 사진이나 대화, 문서 다 보존된다… 이것만 기억에 남았어요.",
          "(드라이브로 파일 정리할 수 있는 거 아셨어요?) 아뇨, 아예 몰랐어요.",
          "모르겠어요, 필요한 게 없어서."] },
  ];
  const sol1 = [
    { ph: "s1", s: "s1intro", hot: "start", t: V === 1 ? "Solution A" : V === 2 ? "Solution B" : "Solution C",
      b: "같은 상황, 같은 회색 사진에서 다시 시작해요." },
    { ph: "s1", s: "grid", hot: "expired", scroll: true, t: "같은 회색 사진을 눌러요", b: "들어오는 경로는 그대로 두고, 그 다음 화면을 바꿨어요." },
    { ph: "s1", s: "newExpired", xcs: 1, t: "① 사라진 사진",
      b: "어떤 사진이, 왜 사라졌는지 먼저 말해요. 이 채팅방에서 같은 이유로 사라진 사진이 몇 개인지도 함께 보여줘요." },
    { ph: "s1", s: "newExpired", xcs: 2, t: "② 톡서랍이 있었다면",
      b: "같은 사진이 톡서랍에 보관된 모습을 예시로 보여주고, 모아보기 · 찾기 · 정리 기능을 짚어줘요. '백업'만으로 기억되지 않게요." },
    { ph: "s1", s: "newExpired", xcs: 3, hot: "cta", t: "③ 앞으로는",
      b: "지난 사진은 되돌릴 수 없고, 구독한 날부터 보관된다는 점을 먼저 말해 오해를 막아요." },
  ];
  const sol2 = [
    { ph: "s1", s: "ob0", hot: "next", t: "결제 전에\n톡서랍을 먼저 보여줘요",
      b: "'더 알아보기' 다음에 요금 화면 대신 온보딩 다섯 장이 나와요. 첫 장은 톡서랍이 무엇인지부터." },
    { ph: "s1", s: "ob1", hot: "next", t: "보관: 기간이 지나도 그대로",
      b: "방금 잃은 것과 같은 채팅방 사진이 톡서랍에선 그대로 열리는 모습을 보여줘요." },
    { ph: "s1", s: "ob2", hot: "next", t: "찾기: 사람·태그로",
      b: "여러 방에 흩어진 사진을 사람별로 묶어 보여줘요. 백업 이상의 쓰임을 처음 알게 되는 장이에요." },
    { ph: "s1", s: "ob3", hot: "next", t: "정리: 드라이브처럼 폴더로",
      b: "인터뷰에서 \"아예 몰랐다\"던 드라이브 정리 기능을 보여줘요." },
    { ph: "s1", s: "ob4", hot: "next", t: "복원: 기기를 바꿔도",
      b: "폰을 바꾸거나 잃어버려도 그대로 복원된다는 것까지 보여주고, 톡클라우드 안내 페이지로 이어져요." },
    { ph: "s1", s: "intro", xis: "keep", t: "결제 화면 대신\n톡클라우드 안내 페이지",
      b: "원래 바로 뜨던 결제 화면 자리에 안내 페이지를 둬요. 보관 · 찾기 · 정리 · 복원 탭으로 기능을 하나씩 보여주고, 요금은 하단 바에 접어둬요." },
    { ph: "s1", s: "intro", xis: "organize", t: "몰랐던 기능을\n화면으로",
      b: "인터뷰에서 \"아예 몰랐다\"던 사람·태그 찾기와 드라이브 정리를 실제 화면 목업으로 보여줘요." },
    { ph: "s1", s: "intro", xis: "compare", hot: "cta", t: "다른 드라이브와 비교한 뒤\n요금을 선택해요",
      b: "자동 저장 · 채팅방별 모아보기 · 대화 복원의 차이를 표로 보여준 다음, 하단 바에서 요금 시트를 열어요." },
  ];
  const tail = [
    { ph: "s1", s: "pricing", hot: "subscribe", t: "요금 시트도\n기대치를 맞춰요",
      b: "'앞으로 받는 사진부터 보관돼요'를 제목으로 두고, 구독 전 사진은 복구되지 않는다는 점을 함께 보여줘요." },
    { ph: "s1", s: "done", hot: "ok", t: "어디서 다시 꺼내보는지까지",
      b: "구독을 마치면 보관된 사진을 어디서 볼 수 있는지 알려줘요." },
    { ph: "end", s: "end", hot: "again", t: `v${V} 정리`, b: "처음부터 다시 보거나, 위 단계 버튼으로 원하는 부분만 볼 수 있어요." },
  ];
  const solB = [
    sol1[0],
    sol1[1],
    { ph: "s1", s: "oldExpired", hot: "learn", t: "만료 화면은\n그대로예요",
      b: "막히는 화면은 Before와 같아요. 달라지는 건 '더 알아보기'를 누른 다음부터예요." },
    ...sol2,
  ];
  const solC = [
    sol1[0],
    sol1[1],
    { ph: "s1", s: "oldExpired", hot: "learn", t: "만료 화면은\n그대로예요",
      b: "막히는 화면은 Before와 같아요. 달라지는 건 '더 알아보기'를 누른 다음부터예요." },
    { ph: "s1", s: "lost", hot: "next", t: "먼저, 무엇을 잃었는지",
      b: "지금까지 사라진 사진·파일 수를 보여주고, 다시 복구할 수 없다는 점을 분명히 말해요. 구독하면 돌아온다는 오해를 여기서 먼저 막아요.",
      th: "162개나 사라졌다고? 이제 다시는 못 보는구나…" },
    { ph: "s1", s: "ob0", hot: "next", t: "톡서랍은\n사진·파일을 모아두는 서랍",
      b: "잃은 것을 확인한 뒤에, 톡서랍이 무엇인지부터 보여줘요." },
    { ph: "s1", s: "ob1", hot: "next", t: "보관: 기간이 지나도 그대로",
      b: "구독한 날부터 주고받는 사진이 계속 보관된다는 점을 보여줘요." },
    { ph: "s1", s: "ob2", hot: "next", t: "찾기: 사람·태그로",
      b: "여러 방에 흩어진 사진을 사람별로 묶어 보여줘요. 백업 이상의 쓰임을 처음 알게 되는 장이에요." },
    { ph: "s1", s: "ob3", hot: "next", t: "정리: 어디에 보관되는지",
      b: "보관된 사진·파일이 '내 드라이브'에 폴더로 정리된다는 걸 보여줘요. 인터뷰에서 \"아예 몰랐다\"던 기능이에요." },
    { ph: "s1", s: "ob4", hot: "next", t: "복원: 구독한 뒤의 톡은 그대로",
      b: "'구독한 날부터'를 넣어, 이미 만료된 사진까지 복원된다고 읽히지 않게 했어요." },
  ];
  const steps = [...before, ...(V === 1 ? sol1 : V === 2 ? solB : solC), ...tail];

  const phases = [["before", "Before"], ["problem", "문제"], ["s1", V === 1 ? "Solution A" : V === 2 ? "Solution B" : "Solution C"], ["end", "정리"]];

  // ───────── 렌더 ─────────
  const app = document.getElementById("app");
  const DW = V === 3 ? 402 : 390, DH = V === 3 ? 874 : 844; // iPhone 18 Pro 기준(v3)
  app.innerHTML = `<div class="stage">
    <div class="panel">
      <div class="ver"><b>v${V}</b><span>${V === 1 ? "Before → Solution A" : V === 2 ? "Before → Solution B" : "Before → Solution C · iPhone 18 Pro"}</span></div>
      <div class="phases">${phases.map(([k, n]) => `<button data-ph="${k}">${n}</button>`).join("")}</div>
      <div class="count"></div>
      <div class="cap"></div>
      <div class="nav"><button class="prev">이전</button><button class="next">다음</button></div>
      <div class="hint">화면 속 버튼을 눌러도 넘어가요 · 키보드 ← →</div>
    </div>
    <div class="phone-wrap"><div class="device"></div></div>
  </div>`;

  const device = app.querySelector(".device");
  device.style.width = DW + "px"; device.style.height = DH + "px";
  const used = [...new Set(steps.map(s => s.s))];
  device.innerHTML = used.map(k => S[k]()).join("");

  let cur = 0;
  const cap = app.querySelector(".cap");
  const esc = s => s.replace(/\n/g, "<br>");

  function go(i) {
    cur = Math.max(0, Math.min(steps.length - 1, i));
    const st = steps[cur];
    device.querySelectorAll(".screen").forEach(el => el.classList.toggle("on", el.id === "s-" + st.s));
    device.querySelectorAll(".hot").forEach(el => el.classList.remove("hot"));
    const scr = device.querySelector("#s-" + st.s);
    // 애니메이션 재시작
    scr.querySelectorAll(".obcard,.drawer,.sheet,.xo-card,.xp").forEach(el => { el.style.animation = "none"; el.offsetHeight; el.style.animation = ""; });
    scr.classList.toggle("peek", !!st.peek);
    const g = scr.querySelector(".gscroll");
    if (g) {
      g.scrollTop = 0;
      if (st.scroll) setTimeout(() => {
        const a = g.querySelector("#exp-anchor");
        const target = a.offsetTop - 120;
        g.scrollTo({ top: target, behavior: "smooth" });
        setTimeout(() => { if (Math.abs(g.scrollTop - target) > 4) g.scrollTop = target; }, 900);
      }, 450);
    }
    const xi = scr.querySelector(".xi-scroll");
    if (xi && st.xis) {
      const tgt = xi.querySelector(`[data-topic="${st.xis}"]`);
      const top = st.xis === "keep" ? 0 : tgt.offsetTop - 8;
      xi.scrollTo({ top, behavior: "smooth" });
      setTimeout(() => { if (Math.abs(xi.scrollTop - Math.min(top, xi.scrollHeight - xi.clientHeight)) > 4) xi.scrollTop = top; }, 800);
      const tab = st.xis === "compare" ? "restore" : st.xis;
      scr.querySelectorAll(".xi-tabs [data-topic]").forEach(t => t.classList.toggle("on", t.dataset.topic === tab));
    }
    const xs = scr.querySelector(".xc-scroll");
    if (xs) {
      const sec = xs.querySelector(`[data-xcs="${st.xcs || 1}"]`);
      const top = st.xcs > 1 ? sec.offsetTop - 8 : 0;
      xs.scrollTo({ top, behavior: "smooth" });
      setTimeout(() => { if (Math.abs(xs.scrollTop - Math.min(top, xs.scrollHeight - xs.clientHeight)) > 4) xs.scrollTop = top; }, 800);
    }
    if (st.hot) {
      const h = scr.querySelector(`[data-hs="${st.hot}"]`);
      if (h) h.classList.add("hot");
    }
    app.querySelectorAll(".phases button").forEach(b => b.classList.toggle("on", b.dataset.ph === st.ph));
    app.querySelector(".count").textContent = `${cur + 1} / ${steps.length}`;
    cap.innerHTML = `<h2>${esc(st.t)}</h2>${st.b ? `<p>${esc(st.b)}</p>` : ""}
      ${st.li ? `<ul>${st.li.map(x => `<li>${x}</li>`).join("")}</ul>` : ""}
      ${st.th ? `<div class="thought"><div class="face">${ic("user")}</div><div><small>사용자 속마음</small><q>${st.th}</q></div></div>` : ""}
      ${st.q ? `<div class="quotes">${st.q.map(x => `<div>${x}”</div>`).join("")}<small>사용자 인터뷰 중</small></div>` : ""}`;
    app.querySelector(".prev").disabled = cur === 0;
    app.querySelector(".next").textContent = cur === steps.length - 1 ? "처음으로" : "다음";
    history.replaceState(null, "", location.search + "#" + (cur + 1));
    postHeight();
  }

  function postHeight() {
    if (!EMBED || parent === window) return;
    requestAnimationFrame(() => parent.postMessage({ tdEmbedHeight: app.querySelector(".stage").scrollHeight }, "*"));
  }

  device.addEventListener("click", e => {
    const h = e.target.closest("[data-hs]");
    if (!h || !h.classList.contains("hot")) return;
    if (h.dataset.hs === "again") go(0); else go(cur + 1);
  });
  app.querySelector(".prev").onclick = () => go(cur - 1);
  app.querySelector(".next").onclick = () => go(cur === steps.length - 1 ? 0 : cur + 1);
  app.querySelectorAll(".phases button").forEach(b => b.onclick = () => go(steps.findIndex(s => s.ph === b.dataset.ph)));
  document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") go(cur + 1);
    if (e.key === "ArrowLeft") go(cur - 1);
  });

  // 화면 크기에 맞게 폰 축소
  const wrap = app.querySelector(".phone-wrap");
  function fit() {
    const narrow = innerWidth <= 900;
    const maxH = narrow ? 9999 : (EMBED ? 780 : innerHeight - 48); // 삽입 모드는 iframe 높이가 내용에 따라 바뀌므로 고정값
    const maxW = narrow ? innerWidth - 24 : 9999;
    const s = Math.min(1, maxH / (DH + 20), maxW / (DW + 20));
    device.style.transform = `scale(${s})`;
    wrap.style.width = DW * s + "px";
    wrap.style.height = DH * s + "px";
    postHeight();
  }
  addEventListener("resize", fit);
  fit();

  const startAt = EMBED && !location.hash ? steps.findIndex(s => s.ph === "s1") : (parseInt(location.hash.slice(1)) || 1) - 1;
  go(startAt);
})();
