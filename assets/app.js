(() => {
  const V = window.APP_VERSION || 1;
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
        <div class="bub">근데 9월 대회 때 사진 누가 갖고 있어요?</div></div></div>
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
    ["2026. 8. 30", 2],
    ["2026. 8. 15", 4],
  ];
  S.grid = () => `<div class="screen dark" id="s-grid">${status()}
    <div class="topbar">${ic("x")}<div class="center">${ROOM}</div>${ic("search")}</div>
    <div class="tabs"><div class="on">사진/동영상</div><div>파일</div><div>링크</div></div>
    <div class="gscroll">
      <div class="meta"><span>95개 / 144.0 MB</span><span>관리</span></div>
      ${sections.map(([d, ks]) => `<div class="gdate">${d}</div><div class="grid3">${ks.map(k => th(k)).join("")}</div>`).join("")}
      ${expiredSections.map(([d, n], si) => `<div class="gdate" ${si === 0 ? 'id="exp-anchor"' : ""}>${d}</div><div class="grid3">${
        Array.from({ length: n }, (_, i) => th("", { exp: true, hot: si === 0 && i === 0 })).join("")}</div>`).join("")}
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

  const oldFeature = (icn, t, s) => `<div class="fcard"><div class="ic">${ic(icn)}</div><div><b>${t}</b><span>${s}</span></div></div>`;
  S.oldSub = () => `<div class="screen light" id="s-oldSub">${status(false)}
    <div class="topbar"><span data-hs="close">${ic("x")}</span><div class="center">톡클라우드</div><span style="width:22px"></span></div>
    <div class="sub-head">카카오톡 대화와 사진을<br>자동으로 백업하세요</div>
    ${oldFeature("restore", "<em>12개</em> 채팅방을 언제나 쓰던 그대로", "기기를 변경하거나 분실해도 새로 설치한 톡에서 그대로 복원해요")}
    ${oldFeature("storage", "기기 용량을 <em>8.4GB</em> 줄이고 쾌적하게", "백업된 데이터는 기기 용량을 차지하지 않도록 자동으로 가볍게 유지해줘요")}
    <div class="sheet">
      <div class="handle"></div>
      <p style="text-align:center;font-size:13px;font-weight:600;margin-bottom:14px">연간 결제로 <span style="color:#7B61FF">할인 혜택</span>을 받아보세요!</p>
      <div class="plan"><div class="row1"><b>30GB</b><span>가볍게 시작해보세요</span></div><div class="radio"><i></i>매월 2,900원</div></div>
      <div class="plan sel"><div class="row1"><b>50GB</b><span>많이 선택하는 용량이에요</span></div>
        <div class="radio"><i class="on"></i>매월 3,900원</div>
        <div class="radio"><i></i>매년 43,000원 <s>46,800원</s><span class="tag">월 3,583원 수준</span></div></div>
      <div class="terms"><span>톡클라우드 필수 약관 전체 보기</span><span>⌄</span></div>
      <button class="ybtn">필수 약관 동의하고 정기 구독하기</button>
    </div>
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
    <small>${V === 1 ? "SOLUTION A" : "SOLUTION B"}</small>
    <h3>${V === 1 ? "만료 화면이\n상황을 설명하게" : "결제하기 전에\n톡서랍을 먼저 보여주게"}</h3>
    <p>${V === 1 ? "같은 회색 사진에서 시작해요.\n무엇을 잃었는지 → 톡서랍이었다면 → 앞으로는\n순서로 말하도록 만료 화면을 바꿨어요." : "같은 회색 사진에서 시작해요.\n만료 화면은 그대로 두고, '더 알아보기' 다음에\n결제 화면 대신 톡서랍 온보딩을 먼저 보여줘요."}</p>
    <button class="go" data-hs="start">솔루션 보기</button>
  </div></div>`.replace(/\n/g, "<br>").replace(/<br>\s*</g, "<").replace(/>\s*<br>/g, ">");

  const compareCard = () => `<div class="compare">
      <div class="cols">
        <div><h4>지금 카톡</h4><div class="g2">${th("lineup")}${th("c2")}${th("", { exp: true })}${th("", { exp: true })}</div></div>
        <div class="arr">${ic("arrow")}</div>
        <div><h4 class="y">톡서랍에 보관했다면</h4><div class="g2">${th("lineup")}${th("c2")}${th("field")}${th("c1")}</div></div>
      </div>
      <div class="cap2">${ic("cloud")}톡서랍에 보관된 사진은 기간이 지나도 그대로 열려요</div>
    </div>`;

  S.newExpired = () => `<div class="screen black" id="s-newExpired">${status()}
    <div class="nhead">${ic("x")}<div class="t"><b>${ROOM}</b><span>9월 10일에 받은 사진</span></div></div>
    <div class="nbody">
      <div class="lost-tile">${ic("imgoff")}</div>
      <h3>보관 기간이 지나<br>이 사진은 더 볼 수 없어요</h3>
      <p class="lead">이 채팅방에서만 <b>9개</b>의 사진·동영상이<br>같은 이유로 사라졌어요.</p>
      ${compareCard()}
      <div class="note">${ic("info")}지난 사진은 되돌릴 수 없어요. 구독한 날부터 보관돼요.</div>
    </div>
    <div class="nfoot">
      <button class="ybtn" data-hs="cta">앞으로 받는 사진 보관하기</button>
      <button class="tbtn">다음에 할게요</button>
    </div>
  </div>`;

  S.pricing = () => `<div class="screen black" id="s-pricing">${(V === 1 ? S.newExpired() : S["ob" + (obPages.length - 1)]()).replace(/^<div class="screen black" id="[^"]+">/, "").replace(/<\/div>$/, "").replace(/data-hs="[^"]+"/g, "")}
    <div class="dim"></div>
    <div class="sheet" style="animation:rise .35s ease-out">
      <div class="handle"></div>
      <h3>앞으로 받는 사진부터<br>톡서랍에 보관돼요</h3>
      <div class="note">${ic("info")}구독 전에 만료된 사진은 복구되지 않아요</div>
      <div class="plan"><div class="row1"><b>30GB</b><span>가볍게 시작해보세요</span></div><div class="radio"><i></i>매월 2,900원</div></div>
      <div class="plan sel"><div class="row1"><b>50GB</b><span>많이 선택하는 용량이에요</span></div>
        <div class="radio"><i class="on"></i>매월 3,900원</div>
        <div class="radio"><i></i>매년 43,000원 <s>46,800원</s><span class="tag">월 3,583원 수준</span></div></div>
      <div class="terms"><span>톡클라우드 필수 약관 전체 보기</span><span>⌄</span></div>
      <button class="ybtn" data-hs="subscribe">필수 약관 동의하고 정기 구독하기</button>
    </div>
  </div>`;

  S.done = () => `<div class="screen light" id="s-done" style="background:#fff">${status(false)}
    <div class="done">
      <div class="ci">${ic("cloud")}</div>
      <h3>이제부터 ${ROOM}<br>사진도 톡서랍에 보관돼요</h3>
      <p>채팅방 메뉴 › 채팅방 서랍에서<br>언제든 다시 꺼내볼 수 있어요.</p>
    </div>
    <div class="nfoot"><button class="ybtn" data-hs="ok">확인</button></div>
  </div>`;

  // 온보딩 (솔루션 2)
  const obPages = [
    { chip: "보관", title: "채팅방 사진,<br>기간이 지나도 그대로", body: "구독한 날부터 주고받는 사진·동영상·파일이<br>톡서랍에 보관돼요.",
      card: `<div class="obhead">${ic("cloud")}톡서랍 · ${ROOM}</div><div class="g3">${["lineup", "field", "c1", "c2", "lineup", "c3", "c4", "field", "c5"].map(k => th(k, { badge: true })).join("")}</div>` },
    { chip: "찾기", title: "흩어진 사진,<br>사람·태그로 바로 찾기", body: "자주 등장하는 사람별로 묶어주고,<br>동영상·GIF·풍경 같은 태그로 걸러줘요.",
      card: `<div class="obhead">${ic("users")}인물 분류</div>
        <div class="people">${[["#6E747C", "나"], ["#857D90", "친구 A"], ["#6D8091", "친구 B"], ["#6F8A80", "친구 C"]].map(([c, n]) => `<div><i style="background:${c}">${ic("user")}</i>${n}</div>`).join("")}</div>
        <div class="tags"><span>전체</span><span>동영상</span><span>GIF</span><span class="on">사람</span><span>풍경</span></div>
        <div class="g3">${th("c2")}${th("c4")}${th("c5")}</div>` },
    { chip: "정리", title: "받은 파일,<br>드라이브처럼 폴더로", body: "내려받아 옮기지 않아도 톡 안에서 폴더로 정리하고,<br>중요한 파일은 따로 모아봐요.",
      card: `<div class="obhead">${ic("folder")}내 드라이브</div>
        <div class="frow"><span class="fi" style="background:#6F87A6">${ic("folder")}</span>경기 사진<small>12개</small></div>
        <div class="frow"><span class="fi" style="background:#6F87A6">${ic("folder")}</span>회비 정산<small>4개</small></div>
        <div class="frow"><span class="fi" style="background:#6F917C">${ic("sheet")}</span><span>참가비 정리.xlsx<em>8.2KB</em></span></div>
        <div class="frow"><span class="fi" style="background:#A97670">${ic("file")}</span><span>경기 일정표.pdf<em>1.2MB</em></span></div>
        <div class="frow"><span class="fi" style="background:#4A4A4C">${ic("star")}</span>중요 표시 모아보기</div>` },
  ];
  obPages.forEach((pg, i) => {
    const last = i === obPages.length - 1;
    S["ob" + i] = () => `<div class="screen black" id="s-ob${i}">${status()}
      <div class="obtop">
        <div class="prog">${obPages.map((_, j) => `<i class="${j <= i ? "on" : ""}"></i>`).join("")}</div>
        <div class="obrow">${ic("x", 'style="color:#fff"')}<span style="${last ? "visibility:hidden" : ""}">건너뛰기</span></div>
      </div>
      <div class="obcard">${pg.card}</div>
      <div class="obtext"><span class="chip">${pg.chip}</span><h3>${pg.title}</h3><p>${pg.body}</p></div>
      <div class="nfoot"><button class="ybtn" data-hs="next">${last ? "앞으로 받는 사진 보관하기" : "다음"}</button></div>
    </div>`;
  });

  S.end = () => `<div class="screen" id="s-end"><div class="end">
    <small>v${V} 요약</small>
    <h3>${V === 1 ? "만료 화면에서\n톡서랍을 이해시키기" : "결제 전에\n톡서랍을 먼저 보여주기"}</h3>
    <div class="chg">
      <div><b>Before</b>"만료" 한 줄 → 바로 결제 화면. 톡서랍을 '백업'으로만 기억</div>
      ${V === 1 ? "<div><b>Solution A · 만료 화면 재설계</b>무엇을 잃었는지, 톡서랍이었다면 어땠을지, 앞으로는 무엇이 보관되는지 한 화면에</div>" : ""}
      ${V === 2 ? "<div><b>Solution B · 결제 전 온보딩</b>만료 화면은 그대로 두고, '더 알아보기' 다음에 보관·찾기·정리 3장으로 톡서랍을 먼저 보여줌</div>" : ""}
    </div>
    <button class="again" data-hs="again">처음부터 다시 보기</button>
  </div></div>`.replace(/(<h3>[^<]*)\n/g, "$1<br>");

  // ───────── 단계 ─────────
  const before = [
    { ph: "before", s: "chat", hot: "menu", t: "한 달 전 경기 사진을\n다시 찾으려 해요",
      b: "풋살 모임 단톡방에서 9월 대회 사진 이야기가 나왔어요.\n채팅방 메뉴(☰)를 눌러 서랍을 열어볼게요." },
    { ph: "before", s: "menu", hot: "photos", t: "채팅방 서랍 › 사진/동영상",
      b: "채팅방에서 주고받은 사진은 여기서 모아볼 수 있어요." },
    { ph: "before", s: "grid", hot: "expired", scroll: true, t: "오래된 사진이\n회색으로 바뀌어 있어요",
      b: "스크롤을 내리니 9월 10일 이전 사진은 아이콘만 남은 회색 칸이에요. 눌러볼게요." },
    { ph: "before", s: "oldExpired", hot: "learn", t: "\"미디어 저장 기간이\n만료되었어요\"",
      b: "왜 사라졌는지, 어떻게 했으면 지킬 수 있었는지는 알려주지 않고 톡클라우드 이름만 보여줘요.",
      th: "기간이 만료됐다고? 톡클라우드를 쓰면 이 사진을 다시 볼 수 있다는 건가?" },
    { ph: "before", s: "oldSub", hot: "close", t: "더 알아보기를 누르자\n바로 결제 화면",
      b: "요금 선택 시트가 기능 설명을 덮고 있어요. '자동 백업' 문구만 남고, 톡서랍에서 무엇을 할 수 있는지는 보이지 않아요.",
      th: "결국 백업 서비스네. 지금 나한테 필요한 건 없는 것 같은데…" },
    { ph: "problem", s: "problem", t: "톡서랍에 들어올 수는 있지만,\n무엇을 해주는지는 몰라요",
      b: "사용자 인터뷰에서도 톡서랍은 '백업'으로만 기억됐고, 정리·모아보기 기능은 알지 못했어요.",
      q: ["카피 문구 봤을 때 사진이나 대화, 문서 다 보존된다… 이것만 기억에 남았어요.",
          "(드라이브로 파일 정리할 수 있는 거 아셨어요?) 아뇨, 아예 몰랐어요.",
          "모르겠어요, 필요한 게 없어서."] },
  ];
  const sol1 = [
    { ph: "s1", s: "s1intro", hot: "start", t: V === 1 ? "Solution A" : "Solution B",
      b: "같은 상황, 같은 회색 사진에서 다시 시작해요." },
    { ph: "s1", s: "grid", hot: "expired", scroll: true, t: "같은 회색 사진을 눌러요", b: "들어오는 경로는 그대로 두고, 그 다음 화면을 바꿨어요." },
    { ph: "s1", s: "newExpired", hot: "cta", t: "잃은 것과 톡서랍의 차이를\n한 화면에",
      li: ["어떤 사진이, 왜, 이 방에서 몇 개나 사라졌는지 알려줘요",
           "지금 카톡과 톡서랍을 나란히 보여줘 '보관'이 무엇인지 눈으로 확인해요",
           "지난 사진은 되돌릴 수 없다는 점을 먼저 말해 오해를 막아요"],
      b: "" },
  ];
  const sol2 = [
    { ph: "s1", s: "ob0", hot: "next", t: "결제 전에\n톡서랍을 먼저 보여줘요",
      b: "온보딩 3장으로 보관 · 찾기 · 정리를 실제 화면처럼 보여줘요. 첫 장은 방금 잃은 '보관'부터." },
    { ph: "s1", s: "ob1", hot: "next", t: "찾기: 사람·태그로",
      b: "여러 방에 흩어진 사진을 사람별로 묶어 보여줘요. 백업 이상의 쓰임을 처음 알게 되는 장이에요." },
    { ph: "s1", s: "ob2", hot: "next", t: "정리: 드라이브처럼 폴더로",
      b: "인터뷰에서 \"아예 몰랐다\"던 드라이브 정리 기능을 보여주고, 구독으로 이어져요." },
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
  const steps = [...before, ...(V === 1 ? sol1 : solB), ...tail];

  const phases = [["before", "Before"], ["problem", "문제"], ["s1", V === 1 ? "Solution A" : "Solution B"], ["end", "정리"]];

  // ───────── 렌더 ─────────
  const app = document.getElementById("app");
  app.innerHTML = `<div class="stage">
    <div class="panel">
      <div class="ver"><b>v${V}</b><span>${V === 1 ? "Before → Solution A" : "Before → Solution B"}</span></div>
      <div class="phases">${phases.map(([k, n]) => `<button data-ph="${k}">${n}</button>`).join("")}</div>
      <div class="autoplay"><button class="ap-btn" type="button" aria-label="일시정지">❚❚</button><div class="ap-txt"><b>Before 자동 재생 중</b><span>누르지 않아도 그대로 보면 돼요</span></div><div class="ap-bar"><i></i></div></div>
      <div class="count"></div>
      <div class="cap"></div>
      <div class="nav"><button class="prev">이전</button><button class="next">다음</button></div>
      <div class="hint">화면 속 파랗게 깜빡이는 곳을 눌러도 넘어가요 · 키보드 ← →</div>
    </div>
    <div class="phone-wrap"><div class="device"></div></div>
  </div>`;

  const device = app.querySelector(".device");
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
    scr.querySelectorAll(".obcard,.drawer,.sheet").forEach(el => { el.style.animation = "none"; el.offsetHeight; el.style.animation = ""; });
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
    history.replaceState(null, "", "#" + (cur + 1));
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
    const maxH = narrow ? 9999 : innerHeight - 48;
    const maxW = narrow ? innerWidth - 24 : 9999;
    const s = Math.min(1, maxH / 864, maxW / 410);
    device.style.transform = `scale(${s})`;
    wrap.style.width = 390 * s + "px";
    wrap.style.height = 844 * s + "px";
  }
  addEventListener("resize", fit);
  fit();

  // ───────── Before 자동 재생 (영상처럼) ─────────
  const finger = document.createElement("div");
  finger.className = "finger";
  device.appendChild(finger);
  const ap = app.querySelector(".autoplay"), apBtn = ap.querySelector(".ap-btn"), apBar = ap.querySelector(".ap-bar i");
  const beforeEnd = steps.findIndex(s => s.ph !== "before"); // 문제 정리 단계
  const readTime = [3800, 2200, 3600, 6200, 6200]; // 단계별로 읽을 시간(ms)
  const total = readTime.reduce((a, b) => a + b, 0) + beforeEnd * 900;
  let apState = "idle", apRun = 0, apElapsed = 0;
  const sleep = ms => new Promise(r => {
    let left = ms; const id = apRun;
    (function tick() {
      if (id !== apRun) return r(false);
      if (left <= 0) return r(true);
      setTimeout(() => {
        if (apState === "playing") { left -= 50; apElapsed += 50; apBar.style.width = Math.min(100, apElapsed / total * 100) + "%"; }
        tick();
      }, 50);
    })();
  });
  function fingerTo(el) {
    const d = device.getBoundingClientRect(), r = el.getBoundingClientRect(), k = device.offsetWidth / d.width;
    const x = (r.left + r.width / 2 - d.left) * k - device.clientLeft, y = (r.top + r.height / 2 - d.top) * k - device.clientTop;
    finger.classList.add("show");
    finger.style.transform = `translate(${x}px, ${y}px)`;
  }
  async function playBefore() {
    const id = ++apRun; apElapsed = 0; apBar.style.width = "0"; setAp("playing");
    finger.classList.remove("show");
    finger.style.transform = "translate(195px, 700px)";
    for (let i = 0; i < beforeEnd; i++) {
      go(i);
      if (!await sleep(readTime[i] || 3000) || id !== apRun) return;
      const hot = device.querySelector(".screen.on .hot");
      if (!hot) continue;
      fingerTo(hot);
      if (!await sleep(750) || id !== apRun) return;
      finger.classList.add("press");
      if (!await sleep(180) || id !== apRun) return;
      finger.classList.remove("press");
    }
    finger.classList.remove("show");
    go(beforeEnd);
    apBar.style.width = "100%";
    setAp("ended");
  }
  function setAp(st) {
    apState = st; ap.dataset.state = st;
    apBtn.textContent = st === "playing" ? "❚❚" : st === "paused" ? "▶" : "↺";
    apBtn.setAttribute("aria-label", st === "playing" ? "일시정지" : st === "paused" ? "계속 재생" : "Before 다시 재생");
    ap.querySelector("b").textContent = { playing: "Before 자동 재생 중", paused: "일시정지됨", ended: "Before 재생 끝", stopped: "직접 넘겨보는 중" }[st];
    ap.querySelector("span").textContent = st === "playing" || st === "paused" ? "누르지 않아도 그대로 보면 돼요" : "↺ 버튼으로 Before를 다시 볼 수 있어요";
  }
  function stopAp() {
    if (apState !== "playing" && apState !== "paused") return;
    apRun++; finger.classList.remove("show", "press"); setAp("stopped");
  }
  apBtn.onclick = () => {
    if (apState === "playing") setAp("paused");
    else if (apState === "paused") setAp("playing");
    else playBefore();
  };
  // 사람이 직접 조작하면 자동 재생을 멈춤
  app.addEventListener("click", e => { if (e.isTrusted && !ap.contains(e.target) && e.target.closest("button,[data-hs]")) stopAp(); }, true);
  document.addEventListener("keydown", e => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") stopAp(); }, true);

  const startAt = (parseInt(location.hash.slice(1)) || 1) - 1;
  if (startAt === 0) playBefore();
  else { go(startAt); setAp("stopped"); }
})();
